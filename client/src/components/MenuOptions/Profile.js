import React from "react"
import { Link } from "react-router-dom"
import { useAuth, useUserInfo } from "../../hooks"
export default props => {
  const { userInfo } = useUserInfo()
  console.log(userInfo)

  return (
    <div className="mainScreenContainer">
      <div className="mainScreenCover">
        <h1>Profile, baby!</h1>
        <div className="profileContainer">
          <div className="profilePic">
            <img src="" alt="user face" />
          </div>
          <div className="profileInfo">
            <div>Username: {userInfo.username}</div>
            <div>Email: {userInfo.email}</div>
            <div>Location: {userInfo.location}</div>
            <div>About me: {userInfo.about}</div>
          </div>
          <Link to={"/editProfile"}>Edit Profile</Link>
          <div className=""></div>
        </div>
        <div className="mainMenuLink">
          <Link to={"/"}>Main Menu</Link>
        </div>
      </div>
    </div>
  )
}
