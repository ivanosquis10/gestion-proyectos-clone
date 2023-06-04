import mongoose, { Model, Schema } from 'mongoose'
import { Entry } from '@/interfaces'

export interface InterEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, require: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'progress', 'finished'],
      message: '{VALUE} no es un estado permitido',
    },
    default: 'pending',
  },
})

const EntryModel: Model<InterEntry> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel
