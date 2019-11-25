import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../redux/ducks/users"

export default props => {
  const { username } = useAuth()

  return (
    <div className="mainScreenContainer">
      <div className="mainScreenCover">
        <h1>Users, baby!</h1>
        <h2>{username}</h2>
        <div className="mainMenuLink">
          <Link to={"/"}>Main Menu</Link>
        </div>
      </div>
    </div>
  )
}
