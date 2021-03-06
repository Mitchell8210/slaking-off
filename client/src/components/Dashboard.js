import React from "react"
import { useAuth, useUserInfo } from "../hooks"
import { Link } from "react-router-dom"
import "../redux/ducks/chat"

export default props => {
  const { signout, username } = useAuth()
  const { getProfile } = useUserInfo()
  function handleLogout(e) {
    e.preventDefault()
    signout()
  }
  function handleClick(e) {
    e.preventDefault()

    getProfile(username)
  }
  console.log(username)
  return (
    <div className="mainScreenContainer">
      <div className="mainScreenCover">
        <div className="dashboard">
          <div className="mainScreenLinksContainer">
            <div className="mainMenu">Main Menu</div>
            <Link to={"/CreateChannel"}>Create Channel</Link>
            <Link to={"/Channels"}>Available channels</Link>
            <Link to={"/Users"}>Users</Link>
            <Link to={"/Categories"}>Categories</Link>
            <Link to={"/Other"}>Other</Link>
            <div onClick={handleClick}>
              <Link to={"/Profile"}>Profile</Link>
            </div>
            <div className="mainButton">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
