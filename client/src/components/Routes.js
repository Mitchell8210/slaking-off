import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Chat from "./Chat"
import CreateChannel from "./CreateChannel"
import Channels from "./Channels"
import Dashboard from "./Dashboard"
import Other from "./MenuOptions/Other"
import Categories from "./MenuOptions/Categories"
import Users from "./MenuOptions/Users"
import ChatWindow from "./chatWindow"
import ChannelChat from "./ChannelChat"
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
        <Route exact path={"/Other"} component={Other} />
        <Route exact path={"/chatWindow"} component={ChatWindow} />
      </Switch>
    </Router>
  )
}
