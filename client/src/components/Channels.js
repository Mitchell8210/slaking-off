import React from "react"
import { useChannels } from "../hooks"
import { Link } from "react-router-dom"

export default props => {
  const { channels } = useChannels()

  return (
    <div>
      <h1>CHANNELS, BABY</h1>
      {channels.map(channel => (
        <div key={channel.id}>{channel.channel_name}</div>
      ))}
      <Link to={"/"}>Main Menu</Link>
    </div>
  )
}
