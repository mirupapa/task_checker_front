import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Main = () => {
  interface taskInfo {
    id: number
    title: string
  }
  const [result, setResult] = useState<taskInfo[]>()

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
        setResult(response.data)
      })
      .catch((error) => {
        console.log(error)
        window.location.href = '/login'
      })
  }, [])

  if (result == null) return null
  return (
    <div>
      {result.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}

export default Main
