import { Schema } from 'mongoose'
import { v4 } from 'uuid'

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  externalId: { type: String, unique: true, default: v4() },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: false },
  updatedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
})

UserSchema.index({ username: 'text', email: 'text', createdAt: 'text' })

UserSchema.pre('save', function (next) {
  try {
    this.set({ updatedAt: new Date() })
    next()
  } catch (error) {
    return next(error)
  }
})

export { UserSchema }
