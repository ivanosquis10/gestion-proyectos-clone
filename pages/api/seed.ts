// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect, seedData } from '../../database'
import { Entry } from '@/models'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // verificamos que no estemos en modo production
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({
      message: 'No tiene acceso a este servicio',
    })
  }

  await connect()
  // en esta parte haremos parte de las funciones
  await Entry.deleteMany() // cuidado con esto, que borra todo
  await Entry.insertMany(seedData.entries)

  await disconnect()

  res.status(200).json({ message: 'Proceso realizado correctamente' })
}
