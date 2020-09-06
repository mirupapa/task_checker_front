// import React from 'react'
import React, { ReactElement } from 'react'
import { TextField, Button } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import axios from 'axios'
import { InjectedFormikProps, withFormik } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
)

interface FormValues {
  userID: string
  password: string
}

interface FormProps {
  userID?: string
  password?: string
}

const InnerForm: React.SFC<InjectedFormikProps<FormProps, FormValues>> = (
  props
) => {
  const classes = useStyles()
  return (
    <form onSubmit={props.handleSubmit} className={classes.root}>
      <TextField
        id="userID"
        label="userID"
        required
        value={props.values.userID}
        onChange={props.handleChange}
      />
      {props.touched.userID && props.errors.userID && (
        <div>{props.errors.userID}</div>
      )}
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={props.values.password}
        onChange={props.handleChange}
      />
      {props.touched.password && props.errors.password && (
        <div>{props.errors.password}</div>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={props.isSubmitting}
      >
        Submit
      </Button>
    </form>
  )
}

const Login = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({ userID: '', password: '' }),
  validationSchema: Yup.object().shape({
    userID: Yup.string().required('required userID'),
    password: Yup.string().required('required password'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log('login-check')
      return axios
        .post(process.env.REACT_APP_API_URL + '/login', {
          userID: `${values.userID}`,
          password: `${values.password}`,
        })
        .then((results) => {
          setSubmitting(false)
          localStorage.setItem('task_checker_token', results.data)
          window.location.href = '/'
        })
        .catch((error) => {
          setSubmitting(false)
          console.log(error)
        })
    }, 1000)
  },
})(InnerForm)

export interface HandleQueryProps {
  children: ReactElement
}

// export const Auth: React.FC<HandleQueryProps> = ({ children }) => {
//   const boo: boolean = false
//   const headers = {
//     'Authorization': `Bearer ${localStorage.getItem('task_checker_token')}`
//   }
//   return (
//     boo ? <Redirect to='/login' /> : children
//   )
// }

// export const Auth: React.FC<HandleQueryProps> = ({ children }) => {
//   const headers = {
//     'Authorization': `Bearer ${localStorage.getItem('task_checker_token')}`
//   }
//   return axios.post(process.env.REACT_APP_API_URL + '/auth', {}, {
//     headers: headers
//   })
//     .then(() => {
//       return children
//     })
//     .catch(() => {
//       return <Redirect to='/login' />
//     })
// }

export default Login
