import React, { FC, useState, useRef } from 'react'
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  Box,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh',
    },
    paper: {
      width: '50vw',
      height: '24vh',
      margin: 'auto',
      background: '#eee',
    },
    input: {
      marginRight: theme.spacing(1),
    },
    typo: {
      fontSize: theme.typography.pxToRem(23),
      height: '12vh',
      lineHeight: '12vh',
    },
    loginButton: {
      height: 36,
    },
    signUpButton: {
      position: 'fixed',
      top: 10,
      right: 10,
    },
    error: {
      color: 'red',
    },
  })
)

const Login: FC = () => {
  const classes = useStyles()
  const [isSubmitting, setSubmitting] = useState(false)
  const mailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const submit = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mailAddress: mailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then((res) => {
        setSubmitting(false)
        console.log(res)
        localStorage.setItem('task_checker_token', res.Token)
        window.location.href = '/'
      })
      .catch((error) => {
        setSubmitting(false)
        window.alert(error)
      })
  }

  return (
    <form onSubmit={submit} className={classes.root}>
      <Paper className={classes.paper}>
        <Typography align="center" className={classes.typo}>
          TASK CHECKER
        </Typography>
        <Grid container justify="center">
          <Box>
            <TextField
              id="mailAddress"
              label="mailAddress"
              required
              inputRef={mailRef}
              className={classes.input}
            />
          </Box>
          <Box>
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              inputRef={passwordRef}
              className={classes.input}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={classes.loginButton}
            disabled={isSubmitting}
            onClick={() => submit()}
          >
            LOGIN
          </Button>
        </Grid>
      </Paper>
      <Button
        className={classes.signUpButton}
        variant="contained"
        color="primary"
        href="/signUp"
      >
        Sign Up
      </Button>
    </form>
  )
}

export default Login
