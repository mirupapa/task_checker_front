import axios from 'axios'

export const PostApi = async (api: string, data: Object) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const instance = axios.create({
    method: 'POST',
    baseURL: process.env.REACT_APP_API_URL,
    headers: headers,
    responseType: 'json',
    data: JSON.stringify(data),
  })

  return await instance(api)
    .then((results) => {
      return results
    })
    .catch((error) => {
      return error
    })
}
