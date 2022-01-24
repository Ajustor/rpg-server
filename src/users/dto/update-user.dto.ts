import { Match } from '@/users/decorator/match.decorator'
import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsBoolean()
  active?: boolean

  @IsString()
  @IsOptional()
  @Matches(/^(?=.*[A-Z])(?=.*[#?!@$%^&*-\/])(?=.*[0-9]).{10,}$/)
  password?: string

  @IsString()
  @IsOptional()
  @Match('password')
  passwordConfirmation?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  language?: string
}
