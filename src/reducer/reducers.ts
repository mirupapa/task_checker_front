import { combineReducers } from 'redux'
import * as types from './types'
import { UserType } from '../Login/LoginType'

const getLoginUserInfoReducer = (
  state = {
    UserName: '',
    MailAddress: '',
  },
  action: { type: string; payload: UserType }
) => {
  switch (action.type) {
    case types.INFO:
      return {
        UserName: action.payload.UserName,
        MailAddress: action.payload.MailAddress,
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  loginUserInfo: getLoginUserInfoReducer,
})

export default reducer

export type RootState = ReturnType<typeof reducer>
