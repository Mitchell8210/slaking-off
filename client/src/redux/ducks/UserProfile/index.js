import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import socket from "../../../lib/socket"
import Axios from "axios"

const ADD_USER_INFO = "ADD_USER_INFO"
const GET_USER_INFO = "GET_USER_INFO"

const initialState = {
  userInfo: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_INFO:
      return state
    case GET_USER_INFO:
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}

function addInfo(email, location, about, username) {
  return dispatch => {
    Axios.post("/updateProfile", { email, location, about, username }).then(
      resp => {
        dispatch({
          type: ADD_USER_INFO,
          payload: resp.data
        })
      }
    )
  }
}

function getUserInfo(username) {
  return dispatch => {
    Axios.get("/profile", { username }).then(resp => {
      const userInfo = {
        username: resp.data[0].username,
        email: resp.data[0].email,
        location: resp.data[0].location,
        about: resp.data[0].about
      }
      dispatch({
        type: GET_USER_INFO,
        payload: userInfo
      })
    })
  }
}

export function useUserInfo() {
  const dispatch = useDispatch()
  const userInfo = useSelector(appstate => appstate.infoState.userInfo)
  const makeProfile = (email, location, about, username) =>
    dispatch(addInfo(email, location, about, username))
  const getProfile = username => dispatch(getUserInfo(username))
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  return { userInfo, makeProfile, getProfile }
}
