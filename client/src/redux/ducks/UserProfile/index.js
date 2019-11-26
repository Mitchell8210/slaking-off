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

function addInfo(email, location, about, url, username) {
  return dispatch => {
    Axios.post("/updateProfile", {
      email,
      location,
      about,
      url,
      username
    }).then(resp => {
      dispatch({
        type: ADD_USER_INFO,
        payload: resp.data
      })
      alert("profile updated")
    })
  }
}

function getUserInfo(username) {
  return dispatch => {
    Axios.get(`/profile/${username}`).then(resp => {
      console.log(resp.data)
      const userInformation = {
        username: resp.data[0].username,
        email: resp.data[0].email,
        location: resp.data[0].location,
        about: resp.data[0].about,
        url: resp.data[0].url
      }
      dispatch({
        type: GET_USER_INFO,
        payload: userInformation
      })
    })
  }
}

export function useUserInfo() {
  const dispatch = useDispatch()
  const userInfo = useSelector(appstate => appstate.infoState.userInfo)
  const makeProfile = (email, location, about, url, username) =>
    dispatch(addInfo(email, location, about, url, username))
  const getProfile = username => dispatch(getUserInfo(username))
  useEffect(() => {}, [dispatch])

  return { userInfo, makeProfile, getProfile }
}
