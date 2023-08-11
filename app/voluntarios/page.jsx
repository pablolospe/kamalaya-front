'use client'
import React from 'react'
import Link from 'next/link';

const usuarios = async () => {
  return fetch('https://kamalaya.onrender.com/usuarios', {
  }).then((res) => res.json());
};
console.log(usuarios);
async function Voluntarios() {
  const usuario = await usuarios();
  
  return (
    <div className='flex flex-col'>
    {console.log(usuario)}
      {usuario?.map(u=>(
      <Link href={`/voluntarios/${u.usuario_id}`}>
      <div className='text-violet-600 hover:text-violet-800'>{u.usuario_id} {u.nombre} {u.apellido}</div>
      </Link>
      ))}</div>
  )
}

export default Voluntarios