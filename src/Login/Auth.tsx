import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, CircularProgress } from '@material-ui/core'
import kyApi from '../API/kyAPI'
import { UserType } from './LoginType'
import { types } from '../reducer'

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
const Auth = (props: { children: unknown }): JSX.Element => {
  const { children } = props
  const [auth, setAuth] = useState<boolean>(false)
  const dispatch = useDispatch()
  const classes = useStyles()

  const checkAuth = async () => {
    const response = await kyApi('/auth')
    if ((response as UserType).MailAddress == null) {
      window.location.href = '/login'
    }
    setAuth(true)
    dispatch({ type: types.INFO, payload: response })

    return response
  }

  useEffect(() => {
    void checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return auth ? (
    (children as JSX.Element)
  ) : (
    <Paper className={classes.parent}>
      <CircularProgress color="inherit" />
    </Paper>
  )
}

export default Auth
