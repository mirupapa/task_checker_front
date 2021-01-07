import React, { useState, useEffect } from 'react'
import { Container, Draggable, DropResult } from 'react-smooth-dnd'
import arrayMove from 'array-move'
import { List, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'
import TaskItem from './TaskItem'
import InsertTask from './InsertTask'
import kyApi from '../API/kyAPI'
import { TaskType, TaskListType } from './TaskType'

const useStyles = makeStyles({
  card: {
    padding: '3px',
  },
  list: {
    width: 500,
    maxHeight: 'calc(100vh - 300px)',
    overflowY: 'auto',
  },
  doneTitle: {
    textDecoration: 'line-through',
    color: 'grey',
  },
  noDoneTitle: {
    textDecoration: 'unset',
  },
})

const TaskList = (props: TaskListType): JSX.Element => {
  const { setIsEditingId, isEditingId, isCreate, setIsCreate } = props
  const classes = useStyles()
  const url = '/task'
  const { data, refetch } = useQuery(url, kyApi)
  const [records, setRecords] = useState<Array<TaskType>>(
    data as Array<TaskType>
  )

  if (!Array.isArray(data)) {
    window.location.href = '/login'
  }

  const upSortTask = async (newTasks: Array<TaskType>) => {
    const result = await kyApi('/task/upSort', 'PUT', newTasks)
    if (result !== 'success') {
      window.location.href = '/login'
    }
    void refetch()
    setIsEditingId(undefined)
  }

  const onDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult
    const newTasks: Array<TaskType> = arrayMove(
      data as Array<TaskType>,
      removedIndex || 0,
      addedIndex || 0
    )
    setRecords(newTasks)
    void upSortTask(newTasks)
  }

  useEffect(() => {
    setRecords(data as Array<TaskType>)
  }, [data])

  return (
    <Card onClick={(e) => e.stopPropagation()} className={classes.card}>
      <List className={classes.list}>
        <Container
          dragHandleSelector=".drag-handle"
          lockAxis="y"
          onDrop={onDrop}
        >
          {records.map((task: TaskType) => {
            return (
              <Draggable key={task.id}>
                <TaskItem
                  setIsEditingId={setIsEditingId}
                  isEditingId={isEditingId}
                  setIsCreate={setIsCreate}
                  task={task}
                  records={records}
                  setRecords={setRecords}
                  refetch={refetch}
                />
              </Draggable>
            )
          })}
        </Container>
      </List>
      <InsertTask
        isCreate={isCreate}
        setIsEditingId={setIsEditingId}
        setIsCreate={setIsCreate}
        refetch={refetch}
        records={records}
        setRecords={setRecords}
      />
    </Card>
  )
}

export default TaskList
