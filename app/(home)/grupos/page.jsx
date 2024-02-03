import React from 'react'
import GruposTabla from './GruposTabla'
import Link from 'next/link'

async function GruposPage() {

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