import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { UserFilter } from '../interfaces/user.interface'

export class GetUserDto implements UserFilter {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number

  @IsOptional()
  @IsString()
  sortBy?: string

  @IsOptional()
  @IsString()
  sort?: string

  @IsOptional()
  count?: boolean

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  username?: string
}
