/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  MailAddress: '',
  UserName: '',
}

type payloadType = {
  MailAddress: string
  UserName: string
}

export type UserInfoState = {
  UserInfo: {
    UserName: 'UserName'
    MailAddress: 'MailAddress'
  }
}

const UserInfo = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    setUserInfo(state, action: { payload: payloadType }) {
      const { MailAddress, UserName } = action.payload
      state.MailAddress = MailAddress
      state.UserName = UserName
    },
  },
})

export const { setUserInfo } = UserInfo.actions
export default UserInfo.reducer
