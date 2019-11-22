import React, { useState } from "react"
import { useChannels } from "../hooks"
import { Link } from "react-router-dom"
export default props => {
  const [channelName, setChannelName] = useState("")
  const { createChannel } = useChannels()

  function handleSubmit(e) {
    e.preventDefault()

    createChannel(channelName)
  }

  return (
    <div>
      <h1>CREATE CHANNEL, BABY</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="channelName">New Channel Name</label>
        <input
          name="channelName"
          type="text"
          placeholder="channel name"
          onChange={e => setChannelName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to={"/"}>Main Menu</Link>
    </div>
  )
}
