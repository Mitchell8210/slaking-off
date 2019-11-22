import React from "react"
import { useAuth } from "../hooks"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Chat from "./Chat"
import CreateChannel from "./CreateChannel"
import Channels from "./Channels"

export default props => {
  const { username, signout } = useAuth()

  function handleLogout(e) {
    e.preventDefault()
    signout()
  }

  return (
    <div className="mainScreenContainer">
      <div className="mainScreenLinks">
        <Link to={"/CreateChannel"}>Create Channel</Link>
        <Link to={"/Channels"}>Channels</Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
