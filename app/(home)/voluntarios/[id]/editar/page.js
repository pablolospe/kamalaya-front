import React from 'react'
import FormularioVoluntarioId from '@/components/FormularioVoluntarioId'

function page({ params }) {
    const id = params
    // console.log(id);
  return (
    <FormularioVoluntarioId id={id}/>
  )
}

export default page