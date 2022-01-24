import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserDto } from './dto/get-user.dto'
import { User } from './interfaces/user.interface'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<any> {}

  @Get()
  async getAll(@Body() filter: GetUserDto): Promise<User[]> {
    return this.service.getAll(filter)
  }
}
