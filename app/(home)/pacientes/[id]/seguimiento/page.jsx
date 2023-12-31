import React from 'react'
import CrearSeguimiento from '@/components/CrearSeguimiento'
// import GruposTabla from '@/components/GruposTabla'


function SeguimientoPage({ params }) {
  return (
    <div>
        <CrearSeguimiento params={params}/>
        <br />
    </div>
  )
}

export default SeguimientoPage