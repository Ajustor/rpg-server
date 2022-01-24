import { IsBoolean, IsEmail, IsString, Matches } from 'class-validator'
import { Match } from '../decorator/match.decorator'
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
  @Matches(/^(?=.*[A-Z])(?=.*[#?!@$%^&*-\/])(?=.*[0-9]).{10,}$/)
  password!: string

  @IsString()
  @Match('password')
  passwordConfirmation!: string
}
