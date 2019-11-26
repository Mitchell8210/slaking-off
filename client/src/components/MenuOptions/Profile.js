import React from "react"
import { Link } from "react-router-dom"
import { useAuth, useUserInfo } from "../../hooks"
export default props => {
  const { userInfo } = useUserInfo()
  console.log(userInfo)

  return (
    <div className="mainScreenContainer">
      <div className="mainScreenCover">
        <div className="profileContainer">
          <div className="profilePic">
            <img src={`${userInfo.url}`} alt="user face" />
          </div>
          <div className="profileInfo">
            <div className="username">Username: {userInfo.username}</div>
            <div className="email">Email: {userInfo.email}</div>
            <div className="location">Location: {userInfo.location}</div>
            <div className="about">About me: {userInfo.about}</div>
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
