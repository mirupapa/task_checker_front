import React, { Dispatch, SetStateAction } from 'react'
import { List, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { kyApi } from '../API/kyAPI'
import { useQuery } from 'react-query'
import TaskItem from './TaskItem'
import InsertTask from './InsertTask'

export type TaskType = {
  id: number
  title: string
  done: boolean
  del_flag: boolean
  sort: number
  created_at: string
  updated_at: string
}

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
})

const TaskList = (props: {
  setIsCreate: Dispatch<SetStateAction<boolean>>
  isCreate: boolean
  setIsEditingId: Dispatch<SetStateAction<number | undefined>>
  isEditingId: number | undefined
}) => {
  const classes = useStyles()
  const url = '/task'
  const { data, refetch } = useQuery(url, kyApi)

  if (!Array.isArray(data)) {
    window.location.href = '/login'
  }

  return (
    <Card onClick={(e) => e.stopPropagation()}>
      <List className={classes.list}>
        {data.map((task: TaskType) => {
          return (
            <TaskItem key={task.id} task={task} {...props} refetch={refetch} />
          )
        })}
        <InsertTask {...props} refetch={refetch} data={data} />
      </List>
    </Card>
  )
}

export default TaskList
