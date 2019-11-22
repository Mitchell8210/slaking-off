import React from "react"
import { useChannels } from "../hooks"
import { Link } from "react-router-dom"

export default props => {
  const { channels } = useChannels()

  return (
    <div className="createChannelContainer">
      <div className="createChannelCover">
        <h1>CHANNELS, BABY</h1>
        {channels.map(channel => (
          <div className="channelNames">
            <div key={channel.id}>
              <Link to={`/${channel.channel_name}/:${channel.id}`}>
                Category Name:{channel.channel_name}
              </Link>
            </div>
          </div>
        ))}
        <Link to={"/"}>Main Menu</Link>
      </div>
    </div>
  )
}
