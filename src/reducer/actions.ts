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

// eslint-disable-next-line import/prefer-default-export
export { info }
