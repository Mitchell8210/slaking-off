import React, { useState } from "react"
import { useAuth } from "../hooks"
import { Link } from "react-router-dom"
export default props => {
  const { reset } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [answer, setAnswer] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    reset(username, password, answer).then(resp => {
      props.history.push("/")
    })
  }

  return (
    <div className="loginContainer">
      <div className="ResetScreen">
        <form onSubmit={handleSubmit}>
          <div className="loginTitle">Reset Password</div>
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
            onChange={e => setAnswer(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
        <div className="registerLink">
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  )
}
