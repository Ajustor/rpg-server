//@ts-ignore
import { Player as PlayerMongoose } from 'mongoose'

export type PlayerRecord = {
  id: string
  strength: number
  intelligence: number
  agility: number
  experience: number
  level: number

  gold: number
  inventory: []
}

export interface CreatePlayer {
  strength: number
  intelligence: number
  agility: number
  experience: number
  level: number

  gold: number
  inventory: []
}

export type PlayerSource = {
  id: string
  strength: number
  intelligence: number
  agility: number
  experience: number
  level: number

  gold: number
  inventory: []
} & PlayerMongoose
