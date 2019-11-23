import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import socket from "../../../lib/socket"
// action statements
const LOGIN_PENDING = "LOGING_PENDING"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_FAILURE = "LOGIN_FAILURE"
const LOGOUT = "LOGOUT"
const REGISTER_USER = "REGISTER_USER"
// initial states
const initialState = {
  username: "",
  isAuthenticated: false,
  loading: false
}

//Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, loading: true }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        username: action.payload
      }
    case LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false, username: "" }
    case LOGOUT:
      return initialState
    case REGISTER_USER:
      return initialState
    default:
      return state
  }
}

// Action functions
function registerUser(username, password, dispatch) {
  return new Promise((resolve, reject) => {
    axios
      .post("/register", { username, password })
      .then(resp => {
        dispatch({
          type: REGISTER_USER
        })
        resolve()
      })
      .catch(e => {
        console.log("registration failed")
      })
  })
}

function login(username, password, dispatch) {
  return new Promise((resolve, reject) => {
    axios
      .post("/login", { username, password })
      .then(resp => {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${resp.data.token}`
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: username
        })
        socket.emit("login", username)
        console.log("success")
        resolve()
      })
      .catch(e => {
        dispatch({ type: LOGIN_FAILURE })
        reject()
        console.log("nope")
      })
  })
}

function logout() {
  axios.defaults.headers.common = { Authorization: "" }
  return { type: LOGOUT }
}

// custom hook fucntions
// register, login, logout hook
export function useAuth() {
  const username = useSelector(appState => appState.authState.username)
  const isAuthenticated = useSelector(
    appState => appState.authState.isAuthenticated
  )
  const dispatch = useDispatch()
  const signin = (username, password) => {
    dispatch({
      type: LOGIN_PENDING
    })
    return login(username, password, dispatch)
  }
  const signout = () => dispatch(logout())

  const register = (username, password) => {
    return registerUser(username, password, dispatch)
  }
  return { signin, signout, isAuthenticated, username, register }
}
