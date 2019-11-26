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
        room,
        id: socket.id
      })
      socket.join(room)
      console.log("joined", room)
      socket.on("message", message => {
        io.in(room).emit("message", message)
        console.log(message, room)
      })
      socket.on("leave", room => {
        socket.leave(room)
        console.log("left room: ", room)
      })
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
