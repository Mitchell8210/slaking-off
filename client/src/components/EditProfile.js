import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useUserInfo, useAuth } from "../hooks"

export default props => {
  const { makeProfile } = useUserInfo()
  const { username } = useAuth()
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [about, setAbout] = useState("")
  const [url, setURL] = useState("")
  function handleSubmit(e) {
    e.preventDefault()

    makeProfile(email, location, about, url, username)
  }

  return (
    <div className="mainScreenContainer">
      <div className="mainScreenCover">
        <div className="editProfileContainer">
          <div className="editProfileCover">
            <h1>Edit Profile, baby!</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="location">Location</label>
              <input
                type="text"
                placeholder="location"
                name="location"
                onChange={e => setLocation(e.target.value)}
              />
              <label htmlFor="about">About</label>
              <textarea
                name="about"
                placeholder="a little about yourself"
                onChange={e => setAbout(e.target.value)}
              />
              <label htmlFor="picture">Image URL</label>
              <input
                type="url"
                name="picture"
                onChange={e => setURL(e.target.value)}
              />
              <button type="submit">Update Profile</button>
            </form>
            <div className="backToProfile">
              <Link to={"/"}>Main Menu</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
