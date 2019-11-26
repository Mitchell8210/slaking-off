module.exports = io => {
  let users = []
  let rooms = []
  io.on("connection", socket => {
    socket.on("login", username => {
      users.push({
        username,
        id: socket.id
      })
      io.emit("users", users)
    })
    socket.on("create", function(room) {
      rooms.push({
        room
      })
      socket.join(room)
      console.log("joined", room)
      console.log("rooms, bitch", rooms)
    })
    socket.on("message", message => {
      io.to(message.channel).emit("new message", message)
      console.log(
        "these messages",
        message,
        "these rooms:",
        rooms,
        "users:",
        users
      )
    })

    socket.on("leave", room => {
      socket.leave(room)
      console.log("left room: ", room)
    })

    socket.on("disconnect", () => {
      users = users.filter(user => user.id !== socket.id)
      io.emit("users", users)

      console.log("Tearing down")
    })
  })
}
// io is the server
//socket is the individual client
