import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './Common/Table'

type columnsInfo = {
  title: string
  field: string
}
type recordsInfo = {
  id: number
  title: string
}

export type TaskInfo = {
  columns: columnsInfo[]
  records: recordsInfo[]
}

const Main = () => {
  const [tasks, setTasks] = useState<TaskInfo>()

  useEffect(() => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('task_checker_token')}`,
      },
      responseType: 'json',
    })
    instance('/task/')
      .then((response) => {
        console.log(response.data)
        setTasks({
          columns: [
            { title: 'id', field: 'id' },
            { title: 'title', field: 'title' },
          ],
          records: response.data,
        })
      })
      .catch((error) => {
        console.log(error)
        window.location.href = '/login'
      })
  }, [])

  if (tasks == null) return null
  return (
    <div>
      <Table columns={tasks.columns} records={tasks.records} />
    </div>
  )
}

export default Main
