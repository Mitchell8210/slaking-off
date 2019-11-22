import React, { useState } from "react"
import { useAuth } from "../hooks"
import { Link } from "react-router-dom"
import Register from "./Registration"

export default props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { signin } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    signin(username, password)
      .then(resp => {
        props.history.push("/")
      })
      .catch(e => {
        console.log("LOGIN ERROR")
      })
  }

  return (
    <div className="loginContainer">
      <div className="loginScreen">
        <form onSubmit={handleSubmit}>
          <div className="loginTitle">Login</div>
          <input
            type="text"
            placeholder="username"
            required
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="registerLink">
          <div>New user?</div>
          <Link to={"/Registration"}>Register here</Link>
        </div>
      </div>
    </div>
  )
}
