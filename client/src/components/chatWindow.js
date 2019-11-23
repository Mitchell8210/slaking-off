import React, { useState } from "react"
import { useChat } from "../redux/ducks/chat"
import { useAuth } from "../redux/ducks/users"
export default props => {
  const [message, setMessage] = useState("")
  const { username } = useAuth()
  const { messages, add } = useChat()
  function handleSubmit(e) {
    e.preventDefault()

    add({ message, username })
    setMessage("")
  }

  return (
    <div>
      <h1>CHAT, BABY!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="message"
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {messages.map((msg, i) => (
        <p key={"message" + i}>
          {msg.username}: {msg.message}
        </p>
      ))}
    </div>
  )
}
