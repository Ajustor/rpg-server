import { randomInt } from 'crypto'

export class Player {
  strength: number
  intelligence: number
  agility: number
  experience: number
  level: number

  gold: number
  inventory: []

  constructor(playerData?: Record<string, any>) {
    this.agility = playerData?.agility || randomInt(10)
    this.intelligence = playerData?.intelligence || randomInt(10)
    this.strength = playerData?.strength || randomInt(10)
    this.experience = playerData?.experience || 0
    this.gold = playerData?.gold || 0
    this.level = playerData?.level || 1
    this.inventory = playerData?.inventory || []
  }
}
