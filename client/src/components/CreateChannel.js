import React, { useState } from "react"
import { useChannels, useAuth } from "../hooks"
import { Link } from "react-router-dom"
export default props => {
  const [channelName, setChannelName] = useState("")
  const [creator, setCreator] = useState("")
  const [description, setDescription] = useState("")
  const { createChannel } = useChannels()
  const { username } = useAuth()
  function handleSubmit(e) {
    e.preventDefault()

    createChannel(channelName, username, description)
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
          <label htmlFor="creatorName">Creator Name</label>
          <input
            name="creatorName"
            required
            type="text"
            placeholder="Creator Name"
            value={username}
            onChange={e => setCreator(e.target.value)}
          />
          <label htmlFor="description">New Channel Name</label>
          <input
            name="description"
            required
            type="text"
            placeholder="Channel Name"
            onChange={e => setDescription(e.target.value)}
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
