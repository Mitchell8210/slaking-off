import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./Login"
import CheckLogin from "./CheckLogin"
import Registration from "./Registration"
import Reset from "./Reset"
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/Registration" component={Registration} />
          <Route path="/ResetPassword" component={Reset} />
          <Route path="*" component={CheckLogin} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
