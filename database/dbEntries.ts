import { isValidObjectId } from 'mongoose'
import { connect, disconnect } from './db'
import { Entry, InterEntry } from '@/models'

export const getEntryById = async (id: string): Promise<InterEntry | null> => {
  if (!isValidObjectId(id)) return null

  await connect()
  // lean lo que hace es traer la informacion necesaria y evitar traer cosas como "populate, etc" de mongo
  const entry = await Entry.findById(id).lean().select('-__v')

  await disconnect()

  // aqui tenemos un problema con el ID de mongo ya que no viene serializado, por ende debemos hacerlo nosotros
  return JSON.parse(JSON.stringify(entry))
}
