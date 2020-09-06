import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from 'Login/Login'
import Main from './Main'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
