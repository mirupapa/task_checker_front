import { combineReducers } from '@reduxjs/toolkit'
import UserInfo from './Slice/UserInfo'

const rootReducer = combineReducers({
  UserInfo: UserInfo
})

export default rootReducer