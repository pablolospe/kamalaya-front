'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const usuarios = async (query) => {
  const queryString = new URLSearchParams(query).toString();
  const url = `https://kamalaya.onrender.com/usuarios${
    queryString ? `?${queryString}` : ''
  }`;
  const response = await fetch(url, { cache: 'no-store' });
  return response.json();
};

function Voluntarios() {
  const [usuariosData, setUsuariosData] = useState([]);

  const [query, setQuery] = useState({
    nombre: '',
    apellido: '',
    // tieneAuto: false,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function fetchData() {
      const usuarioData = await usuarios(query);
      setUsuariosData(usuarioData);
    }

    fetchData();
  }, [query]);

  return (
    <div className="flex flex-col gap-3">
      
      <div className="flex flex-row bg-gray-100 gap-4 p-4 rounded-lg shadow-md">
        <div>
          <label className="block mb-2 text-gray-700">Nombre</label>
          <input
            name="nombre"
            type="text"
            value={query.nombre}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Escribe aquí..."
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Apellido</label>
          <input
            name="apellido"
            type="text"
            value={query.apellido}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Escribe aquí..."
          />
        </div>
        {/* <div>
          <label className="block mb-2 text-gray-700">Tiene Auto</label>
          <input
            name="tieneAuto"
            type="checkbox"
            value={query.tieneAuto}
            onChange={()=>{setQuery(!query)}}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Escribe aquí..."
          />
        </div> */}
      </div>

      {usuariosData.map((u) => (
        <Link key={u.usuario_id} href={`/voluntarios/${u.usuario_id}`}>
          <div className="text-violet-600 hover:text-violet-800">
            {u.usuario_id} {u.nombre} {u.apellido}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Voluntarios;

// import React from 'react'
// import Link from 'next/link';

// const usuarios = async () => {
//   return fetch('https://kamalaya.onrender.com/usuarios', { cache: 'no-store' }).then((res) => res.json());
// };
// console.log(usuarios);
// async function Voluntarios() {
//   const usuario = await usuarios();

//   return (
//     <div className='flex flex-col gap-3'>
//     {console.log(usuario)}
//       {usuario?.map(u=>(
//       <Link key={u.usuario_id} href={`/voluntarios/${u.usuario_id}`}>
//       <div className='text-violet-600 hover:text-violet-800'>{u.usuario_id} {u.nombre} {u.apellido}</div>
//       </Link>
//       ))}</div>
//   )
// }

// export default Voluntarios
