import { User } from '@/users/interfaces/user.interface'
import { UsersMapper } from '@/users/users.mapper'
import { UsersService } from '@/users/users.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne({ username })
    if (!user) {
      return null
    }
    const isPasswordValid = await compare(pass, user?.password)
    if (isPasswordValid) {
      return UsersMapper.toDomain(user)
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
