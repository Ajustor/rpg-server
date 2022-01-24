export type UserRecord = User & {
  externalId?: string
}

export type CreateUser = Omit<
  User,
  'id' | 'active' | 'provider' | 'createdAt' | 'updatedAt'
> & {
  id?: string
  password?: string
}

export type User = {
  id: string
  username: string
  email: string
  language: string
  password?: string
  active: boolean
  createdAt: string
  updatedAt: string | null
  lastConnection?: string | null
}

export type UserFilter = {
  limit?: number
  offset?: number
  sortBy?: string
  sort?: string
  email?: string
  username?: string
  active?: boolean
}
