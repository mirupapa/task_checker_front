import React from 'react'
import { TextField, Button, Paper, Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { FormikHandlers, FormikProps, withFormik } from 'formik'
import * as Yup from 'yup'
import { TokenType } from './LoginType'

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
      fontSize: '12px',
    },
  })
)

type FormValues = {
  mailAddress: string
  password: string
}

const InnerForm = (props: FormikHandlers & FormikProps<FormValues>) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    touched,
    errors,
    isSubmitting,
    values,
    handleSubmit,
    handleChange,
  } = props
  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <Typography align="center" className={classes.typo}>
          TASK CHECKER
        </Typography>
        <Grid container justify="center">
          <div>
            <TextField
              id="mailAddress"
              label="mailAddress"
              required
              value={values.mailAddress}
              className={classes.input}
              onChange={handleChange}
            />
            {touched.mailAddress && errors.mailAddress && (
              <div className={classes.error}>{errors.mailAddress}</div>
            )}
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={values.password}
              className={classes.input}
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <div className={classes.error}>{errors.password}</div>
            )}
          </div>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            CREATE
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

type LoginFormProps = {
  mailAddress?: string
  password?: string
}

const login = (values: FormValues, setSubmitting: (arg0: boolean) => void) => {
  setTimeout(() => {
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mailAddress: `${values.mailAddress}`,
        password: `${values.password}`,
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
        localStorage.setItem('task_checker_token', (res as TokenType).Token)
        window.location.href = '/'
      })
      .catch((error) => {
        setSubmitting(false)
        throw error
      })
  }, 1000)
}

const Login = withFormik<LoginFormProps, FormValues>({
  mapPropsToValues: () => ({ mailAddress: '', password: '' }),
  validationSchema: Yup.object().shape({
    mailAddress: Yup.string()
      .required('必須です')
      .email('メール形式のみ可能です'),
    password: Yup.string()
      .required('必須です')
      .matches(/^[a-zA-Z0-9]+$/, { message: '英数字のみ可能です' }),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    login(values, setSubmitting)
  },
})(InnerForm)

// const Login: FC = () => {
//   const classes = useStyles()
//   const [isSubmitting, setSubmitting] = useState(false)
//   const mailRef = useRef<HTMLInputElement>(null)
//   const passwordRef = useRef<HTMLInputElement>(null)

//   const submit = () => {
//     return fetch(
//       `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/login`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           mailAddress: mailRef.current?.value,
//           password: passwordRef.current?.value,
//         }),
//       }
//     )
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`${res.status} ${res.statusText}`)
//         }

//         return res.json()
//       })
//       .then((res) => {
//         setSubmitting(false)
//         localStorage.setItem('task_checker_token', (res as TokenType).Token)
//         window.location.href = '/'
//       })
//       .catch((error) => {
//         setSubmitting(false)
//         throw error
//       })
//   }

//   return (
//     <form onSubmit={submit} className={classes.root}>
//       <Paper className={classes.paper}>
//         <Typography align="center" className={classes.typo}>
//           TASK CHECKER
//         </Typography>
//         <Grid container justify="center">
//           <Box>
//             <TextField
//               id="mailAddress"
//               label="mailAddress"
//               required
//               inputRef={mailRef}
//               className={classes.input}
//             />
//           </Box>
//           <Box>
//             <TextField
//               id="password"
//               label="Password"
//               type="password"
//               autoComplete="current-password"
//               required
//               inputRef={passwordRef}
//               className={classes.input}
//             />
//           </Box>
//           <Button
//             variant="contained"
//             color="primary"
//             type="button"
//             className={classes.loginButton}
//             disabled={isSubmitting}
//             onClick={() => submit()}
//           >
//             LOGIN
//           </Button>
//         </Grid>
//       </Paper>
//       <Button
//         className={classes.signUpButton}
//         variant="contained"
//         color="primary"
//         href="/signUp"
//       >
//         Sign Up
//       </Button>
//     </form>
//   )
// }

export default Login
