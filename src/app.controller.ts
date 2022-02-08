import { SecurityLayer } from '@/config/SecurityLayer'
import { LoginDto } from '@/dto/login.dto'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { User } from '@/users/interfaces/user.interface'
import { UsersService } from '@/users/users.service'
import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { KeyLike } from 'crypto'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('/login')
  async login(@Body() user: LoginDto) {
    console.log(user)
    const loggedUser = await this.authService.validateUser(
      user.username,
      user.password,
    )

    console.log(loggedUser)

    if (!loggedUser) {
      throw new NotFoundException('User not found')
    }

    return this.authService.login(loggedUser)
  }

  @Post('/users')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    const isExistingUser = await this.usersService.find({
      username: user.username,
    })

    if (isExistingUser) {
      throw new ConflictException('User with this username already exists')
    }

    return this.usersService.create(user)
  }

  @Get('/publicKey')
  async getPublicKey(): Promise<{ serverKey: KeyLike }> {
    return { serverKey: SecurityLayer.getInstance().getPublicKey() }
  }
}
