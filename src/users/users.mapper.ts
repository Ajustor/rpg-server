import { Player } from '@/class/Player'
import { User, UserSource } from '@/users/interfaces/user.interface'

export class UsersMapper {
  static toDomain(userSource?: UserSource): User | null {
    return userSource
      ? {
          id: userSource.externalId,
          username: userSource.username,
          player:
            typeof userSource.player === 'string'
              ? userSource.player
              : new Player(userSource.player),
        }
      : null
  }
}
