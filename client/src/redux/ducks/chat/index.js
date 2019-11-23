import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import socket from "../../../lib/socket"

const ADD_MESSAGE = "ADD_MESSAGE"
const GET_USERS = "GET_USERS"
const initialState = {
  messages: [],
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }
    case GET_USERS:
      return { ...state, users: action.payload }
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

export function useChat() {
  const dispatch = useDispatch()
  const messages = useSelector(appState => appState.chatState.messages)
  const add = message => socket.emit("message", message)
  const users = useSelector(appState => appState.chatState.users)
  useEffect(() => {
    socket.on("message", message => {
      dispatch(addMessage(message))
    })
    socket.on("users", users => {
      dispatch(getUsers(users))
    })
  }, [dispatch])

  return { messages, add, users }
}
// socket.emit("new message", "This is a new message")

// socket.on("new message", message => {
//   console.log(message)
// })
