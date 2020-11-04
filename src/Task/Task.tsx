import React, { Suspense } from 'react'
import {
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Paper,
  Card,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { kyApi } from '../API/kyAPI'
import { useQuery } from 'react-query'

type taskType = {
  id: number
  title: string
  done: boolean
  del_flag: boolean
  sort: number
  created_at: string
  updated_at: string
}

const useStyles = makeStyles({
  parent: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: 500,
  },
})

const Task = () => {
  const classes = useStyles()

  const TaskList: React.FC = () => {
    const url = '/task/'
    const { data, refetch } = useQuery(url, kyApi)

    if (!Array.isArray(data)) {
      window.location.href = '/login'
    }

    const doneToggle = async (task: taskType) => {
      const json = {
        id: task.id,
        done: !task.done,
      }
      const result = await kyApi('/task/done', 'PUT', json)
      if (result !== 'success') {
        window.location.href = '/login'
      }
      refetch()
    }

    console.log(data)

    return (
      <Card>
        <List className={classes.list}>
          {data.map((task: taskType) => {
            return (
              <ListItem key={task.id} role={undefined} dense button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.done}
                    tabIndex={-1}
                    disableRipple
                    onClick={() => doneToggle(task)}
                  />
                </ListItemIcon>
                <ListItemText primary={task.title} />
              </ListItem>
            )
          })}
        </List>
      </Card>
    )
  }

  return (
    <Paper className={classes.parent}>
      <Suspense fallback={<CircularProgress color="inherit" />}>
        <TaskList />
      </Suspense>
    </Paper>
  )
}

export default Task
