import React from "react"
import { Link } from "react-router-dom"
export default props => {
  return (
    <div className="mainScreenContainer">
      <div className="mainScreenCover">
        <h1>Categories, baby!</h1>
        <div className="mainMenuLink">
          <Link to={"/"}>Main Menu</Link>
        </div>
      </div>
    </div>
  )
}
