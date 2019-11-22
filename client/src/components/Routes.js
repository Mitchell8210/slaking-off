import React from "react"
import { useAuth } from "../hooks"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import Chat from "./Chat"
import CreateChannel from "./CreateChannel"
import Channels from "./Channels"
import Dashboard from "./Dashboard"
import Other from "./MenuOptions/Other"
import Categories from "./MenuOptions/Categories"
import Users from "./MenuOptions/Users"
export default props => {
  const { username, signout } = useAuth()

  function handleLogout(e) {
    e.preventDefault()
    signout()
  }
  return (
    <Router>
      <Switch>
        <Route exact path={"/Channels/"} component={Channels} />
        <Route exact path={"/CreateChannel"} component={CreateChannel} />
        <Route exact path={"/Chat/:id"} component={Chat} />
        <Route exact path={"/"} component={Dashboard} />
        <Route exact path={"/Users"} component={Users} />
        <Route exact path={"/Categories"} component={Categories} />
        <Route exact path={"/Other"} component={Other} />
      </Switch>
    </Router>
  )
}
