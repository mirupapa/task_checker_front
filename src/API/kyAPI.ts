import ky, { Options } from 'ky'

const DEFAULT_API_OPTIONS: Options = {
  timeout: 7000,
  retry: 2,
}

export const kyApi = async (
  url: string,
  method: string = 'GET',
  data: Object = {}
) => {
  const params = method === 'GET' ? { param: data } : { json: data }
  const mergeOptions = {
    ...DEFAULT_API_OPTIONS,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('task_checker_token')}`,
    },
    ...params,
  }

  try {
    const response = await ky(process.env.REACT_APP_API_URL + url, mergeOptions)
    return response.json()
  } catch (error) {
    console.error(error)
    return error
  }
}
