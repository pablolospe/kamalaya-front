import React from 'react'
import GruposTabla from '@/components/GruposTabla'
import Link from 'next/link'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '../../../pages/api/auth/[...nextauth]'


async function GruposPage() {
  // const session = await getServerSession(authOptions)

  // console.log(session);
  return (
    <div>
        <Link href={'/grupos/crear'} className="w-40 m-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Crear nuevo grupo
        </Link>
        <br />
        <br />

        <GruposTabla />
        <br />
    </div>
  )
}

export default GruposPage