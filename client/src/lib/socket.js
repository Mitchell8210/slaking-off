import io from "socket.io-client"

const socket = io("http://10.68.0.145:8080", {
  transports: ["websocket"]
})

export default socket
