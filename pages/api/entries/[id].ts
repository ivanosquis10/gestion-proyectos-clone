import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'

import { Entry, InterEntry } from '@/models'
import { connect, disconnect } from '../../../database'

type Data = { message: string } | InterEntry

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // obtenemos el id de la ruta
  const { id } = req.query

  // validamos que sea un id valido de mongo
  if (!isValidObjectId(id))
    return res.status(404).json({ message: 'ID no válido' })

  if (req.method === 'GET') return getEntryById(req, res)

  // validamos que sea un metodo que manejemos
  if (req.method === 'PUT') return updateEntry(req, res)

  if (req.method === 'DELETE') return deleteEntry(req, res)

  return res.status(400).json({ message: 'Endpoint no disponible' })
}

// function para obtener una entrada en especifico
const getEntryById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  await connect()
  if (!isValidObjectId(id)) res.status(404).json({ message: 'ID no válido' })

  const getEntryById = await Entry.findById(id)

  await disconnect()

  res.status(200).json(getEntryById)
}

// funcion que se encarga de actualizar de forma dinamica una entrada
const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  // obtenemos el id de la ruta
  const { id } = req.query

  await connect()

  // vamos a localizar la entrada en la BD
  const entryToUpdate = await Entry.findById(id)

  // si hay algun problema o el id no existe
  if (!entryToUpdate) {
    await disconnect()
    return res.status(400).json({ message: 'No hay entrada con ese ID' })
  }

  // aqui vamos a obtener posibles valores que pueden ser editado, el status y descripcion, vamos a analizar ambas posibilidades, por ende, es posible recibir uno de estos argumentos y en caso de que no, dejamo los que ya estan
  const {
    description = entryToUpdate.description, // estas dos lineas hacen que si no viene nada, se use la que ya esta
    status = entryToUpdate.status, // y en caso de que este, tomará la que vendra en el body
  } = req.body

  try {
    const entryUpdated = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      {
        runValidators: true,
        new: true,
      }
    )
    await disconnect()
    res.status(200).json(entryUpdated!)
  } catch (error: any) {
    console.log({ error })
    await disconnect()
    return res.status(400).json({ message: error.errors.status.message })
  }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  // obtenemos el id de la ruta
  const { id } = req.query
  await connect()

  // vamos a localizar la entrada en la BD
  const entryToDelete = await Entry.findById(id)

  // si hay algun problema o el id no existe
  if (!entryToDelete) {
    await disconnect()
    return res.status(400).json({ message: 'No hay entrada con ese ID' })
  }

  try {
    await Entry.findByIdAndDelete(id)
    await disconnect()
    res.status(200).json({ message: 'Entrada Eliminada Correctamente' })
  } catch (error: any) {
    console.log(error)
    await disconnect()
    return res.status(400).json({ message: error.errors.status.message })
  }
}
