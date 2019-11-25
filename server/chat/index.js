module.exports = io => {
  let users = []

  io.on("connection", socket => {
    socket.on("login", username => {
      users.push({
        username,
        id: socket.id
      })

      io.emit("users", users)
    })

    socket.on("message", message => {
      io.emit("message", message)
    })
    socket.on("disconnect", () => {
      users = users.filter(user => user.id !== socket.id)
      io.emit("users", users)

      console.log("Tearing down")
    })
    socket.on("create", function(room) {
      socket.join(room)
      console.log("joined ", room)
    })
  })
}

// io is the server
//socket is the individual client
