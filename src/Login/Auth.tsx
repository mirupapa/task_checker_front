import React, { useState } from 'react'
import axios from 'axios'
import { setUserInfo } from '../Slice/UserInfo'
import { useDispatch } from 'react-redux'

// 承認処理
const Auth = (props: { children: any }) => {
  const [auth, setAuth] = useState<boolean>()
  const dispatch = useDispatch()
  const checkAuth = async () => {
    const url = `${process.env.REACT_APP_API_URL}/auth`
    return axios({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('task_checker_token')}`,
      },
      url,
    })
      .then((results) => {
        console.log(results.data)
        setAuth(true)
        dispatch(setUserInfo(results.data))
      })
      .catch((error) => {
        window.alert(error)
        window.location.href = '/login'
      })
  }

  checkAuth()
  return auth != null ? props.children : <div>Loading...</div>
}

export default Auth