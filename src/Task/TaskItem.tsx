import React, { Dispatch, SetStateAction, useState } from 'react'
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
import { makeStyles } from '@material-ui/core/styles'
import { kyApi } from '../API/kyAPI'
import { useQuery } from 'react-query'
import { TaskType } from './TaskList'
import { RefetchOptions } from 'react-query/types/core/query'
import DeleteIcon from '@material-ui/icons/Delete'

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

const TaskItem = (props: {
  setIsEditingId: Dispatch<SetStateAction<number | undefined>>
  isEditingId: number | undefined
  task: TaskType
  refetch: (options?: RefetchOptions | undefined) => Promise<any>
  setIsCreate: Dispatch<SetStateAction<boolean>>
}) => {
  const classes = useStyles()
  const [title, setTitle] = useState<string>(props.task.title)

  const url = '/task'
  const { data, refetch } = useQuery(url, kyApi)

  if (!Array.isArray(data)) {
    window.location.href = '/login'
  }

  const doneToggle = async (task: TaskType) => {
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

  const putTask = async () => {
    const json = {
      id: props.task.id,
      title: title,
    }
    const result = await kyApi('/task', 'PUT', json)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    props.refetch()
    props.setIsEditingId(undefined)
  }

  const deleteTask = async () => {
    console.log(111)
    const json = {
      id: props.task.id,
    }
    const result = await kyApi('/task', 'DELETE', json)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    props.refetch()
    props.setIsEditingId(undefined)
  }

  if (props.isEditingId === props.task.id) {
    return (
      <ListItem role={undefined} dense button>
        <Box>
          <Grid container alignItems="center">
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={props.task.done}
                tabIndex={-1}
                disableRipple
                onClick={() => doneToggle(props.task)}
              />
            </ListItemIcon>
            <TextField
              id="insertTitle"
              label="title"
              variant="outlined"
              className={classes.inputField}
              size="small"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              onKeyPress={(e) => {
                if (e.key === 'Enter') putTask()
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
  } else {
    return (
      <ListItem role={undefined} dense button>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={props.task.done}
            tabIndex={-1}
            disableRipple
            onClick={() => doneToggle(props.task)}
          />
        </ListItemIcon>
        <ListItemText
          primary={props.task.title}
          className={props.task.done ? classes.doneTitle : classes.noDoneTitle}
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
}

export default TaskItem
