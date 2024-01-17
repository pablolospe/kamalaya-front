'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import VoluntariosTabla from '@/components/VoluntariosTabla';
import { fetchVoluntarios } from './Api'
// const usuarios = async (query) => {
//   const queryString = new URLSearchParams(query).toString();
//   const url = `https://kamalaya.onrender.com/usuarios${
//     queryString ? `?${queryString}` : ''
//   }`;
//   const response = await fetch(url, { cache: 'no-store' });
//   return response.json();
// };

function Voluntarios() {
  const [voluntariosData, setVoluntariosData] = useState([]);

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
      const voluntarioData = await fetchVoluntarios(query);
      setVoluntariosData(voluntarioData);
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
        <div>
          <label className="block mb-2 text-gray-700">Localidad</label>
          <input
            name="localidad"
            type="text"
            value={query.localidad}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Escribe aquí..."
          />
        </div>
       
      </div>
      <VoluntariosTabla usuariosData={voluntariosData}/>
     
    </div>
  );
}

export default Voluntarios;
