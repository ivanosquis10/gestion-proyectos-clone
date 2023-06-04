import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../database'
import { Entry, InterEntry } from '@/models'

type Data = { message: string } | InterEntry[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // validamos los enpoints que queremos que funcionen
  if (req.method === 'GET') {
    return getEntries(res)
  }

  if (req.method === 'POST') {
    return postEntry(req, res)
  }

  return res.status(400).json({ message: 'Endpoint no disponible' })
}

// Si la peticion es GET, traemos las entradas de la base de datos
const getEntries = async (res: NextApiResponse<Data>) => {
  await connect()
  const entries = await Entry.find()
    .sort({ createdAt: 'ascending' })
    .select('-__v')
  await disconnect()

  return res.status(200).json(entries)
}

// Si la peticion es POST, crearemos una nueva entrada
const postEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description = '' } = req.body

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  })

  try {
    await connect()
    await newEntry.save()
    await disconnect()

    return res.status(201).json(newEntry)
  } catch (error) {
    await disconnect()
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Hubo un error al crear la entrada' })
  }
}
