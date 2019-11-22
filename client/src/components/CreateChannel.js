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
    <div className="createChannelContainer">
      <div className="createChannelCover">
        <h1>CREATE CHANNEL, BABY</h1>
        <form className="createChannelForm" onSubmit={handleSubmit}>
          <label htmlFor="channelName">New Channel Name</label>
          <input
            name="channelName"
            required
            type="text"
            placeholder="Channel Name"
            onChange={e => setChannelName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="mainMenuLink">
          <Link to={"/"}>Main Menu</Link>
        </div>
      </div>
    </div>
  )
}
