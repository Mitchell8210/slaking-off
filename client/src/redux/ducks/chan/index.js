import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import axios from "axios"

const CREATE_CHANNEL = "CREATE_CHANNEL"
const GET_CHANNELS = "GET_CHANNELS"

const initialState = {
  channels: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHANNEL:
      return state
    case GET_CHANNELS:
      return { ...state, channels: action.payload }
    default:
      return state
  }
}

function NewChannel(channelName, creatorName, description) {
  return dispatch => {
    axios
      .post("/newchannel", { channelName, creatorName, description })
      .then(resp => {
        dispatch({
          type: CREATE_CHANNEL
        })
      })
  }
}

function getChannels() {
  return dispatch => {
    axios.get("/channels").then(resp => {
      dispatch({
        type: GET_CHANNELS,
        payload: resp.data
      })
    })
  }
}

// channels hook
export function useChannels() {
  const dispatch = useDispatch()
  const channels = useSelector(appState => appState.chanState.channels)
  const createChannel = (channelName, creatorName, description) =>
    dispatch(NewChannel(channelName, creatorName, description))

  useEffect(() => {
    dispatch(getChannels())
  }, [dispatch])
  return { createChannel, channels }
}
