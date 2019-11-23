import React, { useState } from "react"
import { useChat } from "../redux/ducks/chat"
import { useAuth } from "../redux/ducks/users"
import Timestamp from "react-timestamp"
export default props => {
  const [message, setMessage] = useState("")
  const { username } = useAuth()
  const { messages, add } = useChat()
  function handleSubmit(e) {
    e.preventDefault()

    add({ message, username })
    setMessage("")
  }
  console.log(messages)
  const time = new Date()
  console.log(time)
  return (
    <div className="chatWindowContainer">
      <div className="chatBoxCover">
        <div className="onlineUsers">
          <div className="userListTitle">Online Users</div>
          <div className="userList">{username}</div>
        </div>
        <div className="chatBox">
          <h1>CHAT, BABY!</h1>
          <div className="messageContainer">
            {messages.map((msg, i) => (
              <div className="chatMessages">
                <div className="messageBase">
                  <p key={"message" + i} className="messenger">
                    {msg.username}:
                  </p>
                  <p className="messageContent">{msg.message}</p>
                </div>
                <p className="timeStamp">
                  <Timestamp>{time}</Timestamp>
                </p>
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
            <div>channel</div>
          </div>
        </div>
      </div>
    </div>
  )
}
