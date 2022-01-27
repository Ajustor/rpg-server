import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Player } from '../class/Player'
import { CreatePlayer, PlayerRecord } from './interfaces/player.interface'

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly model: Model<PlayerRecord>,
  ) {}

  async createPlayer(playerData?: CreatePlayer): Promise<Player> {
    const createdPlayer = new this.model(new Player(playerData))

    return createdPlayer.save()
  }

  async deleteOne(id: string): Promise<Player> {
    const player = await this.model.findOne({ _id: id })
    player.remove()

    return player
  }
}
