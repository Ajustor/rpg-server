// @ts-ignore
import { User as MongooseUser } from 'mongoose'

export type User = {
  id: string
  username: string
  externalId: string
  player?: string
}

export type CreateUser = {
  username: string
  password: string
}

export type UserSource = {
  username: string
  player?: string
  createdAt: Date
  updatedAt: Date
} & MongooseUser

export type UserRecord = {
  externalId: string
  username: string
  player?: string
}

export interface UserFilter {
  username?: string
  externalId?: string
}
