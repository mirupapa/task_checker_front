import React from 'react'
import { TextField, Button, Paper, Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import axios from 'axios'
import { InjectedFormikProps, withFormik } from 'formik'
import * as Yup from 'yup'

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
    backButton: {
      position: 'fixed',
      top: 10,
      left: 10,
    },
  })
)

type FormValues = {
  mailAddress: string
  userName: string
  password: string
}

type FormProps = {
  mailAddress?: string
  userName?: string
  password?: string
}

const InnerForm: React.SFC<InjectedFormikProps<FormProps, FormValues>> = (
  props
) => {
  const classes = useStyles()
  return (
    <form onSubmit={props.handleSubmit} className={classes.root}>
      <Paper className={classes.paper}>
        <Typography align="center" className={classes.typo}>
          SIGN UP
        </Typography>
        <Grid container justify="center">
          <TextField
            id="mailAddress"
            label="mailAddress"
            required
            value={props.values.mailAddress}
            onChange={props.handleChange}
            className={classes.input}
          />
          {props.touched.mailAddress && props.errors.mailAddress && (
            <div>{props.errors.mailAddress}</div>
          )}
          <TextField
            id="userName"
            label="userName"
            required
            value={props.values.userName}
            onChange={props.handleChange}
            className={classes.input}
          />
          {props.touched.userName && props.errors.userName && (
            <div>{props.errors.userName}</div>
          )}
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={props.values.password}
            onChange={props.handleChange}
            className={classes.input}
          />
          {props.touched.password && props.errors.password && (
            <div>{props.errors.password}</div>
          )}
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            type="submit"
            disabled={props.isSubmitting}
          >
            CREATE
          </Button>
        </Grid>
      </Paper>
      <Button
        className={classes.backButton}
        variant="contained"
        color="secondary"
        href="/login"
      >
        BACK
      </Button>
    </form>
  )
}

const SignUp = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({ mailAddress: '', userName: '', password: '' }),
  validationSchema: Yup.object().shape({
    mailAddress: Yup.string().required('required mailAddress'),
    userName: Yup.string().required('required userName'),
    password: Yup.string().required('required password'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}/signUp`, {
          mailAddress: `${values.mailAddress}`,
          userName: `${values.userName}`,
          password: `${values.password}`,
        })
        .then((results) => {
          setSubmitting(false)
          localStorage.setItem('task_checker_token', results.data)
          window.location.href = '/'
        })
        .catch((error) => {
          setSubmitting(false)
          window.alert(error)
        })
    }, 1000)
  },
})(InnerForm)

export default SignUp
