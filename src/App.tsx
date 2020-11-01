import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from 'Login/Login'
import Main from './Main'
import Auth from './Login/Auth'
import SignUp from './Login/SignUp'
import Header from './Header'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
        <Auth>
          <Header />
          <Route path="/" exact>
            <Main />
          </Route>
        </Auth>
      </Switch>
    </BrowserRouter>
  )
}

export default App
