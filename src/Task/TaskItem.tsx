import React, { useState, useEffect, useRef } from 'react'
import {
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  TextField,
  Grid,
  Box,
  Button,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { TaskType, TaskItemType } from './TaskType'
import kyApi from '../API/kyAPI'

const useStyles = makeStyles({
  list: {
    width: 500,
  },
  doneTitle: {
    textDecoration: 'line-through',
    color: 'grey',
  },
  noDoneTitle: {
    textDecoration: 'unset',
  },
  inputField: {},
  okButton: {
    marginLeft: 5,
    height: 30,
  },
  cancelButton: {
    marginLeft: 5,
    height: 30,
  },
})

const TaskItem = (props: TaskItemType): JSX.Element => {
  const { task, refetch, records, isEditingId } = props
  const classes = useStyles()
  const [title, setTitle] = useState<string>(task.title)
  const [done, setDone] = useState<boolean>(task.done)
  const updateTitleRef = useRef<HTMLInputElement>(null)

  const doneToggle = async (doneTask: TaskType) => {
    setDone(!done)
    const json = {
      id: doneTask.id,
      done: !done,
    }
    const result = await kyApi('/task/done', 'PUT', json)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    void refetch()
  }

  const putTask = async () => {
    const renewList: Array<TaskType> = []
    records.forEach((record) => {
      if (props.isEditingId !== record.id) {
        renewList.push(record)
      } else {
        const updateTask: TaskType = {
          id: record.id,
          title,
          done: record.done,
          delFlag: record.delFlag,
          sort: record.sort,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
        }
        renewList.push(updateTask)
      }
    })
    props.setRecords(renewList)
    props.setIsEditingId(undefined)
    const json = {
      id: props.task.id,
      title,
    }
    const result = await kyApi('/task', 'PUT', json)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    void refetch()
  }

  const deleteTask = async () => {
    props.setIsEditingId(undefined)
    setTitle('')
    const json = {
      id: props.task.id,
    }
    const result = await kyApi('/task', 'DELETE', json)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    void refetch()
  }

  useEffect(() => {
    if (isEditingId === task.id && updateTitleRef.current) {
      updateTitleRef.current.focus()
    }
  }, [isEditingId, task.id])

  if (title === null) return <></>
  if (isEditingId === task.id) {
    return (
      <ListItem role={undefined} dense button>
        <Box>
          <Grid container alignItems="center">
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={done}
                tabIndex={-1}
                disableRipple
                onClick={() => doneToggle(props.task)}
              />
            </ListItemIcon>
            <TextField
              id="updateTitle"
              label="title"
              variant="outlined"
              className={classes.inputField}
              size="small"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              ref={updateTitleRef}
              onKeyPress={(e) => {
                if (e.key === 'Enter') void putTask()
              }}
            />
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.okButton}
              onClick={() => putTask()}
              disabled={title === ''}
            >
              UPDATE
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.cancelButton}
              onClick={() => props.setIsEditingId(undefined)}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      </ListItem>
    )
  }

  return (
    <ListItem role={undefined} dense button>
      <ListItemIcon>
        <DragHandleIcon
          style={{ margin: 'auto 10px auto 0' }}
          className="drag-handle"
        />
        <Checkbox
          edge="start"
          checked={done}
          tabIndex={-1}
          disableRipple
          onClick={() => doneToggle(props.task)}
        />
      </ListItemIcon>
      <ListItemText
        primary={task.title}
        className={task.done ? classes.doneTitle : classes.noDoneTitle}
        onClick={() => {
          setTitle(props.task.title)
          props.setIsCreate(false)
          props.setIsEditingId(props.task.id)
        }}
      />
      <ListItemSecondaryAction onClick={() => deleteTask()}>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TaskItem
