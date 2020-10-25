import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from 'Login/Login'
import Main from './Main'
import Auth from './Login/Auth'
import SignUp from './Login/SignUp'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Auth>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/signUp" component={SignUp} />
        </Auth>
      </Switch>
    </BrowserRouter>
  )
}

export default App
