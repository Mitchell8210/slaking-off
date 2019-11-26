import React from "react"
import { useChannels, useChat } from "../hooks"
import { Link } from "react-router-dom"

export default props => {
  const { channels } = useChannels()
  const { join, room } = useChat()
  console.log(room)
  function handleClick(e, newRoom) {
    e.preventDefault()
    join(newRoom)
  }
  return (
    <div className="channelListContainer">
      <div className="channelListCover">
        <h1>Available Channels</h1>
        <div className="channelListLink">
          <Link to={"/"}>Main Menu</Link>
        </div>
        <div>
          {channels.map((channel, i) => (
            <div key={"channel" + i} className="channelNames">
              <div onClick={e => handleClick(e, channel.id)}>
                <Link to={`ChannelChat/${channel.channel_name}/${channel.id}`}>
                  Channel Name: {channel.channel_name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
