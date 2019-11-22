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
      <div className="mainScreenCover">
        <div className="mainScreenLinksContainer">
          <div className="mainMenu">Main Menu</div>
          <Link to={"/CreateChannel"}>Create Channel</Link>
          <Link to={"/Channels"}>Available channels</Link>
          <Link to={"/Users"}>Users</Link>
          <Link to={"/Categories"}>Categories</Link>
          <Link to={"/Other"}>Other</Link>
        </div>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
