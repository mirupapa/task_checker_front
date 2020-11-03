import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from 'Login/Login'
import Task from './Task/Task'
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
          <Route path="/" component={Task} exact />
        </Auth>
      </Switch>
    </BrowserRouter>
  )
}

export default App
