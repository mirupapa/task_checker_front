import React, { useState, useEffect, useRef } from 'react'
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
import { InsertTaskType, TaskType } from './TaskType'
import kyApi from '../API/kyAPI'

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

const InsertTask = (props: InsertTaskType): JSX.Element => {
  const {
    setRecords,
    setIsCreate,
    isCreate,
    records,
    refetch,
    setIsEditingId,
  } = props
  const classes = useStyles()
  const [title, setTitle] = useState<string>('')
  const addButtonRef = useRef<HTMLButtonElement>(null)
  const insertTitleRef = useRef<HTMLInputElement>(null)

  const setList = () => {
    const newTempItem: TaskType = {
      id: 0,
      title,
      done: false,
      delFlag: false,
      sort: 99,
      createdAt: '',
      updatedAt: '',
    }
    const newList = [...records, newTempItem]
    setRecords(newList)
    setIsCreate(false)
    setTitle('')
  }

  const addTask = async () => {
    if (addButtonRef.current) {
      addButtonRef.current.disabled = true
    }
    const json = {
      title,
      sort: records.length + 1,
    }
    const result = await kyApi('/task', 'POST', json)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    await refetch()
  }

  useEffect(() => {
    if (insertTitleRef.current) {
      insertTitleRef.current.focus()
    }
  }, [isCreate])

  if (isCreate) {
    return (
      <ListItem role={undefined} dense>
        <Box>
          <Grid container alignItems="center">
            <ListItemIcon />
            <TextField
              id="insertTitle"
              ref={insertTitleRef}
              label="title"
              variant="outlined"
              className={classes.inputField}
              size="small"
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !addButtonRef.current?.disabled) {
                  setList()
                  void addTask()
                }
              }}
            />
            <Button
              variant="contained"
              size="small"
              color="secondary"
              className={classes.okButton}
              onClick={() => {
                if (!addButtonRef.current?.disabled) {
                  setList()
                  void addTask()
                }
              }}
              disabled={title === ''}
              ref={addButtonRef}
            >
              ADD
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.cancelButton}
              onClick={() => setIsCreate(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      </ListItem>
    )
  }

  return (
    <ListItem
      role={undefined}
      dense
      button
      onClick={() => {
        setIsEditingId(undefined)
        setIsCreate(true)
      }}
    >
      <ListItemIcon>
        <AddCircleOutlineIcon className={classes.addButton} />
      </ListItemIcon>
    </ListItem>
  )
}

export default InsertTask
