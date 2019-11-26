import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import socket from "../../../lib/socket"

const ADD_MESSAGE = "ADD_MESSAGE"
const GET_USERS = "GET_USERS"
const JOIN_ROOM = "JOIN_ROOM"
const initialState = {
  messages: [],
  users: [],
  room: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }
    case GET_USERS:
      return { ...state, users: action.payload }
    case JOIN_ROOM:
      return { ...state, room: action.payload }
    default:
      return state
  }
}

function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message
  }
}

function getUsers(users) {
  return {
    type: GET_USERS,
    payload: users
  }
}
function joinRoom(room) {
  console.log(room)
  return {
    type: JOIN_ROOM,
    payload: room
  }
}
export function useChat() {
  const dispatch = useDispatch()
  const messages = useSelector(appState => appState.chatState.messages)
  const add = message => socket.emit("message", message)
  const users = useSelector(appState => appState.chatState.users)
  const room = useSelector(appState => appState.chatState.room)
  const join = newRoom => socket.emit("create", newRoom)
  const leave = oldRoom => socket.emit("leave", oldRoom)
  useEffect(() => {
    socket.on("message", message => {
      dispatch(addMessage(message))
    })
    socket.on("users", users => {
      dispatch(getUsers(users))
    })
    socket.emit("create", room => {
      dispatch(joinRoom(room))
    })
  }, [dispatch])

  return { messages, add, users, room, join, leave }
}
// socket.emit("new message", "This is a new message")

// socket.on("new message", message => {
//   console.log(message)
// })
