import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  parent: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Main = (): JSX.Element => {
  const classes = useStyles()

  return <Paper className={classes.parent}>Main</Paper>
}

export default Main
