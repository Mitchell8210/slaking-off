import React from "react"
import { useChannels, useChat } from "../hooks"
import { Link } from "react-router-dom"

export default props => {
  const { channels } = useChannels()
  const { join, room } = useChat()
  console.log(room)
  function handleClick(newRoom) {
    join(newRoom)
  }
  return (
    <div className="createChannelContainer">
      <div className="createChannelCover">
        <h1>CHANNELS, BABY</h1>
        {channels.map((channel, i) => (
          <div key={"channel" + i} className="channelNames">
            <div onClick={handleClick(channel.id)}>
              <Link to={`ChannelChat/${channel.channel_name}/${channel.id}`}>
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
