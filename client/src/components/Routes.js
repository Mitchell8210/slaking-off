import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Chat from "./Chat"
import CreateChannel from "./CreateChannel"
import Channels from "./Channels"
import Dashboard from "./Dashboard"
import Profile from "./MenuOptions/Profile"
import Categories from "./MenuOptions/Categories"
import Users from "./MenuOptions/Users"
import ChannelChat from "./ChannelChat"
import EditProfile from "./EditProfile"
export default props => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/Channels/"} component={Channels} />
        <Route
          exact
          path={`/ChannelChat/:channel_name/:id`}
          component={ChannelChat}
        />
        <Route exact path={"/CreateChannel"} component={CreateChannel} />
        <Route exact path={"/Chat/:id"} component={Chat} />
        <Route exact path={"/"} component={Dashboard} />
        <Route exact path={"/Users"} component={Users} />
        <Route exact path={"/Categories"} component={Categories} />
        <Route exact path={"/Profile"} component={Profile} />
        <Route exact path={"/editProfile"} component={EditProfile} />
      </Switch>
    </Router>
  )
}
