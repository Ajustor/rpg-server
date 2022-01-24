import { IsBoolean, IsEmail, IsString } from 'class-validator'
import { CreateUser } from '../interfaces/user.interface'

export class CreateUserDto implements CreateUser {
  @IsEmail()
  email!: string

  @IsString()
  username!: string

  @IsBoolean()
  active!: boolean

  @IsString()
  language!: string

  @IsString()
  password!: string
}
