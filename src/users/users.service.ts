import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserRecord } from './interfaces/user.interface'
import { UsersMapper } from './users.mapper'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly model: Model<UserRecord>) {}

  async get(id: string): Promise<User> {
    const user = await this.model.findById(id)

    return UsersMapper.toDomain(user)
  }

  async getAll(by: Record<string, any>): Promise<User[]> {
    const users = await this.model.find(by)

    return users.map((user) => UsersMapper.toDomain(user))
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.model(user)

    return UsersMapper.toDomain(await createdUser.save())
  }
}
