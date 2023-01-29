package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	socketio "github.com/googollee/go-socket.io"
	"github.com/googollee/go-socket.io/engineio"
)

func main() {
	server := socketio.NewServer(&engineio.Options{
		PingTimeout: time.Duration(30000),
	})

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")

		fmt.Println("connected:", s.ID())
		return nil
	})

	// server.BroadcastToRoom()

	server.OnEvent("/", "notice", func(s socketio.Conn, msg string) {
		fmt.Println("notice:", msg)
		s.Emit("reply", "have "+msg)
	})

	server.OnEvent("/chat", "msg", func(s socketio.Conn, msg string) string {
		s.SetContext(msg)
		return "recv " + msg
	})

	server.OnEvent("/", "bye", func(s socketio.Conn) string {
		last := s.Context().(string)
		s.Emit("bye", last)
		s.Close()
		return last
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("meet error:", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("closed", reason)
	})

	go server.Serve()
	defer server.Close()

	http.Handle("/ws", server)
	log.Println("Serving at localhost:4000...")
	log.Fatal(http.ListenAndServe(":4000", nil))
}
