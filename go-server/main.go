package main

import (
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
	"github.com/googollee/go-socket.io/engineio"
	"github.com/googollee/go-socket.io/engineio/transport"
	"github.com/googollee/go-socket.io/engineio/transport/polling"
	"github.com/googollee/go-socket.io/engineio/transport/websocket"
)

var allowOriginFunc = func(r *http.Request) bool {
	return true
}

func main() {
	server := socketio.NewServer(&engineio.Options{
		Transports: []transport.Transport{
			&polling.Transport{
				CheckOrigin: allowOriginFunc,
			},
			&websocket.Transport{
				CheckOrigin: allowOriginFunc,
			},
		},
	})

	server.OnConnect("/", func(s socketio.Conn) error {
		// s.SetContext("")

		fmt.Println("connected:", s.ID())

		// fmt.Println(s.Rooms())

		// s.
		return nil
	})

	server.OnEvent("/", "join", func(s socketio.Conn, msg map[string]string) {
		// s.SetContext(msg)
		fmt.Println("here")
		fmt.Println("msg:", msg)

		// s.Emit("reply", "have "+msg)
	})

	// server.BroadcastToRoom()

	// server.OnEvent("/", "notice", func(s socketio.Conn, msg string) {
	// 	fmt.Println("notice:", msg)

	// 	s.Emit("reply", "have "+msg)
	// })

	// server.OnEvent("/chat", "msg", func(s socketio.Conn, msg string) string {
	// 	s.SetContext(msg)
	// 	return "recv " + msg
	// })

	// server.OnEvent("/", "bye", func(s socketio.Conn) string {
	// 	last := s.Context().(string)
	// 	s.Emit("bye", last)
	// 	s.Close()
	// 	return last
	// })

	// server.OnError("/", func(s socketio.Conn, e error) {
	// 	fmt.Println("meet error:", e)
	// })

	// server.OnDisconnect("/", func(s socketio.Conn, reason string) {
	// 	fmt.Println("closed", reason)
	// })

	go server.Serve()
	defer server.Close()

	http.Handle("/socket.io/", server)
	log.Println("Serving at localhost:8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
