import React from "react"
import { useAuth } from "../hooks"
import { Link } from "react-router-dom"
import "../redux/ducks/chat"
export default props => {
  const { signout } = useAuth()

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
          <Link to={"/chatWindow"}>Chat Window</Link>
        </div>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
