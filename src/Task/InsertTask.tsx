import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from 'react'
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
  setRecords: Dispatch<SetStateAction<Array<TaskType>>>
}) => {
  const classes = useStyles()
  const [title, setTitle] = useState<string>('')
  const addButtonRef = useRef<HTMLButtonElement>(null)

  const setList = () => {
    const newTempItem = {
      id: 0,
      title: title,
      done: false,
      del_flag: false,
      sort: 99,
      created_at: '',
      updated_at: '',
    }
    const newList = [...props.records, newTempItem]
    props.setRecords(newList)
    props.setIsCreate(false)
    setTitle('')
  }

  const addTask = async () => {
    if (addButtonRef.current) {
      addButtonRef.current.disabled = true
    }
    const json = {
      title: title,
      sort: props.records.length + 1,
    }
    const result = await kyApi('/task', 'POST', json)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    await props.refetch()
  }

  useEffect(() => {
    document.getElementById('insertTitle')?.focus()
  }, [props.isCreate])

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
                if (e.key === 'Enter' && !addButtonRef.current?.disabled) {
                  setList()
                  addTask()
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
                  addTask()
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
