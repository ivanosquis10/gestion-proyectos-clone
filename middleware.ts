import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  // validamos que el path que venga empece por lo que querramos
  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    // { req: '/api/entries/6476baa3aa9b99b7a6710ec2' } <- Así quedaría con el replace
    const id = req.nextUrl.pathname.replace('/api/entries/', '')

    // function para validar si es un id valido de mongo
    const checkIdMongoRegExp = new RegExp('^[0-9a-fA-F]{24}$')

    // en caso de no ser valido, lo mandamos al endpoint de bad-request
    if (!checkIdMongoRegExp.test(id)) {
      const url = req.nextUrl.clone() // clonamos la url
      url.pathname = '/api/bad-request' // le cambiamos el path
      url.search = `?message=${id} is not a valid MongoID` // le enviamos por url el error para imprimirlo
      return NextResponse.rewrite(url) // y lo redireccionamos
    }
  }
  return NextResponse.next()
}

// Aqui coloamos los paths a los que queremos que se le aplique el middleware
export const config = {
  // matcher: '/about/:path*',
  matcher: [
    // '/api/:path',
    '/api/entries/:path*',
  ],
}
