import React, { useState } from "react"
import { useChat } from "../redux/ducks/chat"
import { useAuth } from "../redux/ducks/users"
import Timestamp from "react-timestamp"
import { Link } from "react-router-dom"
export default props => {
  const [message, setMessage] = useState("")
  const { username } = useAuth()
  const { messages, add, leave } = useChat()
  const channel = props.match.params.channel_name
  console.log(props)
  function handleSubmit(e) {
    e.preventDefault()

    add({ message, username })
    setMessage("")
  }
  function handleDelete(e) {
    e.preventDefault()
    messages.splice(message)
  }
  function handleClick(e, channel) {
    e.preventDefault()

    leave(channel)
  }
  console.log(messages)
  const time = new Date()
  console.log(messages)
  return (
    <div className="chatWindowContainer">
      <div className="chatBoxCover">
        <div className="onlineUsers">
          <div className="userListTitle">Online Users</div>
          <div className="userList">{username}</div>
        </div>
        <div className="chatBox">
          <h1>CHAT, BABY!</h1>
          <div onClick={e => handleClick(e, channel)}>
            <Link to={"/"}>Other Channels</Link>
          </div>
          <div className="messageContainer">
            {messages.map((msg, i) => (
              <div key={"message" + i} className="chatMessages">
                <div className="messageBase">
                  <p className="messenger">{msg.username}:</p>
                  <p className="messageContent">{msg.message}</p>
                </div>
                <p className="timeStamp">
                  <Timestamp>{time}</Timestamp>
                </p>
                <button onClick={handleDelete}>x</button>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="message"
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="chatBoxChannels">
          <div className="chatChannelList">
            <div className="userListTitle">Channels</div>
            <div>{channel}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
