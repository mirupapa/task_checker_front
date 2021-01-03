import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  ListItemIcon,
  ListItem,
  TextField,
  Grid,
  Box,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { kyApi } from '../API/kyAPI'
import { RefetchOptions } from 'react-query/types/core/query'
import { TaskType } from './TaskList'

const useStyles = makeStyles({
  addButton: {
    marginLeft: '-3px',
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

const InsertTask = (props: {
  setIsCreate: Dispatch<SetStateAction<boolean>>
  isCreate: boolean
  setIsEditingId: Dispatch<SetStateAction<number | undefined>>
  refetch: (options?: RefetchOptions | undefined) => Promise<any>
  records: Array<TaskType>
}) => {
  const classes = useStyles()
  const [title, setTitle] = useState<string>('')

  const addTask = async () => {
    const json = {
      title: title,
      sort: props.records.length + 1,
    }
    const result = await kyApi('/task', 'POST', json)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    await props.refetch()
    props.setIsCreate(false)
    setTitle('')
  }

  if (props.isCreate) {
    return (
      <ListItem role={undefined} dense>
        <Box>
          <Grid container alignItems="center">
            <ListItemIcon />
            <TextField
              id="insertTitle"
              label="title"
              variant="outlined"
              className={classes.inputField}
              size="small"
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addTask()
              }}
            />
            <Button
              variant="contained"
              size="small"
              color="secondary"
              className={classes.okButton}
              onClick={() => addTask()}
              disabled={title === ''}
            >
              ADD
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.cancelButton}
              onClick={() => props.setIsCreate(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      </ListItem>
    )
  } else {
    return (
      <ListItem
        role={undefined}
        dense
        button
        onClick={() => {
          props.setIsEditingId(undefined)
          props.setIsCreate(true)
        }}
      >
        <ListItemIcon>
          <AddCircleOutlineIcon className={classes.addButton} />
        </ListItemIcon>
      </ListItem>
    )
  }
}

export default InsertTask
