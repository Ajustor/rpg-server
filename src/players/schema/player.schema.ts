import { Schema } from 'mongoose'

export const PlayerSchema = new Schema({
  strength: { type: Number, required: true },
  intelligence: { type: Number, required: true },
  agility: { type: Number, required: true },
  experience: { type: Number, required: true },
  gold: { type: Number, required: true },
  level: { type: Number, required: true },
  inventory: { type: [], required: true },

  updatedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
})

PlayerSchema.index({ createdAt: 'text' })

PlayerSchema.pre('save', function (next) {
  try {
    this.set({ updatedAt: new Date() })
    next()
  } catch (error) {
    return next(error)
  }
})
