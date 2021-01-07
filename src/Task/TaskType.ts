import { Dispatch, SetStateAction } from 'react'
import { RefetchOptions } from 'react-query/types/core/query'

export type TaskType = {
  id: number
  title: string
  done: boolean
  delFlag: boolean
  sort: number
  createdAt: string
  updatedAt: string
}

export type InsertTaskType = {
  setIsCreate: Dispatch<SetStateAction<boolean>>
  isCreate: boolean
  setIsEditingId: Dispatch<SetStateAction<number | undefined>>
  refetch: (options?: RefetchOptions | undefined) => Promise<unknown>
  records: Array<TaskType>
  setRecords: Dispatch<SetStateAction<Array<TaskType>>>
}

export type TaskListType = {
  setIsCreate: Dispatch<SetStateAction<boolean>>
  isCreate: boolean
  setIsEditingId: Dispatch<SetStateAction<number | undefined>>
  isEditingId: number | undefined
}

export type TaskItemType = {
  setIsEditingId: Dispatch<SetStateAction<number | undefined>>
  isEditingId: number | undefined
  setIsCreate: Dispatch<SetStateAction<boolean>>
  task: TaskType
  refetch: (options?: RefetchOptions | undefined) => Promise<unknown>
  records: Array<TaskType>
  setRecords: Dispatch<SetStateAction<Array<TaskType>>>
}
