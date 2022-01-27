import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PlayersService } from '../players/players.service'
import { CreateUser, User, UserRecord } from './interfaces/user.interface'
import { UsersMapper } from './users.mapper'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly model: Model<UserRecord>,
    private readonly playerService: PlayersService,
  ) {}

  async get(id: string): Promise<User> {
    const user = await this.model.findById(id).populate('player')

    return UsersMapper.toDomain(user)
  }

  async find(filter: Record<string, any>): Promise<User | null> {
    const user = await this.model.findOne(filter)

    return UsersMapper.toDomain(user)
  }

  async getAll(by: Record<string, any>): Promise<User[]> {
    const users = await this.model.find(by)

    return users.map((user) => UsersMapper.toDomain(user))
  }

  async create(user: CreateUser): Promise<User> {
    const player = await this.playerService.createPlayer()
    const createdUser = new this.model({ ...user, player })

    return UsersMapper.toDomain(await createdUser.save())
  }
}
