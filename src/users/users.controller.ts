import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserDto } from './dto/get-user.dto'
import { User } from './interfaces/user.interface'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    const isExistingUser = await this.service.find({ username: user.username })

    if (isExistingUser) {
      throw new ConflictException('User with this username already exists')
    }

    return this.service.create(user)
  }

  @Get()
  async getAll(@Body() filter: GetUserDto): Promise<User[]> {
    return this.service.getAll(filter)
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<User> {
    return this.service.get(id)
  }
}
