package helpers

import (
	"strings"

	"github.com/zzwx/splice/v2"
)

var Users []map[string]string

// Filter function implementation
func filter(data []map[string]string, f func(map[string]string) bool) []map[string]string {

	fltd := make([]map[string]string, 0)

	for _, user := range data {

		if f(user) {
			fltd = append(fltd, user)
		}
	}

	return fltd
}

func AddUser(data map[string]string) map[string]string {
	name := strings.ToLower(strings.TrimSpace(data["name"]))
	room := strings.ToLower(strings.TrimSpace(data["room"]))

	var isExistingUser bool

	for i := range Users {
		if Users[i]["room"] == room && Users[i]["name"] == name {
			isExistingUser = true
			break
		}

	}

	if isExistingUser {
		return map[string]string{
			"error": "Username is taken",
		}
	}
	Users = append(Users, data)

	return data
}

func RemoveUser(id string) map[string]string {
	var index int = -1

	for i := range Users {
		if Users[i]["id"] == id {
			index = i
			break
		}
	}

	if index != -1 {
		user := splice.Splice(&Users, index, 1)[0]
		return user
	}

	return nil
}

func GetUser(id string) map[string]string {
	for i := range Users {
		if Users[i]["id"] == id {
			return Users[i]
		}
	}

	return nil
}

func GetUsersInRoom(roomname string) []map[string]string {
	return filter(Users, func(m map[string]string) bool {
		return m["room"] == roomname
	})
}
