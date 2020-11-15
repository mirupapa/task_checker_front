import React, { Suspense, useState } from 'react'
import { Paper, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TaskList from './TaskList'

const useStyles = makeStyles({
  parent: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Task = () => {
  const classes = useStyles()
  const [isCreate, setIsCreate] = useState(false)
  const [isEditingId, setIsEditingId] = useState<number | undefined>()

  const allCancel = () => {
    setIsCreate(false)
    setIsEditingId(undefined)
  }

  return (
    <Paper className={classes.parent} onClick={() => allCancel()}>
      <Suspense fallback={<CircularProgress color="inherit" />}>
        <TaskList
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          isEditingId={isEditingId}
          setIsEditingId={setIsEditingId}
        />
      </Suspense>
    </Paper>
  )
}

export default Task
