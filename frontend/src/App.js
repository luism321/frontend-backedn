
import React from "react"
import { BrowserRouter as  Switch, Route, HashRouter } from "react-router-dom"

import './App.css';
import Inicio from "./component/Inicio";
function App() {
  return (
    <div>
      <HashRouter>
          <Switch>
          <Route exact path="/">
            <Inicio></Inicio>
          </Route>
          </Switch>
      </HashRouter>
    </div>
  )
}

export default App
