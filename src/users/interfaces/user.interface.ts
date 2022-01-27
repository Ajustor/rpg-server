import { Player } from '@/class/Player'
import { PlayerSource } from '@/players/interfaces/player.interface'
// @ts-ignore
import { User as MongooseUser } from 'mongoose'

export type User = {
  id: string
  username: string
  player?: string | Player
}

export type CreateUser = {
  username: string
  password: string
}

export type UserSource = {
  username: string
  player?: PlayerSource
  createdAt: Date
  updatedAt: Date
} & MongooseUser

export type UserRecord = {
  externalId: string
  username: string
  password: string
  player?: string
}

export interface UserFilter {
  username?: string
  externalId?: string
}
