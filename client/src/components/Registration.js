import React, { useState } from "react"
import { useAuth } from "../hooks"
import { Link } from "react-router-dom"
export default props => {
  const { register } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [securityQuestion, setSecurityQuestion] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    register(username, password, securityQuestion).then(resp => {
      props.history.push("/")
    })
  }

  return (
    <div className="loginContainer">
      <div className="RegisterScreen">
        <form onSubmit={handleSubmit}>
          <div className="loginTitle">Register</div>
          <input
            type="text"
            placeholder="username"
            required
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <label className="securityLabel" htmlFor="securityQuestion">
            Security Question: what is your favorite color?
          </label>
          <input
            type="text"
            name="securityQuestion"
            placeholder="Security Answer"
            required
            onChange={e => setSecurityQuestion(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <div className="registerLink">
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  )
}
