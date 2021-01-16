import ky, { Options } from 'ky'

const DEFAULT_API_OPTIONS: Options = {
  timeout: 7000,
  retry: 2,
}

const kyApi = async (
  url: string,
  method = 'GET',
  data?: unknown
): Promise<unknown> => {
  const params = method === 'GET' ? { param: data } : { json: data }
  const token: string | null = localStorage.getItem('task_checker_token')
  const mergeOptions = {
    ...DEFAULT_API_OPTIONS,
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`,
    },
    ...params,
  }

  const uri = `${process.env.REACT_APP_API_URL || ''}${url}`

  return ky(uri, mergeOptions).json()
}

export default kyApi
