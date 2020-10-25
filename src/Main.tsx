import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './UI/Table'
import { Button, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type columnsInfo = {
  title: string
  field: string
}
type recordsInfo = {
  id: number
  title: string
}

export type TaskInfo = {
  columns: columnsInfo[]
  records: recordsInfo[]
}

const useStyles = makeStyles({
  parent: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typo: {
    position: 'fixed',
    top: 10,
    left: 20,
    fontSize: 23,
  },
  logoutButton: {
    position: 'fixed',
    top: 10,
    right: 10,
  },
})

const Main = () => {
  const [tasks, setTasks] = useState<TaskInfo>()
  const classes = useStyles()

  useEffect(() => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('task_checker_token')}`,
      },
      responseType: 'json',
    })
    instance('/task/')
      .then((response) => {
        console.log(response.data)
        setTasks({
          columns: [
            { title: 'id', field: 'id' },
            { title: 'title', field: 'title' },
          ],
          records: response.data,
        })
      })
      .catch((error) => {
        console.log(error)
        window.location.href = '/login'
      })
  }, [])

  if (tasks == null) return null
  return (
    <Paper className={classes.parent}>
      <Typography align="center" className={classes.typo}>
        TASK CHECKER
      </Typography>
      <Table columns={tasks.columns} records={tasks.records} />
      <Button
        className={classes.logoutButton}
        variant="contained"
        color="primary"
        onClick={() => localStorage.removeItem('task_checker_token')}
        href="/login"
      >
        Logout
      </Button>
    </Paper>
  )
}

export default Main
