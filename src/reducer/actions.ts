import * as types from './types'
import { UserType } from '../Login/LoginType'

type infoType = {
  type: string
  payload: UserType
}

const info = (resource: UserType): infoType => ({
  type: types.INFO,
  payload: resource,
})

export { info }
