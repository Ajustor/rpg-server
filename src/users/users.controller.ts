import { Auth } from '@/auth/auth.decorator'
import { GetCurrentUser } from '@/users/decorator/get-current-user.decorator'
import { Body, Controller, Delete, Get, Param } from '@nestjs/common'
import { GetUserDto } from './dto/get-user.dto'
import { User } from './interfaces/user.interface'
import { UsersService } from './users.service'

@Controller('users')
@Auth()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getAll(@Body() filter: GetUserDto): Promise<{ users: User[] }> {
    const users = await this.service.getAll(filter)

    return { users }
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<{ user: User }> {
    const user = await this.service.get(id)

    return { user }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @GetCurrentUser() currentUser,
  ): Promise<{ user: User }> {
    const user = await this.service.deleteOne(id)

    return { user }
  }
}
