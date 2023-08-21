'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const usuarios = async (query) => {
  const queryString = new URLSearchParams(query).toString();
  const url = `https://kamalaya-dev.fl0.io/usuarios${
  // const url = `https://kamalaya.onrender.com/usuarios${
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
  }, [query, usuarios]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap flex-col md:flex-row md:justify-evenly bg-gray-100 gap-4 p-4 rounded-lg shadow-md">
        <div>
          {/* <label className="block mb-2 text-gray-700">Nombre</label> */}
          <input
            name="nombre"
            type="text"
            value={query.nombre}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Nombre..."
          />
        </div>
        <div>
          {/* <label className="block mb-2 text-gray-700">Apellido</label> */}
          <input
            name="apellido"
            type="text"
            value={query.apellido}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Apellido..."
          />
        </div>
        <div>
          {/* <label className="block mb-2 text-gray-700">Localidad</label> */}
          <input
            name="localidad"
            type="text"
            value={query.localidad}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Localidad..."
          />
        </div>
        <div>
          {/* <label className="block mb-2 text-gray-700">Profesión</label> */}
          <input
            name="profesion_oficio_ocupacion"
            type="text"
            value={query.profesion_oficio_ocupacion}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Profesión / oficio / ocupación..."
          />
        </div>
        <div>
          {/* <label className="block mb-2 text-gray-700">Hobbies</label> */}
          <input
            name="hobbies_habilidades"
            type="text"
            value={query.hobbies_habilidades}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="hobbies / habilidades..."
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
      <table>
        <thead>
          <tr className="bg-gray-100 row-auto">
            <th className="border p-2">Nombre</th>
            <th className="hidden md:table-cell border p-2">Teléfono</th>
            <th className="hidden md:table-cell border p-2">Tiene auto</th>
            <th className="hidden md:table-cell border p-2">Tiene experiencia</th>
            <th className="hidden md:table-cell border p-2">Disponibilidad</th>
          </tr>
        </thead>

        <tbody>
          {usuariosData?.map((u) => (
            <tr
              key={u.usuario_id}
              className="text-center border hover:bg-gray-100"
            >
              <td>
                <Link href={`/voluntarios/${u.usuario_id}`}>
                  <div className="ml-3 my-1 text-left">
                    {u.nombre} {u.apellido} (id:{u.usuario_id})
                  </div>
                </Link>
              </td>
              <td className='hidden md:table-cell'>
                <div>
                  {u.telefono} / {u.telefono2}
                </div>
              </td>
              <td className='hidden md:table-cell'>
                <div>{u.tieneAuto ? 'si' : 'no'}</div>
              </td>
              <td className='hidden md:table-cell'>
                <div>{u.expreienciaCP ? 'si' : 'no'}</div>
              </td>
              <td className='hidden md:table-cell'>
                <div>
                  {u?.Disponibilidades.map((d) => (
                    <span key={d.disponibilidad_id}>
                      {d.diaSemana}, {d.horaInicio}-{d.horaFin}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {usuariosData.map((u) => (
        <Link key={u.usuario_id} href={`/voluntarios/${u.usuario_id}`}>
          <div className="text-violet-600 hover:text-violet-800">
            {u.usuario_id} {u.nombre} {u.apellido}
          </div>
        </Link>
      ))} */}
    </div>
  );
}

export default Voluntarios;
