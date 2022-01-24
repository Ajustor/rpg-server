import { User, UserSource } from '@/users/interfaces/user.interface'

export class UsersMapper {
  static toDomain(userSource: UserSource): User {
    return {
      id: userSource._id.toString(),
      externalId: userSource.externalId,
      username: userSource.username,
      player: userSource.player,
    }
  }
}
