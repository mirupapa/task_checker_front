import React, { useState } from 'react'
import { setUserInfo } from '../Slice/UserInfo'
import { useDispatch } from 'react-redux'
import { kyApi } from '../API/kyAPI'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles({
  parent: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

// 承認処理
const Auth = (props: { children: any }) => {
  const [auth, setAuth] = useState<boolean>(false)
  const dispatch = useDispatch()
  const classes = useStyles()

  const checkAuth = async () => {
    const response = await kyApi('/auth')
    if (response.MailAddress == null) {
      window.alert('アクセス不可')
      window.location.href = '/login'
    } else {
      setAuth(true)
      dispatch(setUserInfo(response))
    }
  }

  checkAuth()
  return auth ? (
    props.children
  ) : (
    <Paper className={classes.parent}>
      <CircularProgress color="inherit" />
    </Paper>
  )
}

export default Auth
