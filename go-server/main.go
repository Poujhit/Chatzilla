package main

import (
	"chatzilla-server/helpers"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/viper"
	"github.com/zishang520/engine.io/types"
	"github.com/zishang520/socket.io/socket"
)

// .emit will send to the connected client.
// in order to send and receive msg from client to server and .emit is used.
// .broadcast.to msg is sent to all clients in a room except the one client that sends this broadcasted msg.

func main() {
	// Change to .env to run the code locally
	viper.SetConfigFile("ENV")
	viper.ReadInConfig()
	viper.AutomaticEnv()

	ops := socket.DefaultServerOptions()
	ops.SetAllowEIO3(true)
	ops.SetCors(&types.Cors{
		Origin: viper.Get("ORIGIN"),
		// Credentials: true,
	})
	httpServer := types.CreateServer(nil)
	io := socket.NewServer(httpServer, ops)
	io.On("connection", func(clients ...any) {
		fmt.Println(len(clients))

		for i := 0; i < len(clients); i++ {
			sock := clients[i].(*socket.Socket)
			fmt.Println(sock.Id())
		}
		client := clients[0].(*socket.Socket)

		fmt.Println(client.Handshake().Query.Get("room"))
		client.On("join", func(datas ...any) {
			var data map[string]interface{} = datas[0].(map[string]interface{})
			fmt.Println(data)

			helpers.AddUser(map[string]string{
				"id":   string(client.Id()),
				"name": data["name"].(string),
				"room": data["room"].(string),
			})

			// why like this because, custom type string is not the same as string, so type casting is not possible
			// earlier it was like this client.Join(data["room"].(socket.Room))
			// the old one causes error because interface{} is string, not socket.Room
			var room string = data["room"].(string)
			client.Join(socket.Room(room))

			// hover over the function to know why this is used.
			client.Emit("message", map[string]string{
				"user": "Admin",
				"text": fmt.Sprintf("%s, Welcome to the chat room %s", data["name"], data["room"]),
			})

			// will broadcast the message to everyone except the one who told to send the message.
			client.Broadcast().To(socket.Room(room)).Emit("message", map[string]string{
				"user": "Admin",
				"text": fmt.Sprintf("%s has joined!", data["name"]),
			})

			roomData := map[string]interface{}{
				"room":  data["room"],
				"users": helpers.GetUsersInRoom(data["room"].(string)),
			}
			client.Emit("roomData", roomData)
			client.Broadcast().To(socket.Room(room)).Emit("roomData", roomData)
		})

		client.On("sendMessage", func(data ...any) {
			msg := data[0].(string)
			user := helpers.GetUser(string(client.Id()))

			sendingMsg := map[string]interface{}{
				"user": user["name"],
				"text": msg,
			}

			client.Emit("message", sendingMsg)
			client.Broadcast().To(socket.Room(user["room"])).Emit("message", sendingMsg)
		})
		client.On("disconnect", func(...any) {
			user := helpers.RemoveUser(string(client.Id()))
			if user != nil {
				fmt.Println(user)
				client.Broadcast().To(socket.Room(user["room"])).Emit("message", map[string]string{
					"user": "Admin",
					"text": fmt.Sprintf("%s has left", user["name"]),
				})
				client.Broadcast().To(socket.Room(user["room"])).Emit("roomData", map[string]interface{}{
					"room":  user["room"],
					"users": helpers.GetUsersInRoom(user["room"]),
				})
			}
		})
	})

	url := fmt.Sprintf("%s:%s", viper.Get("SERVER_URL"), viper.Get("PORT"))
	fmt.Println(url)

	httpServer.Listen(url, func() {
		fmt.Printf("listening on url %s", url)
	})

	exit := make(chan struct{})
	SignalC := make(chan os.Signal)

	signal.Notify(SignalC, os.Interrupt, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)
	go func() {
		for s := range SignalC {
			switch s {
			case os.Interrupt, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT:
				close(exit)
				return
			}
		}
	}()

	<-exit
	httpServer.Close(nil)
	os.Exit(0)
}
