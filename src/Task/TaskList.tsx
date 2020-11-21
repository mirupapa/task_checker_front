import React, { Dispatch, SetStateAction } from 'react'
import { Container, Draggable, DropResult } from 'react-smooth-dnd'
import arrayMove from 'array-move'
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
  const [tasks, setTasks] = React.useState<Array<TaskType>>(data)

  if (!Array.isArray(data)) {
    window.location.href = '/login'
  }

  const upSortTask = async (newTasks: Array<TaskType>) => {
    const result = await kyApi('/task/upSort', 'PUT', newTasks)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    refetch()
    props.setIsEditingId(undefined)
  }

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult
    const newTasks: Array<TaskType> = arrayMove(
      data,
      removedIndex || 0,
      addedIndex || 0
    )
    setTasks(newTasks)
    upSortTask(newTasks)
  }

  return (
    <Card onClick={(e) => e.stopPropagation()}>
      <List className={classes.list}>
        <Container
          dragHandleSelector=".drag-handle"
          lockAxis="y"
          onDrop={onDrop}
        >
          {tasks.map((task: TaskType) => {
            return (
              <Draggable key={task.id}>
                <TaskItem task={task} {...props} refetch={refetch} />
              </Draggable>
            )
          })}
        </Container>
        <InsertTask {...props} refetch={refetch} data={data} />
      </List>
    </Card>
  )
}

export default TaskList
