export type PlayerRecord = {
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
