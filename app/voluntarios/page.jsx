import React from 'react'
import Link from 'next/link';

const usuarios = async () => {
  return fetch('https://kamalaya.onrender.com/usuarios', {
  }).then((res) => res.json());
};

async function Voluntarios() {
  const usuario = await usuarios();
  
  return (
    <div className='flex flex-col'>
      {usuario?.map(u=>(
      <Link href={`/voluntarios/${u.usuario_id}`}>
      <div >{u.usuario_id} {u.nombre} {u.apellido}</div>
      </Link>
      ))}</div>
  )
}

export default Voluntarios