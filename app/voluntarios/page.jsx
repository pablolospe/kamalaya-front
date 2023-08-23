'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LuUser } from 'react-icons/lu';

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
    localidad: '',
    profesion_oficio_ocupacion: '',
    hobbies_habilidades: '',
    tieneAuto: '',
    experienciaCP: '',
  });

  function handleBorrarFiltros() {
    setQuery({
      nombre: '',
      apellido: '',
      localidad: '',
      profesion_oficio_ocupacion: '',
      hobbies_habilidades: '',
      tieneAuto: '',
      experienciaCP: '',
    });
  }

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
      <div className="flex flex-wrap flex-col md:flex-row md:justify-evenly md:items-center bg-gray-100 gap-4 p-4 rounded-lg shadow-md">
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
        
        <div className="flex items-center">
          <label htmlFor="tieneAuto" className="text-xs text-gray-800 mr-2">
            Tiene Auto?
          </label>
          <select
            name="tieneAuto"
            value={query.tieneAuto}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            id="tieneAuto"
          >
            <option value="">Todos</option>
            <option value={true}>Si tiene auto</option>
            <option value={false}>No tiene auto</option>
          </select>
        </div>




        <div className="flex items-center">
          <label htmlFor="experienciaCP" className="text-xs text-gray-800 mr-2">
            Tiene experiencia en cuidados paliativos?
          </label>
          <select
            name="experienciaCP"
            type="text"
            value={query.experienciaCP}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            id="experienciaCP"
          >
            <option value="">todos</option>
            <option value={true}>si</option>
            <option value={false}>no</option>
          </select>
        </div>

        <button
          onClick={handleBorrarFiltros}
          className="h-14 p-3 text-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Borrar <br></br>filtros
        </button>
      </div>

      <table>
        <thead>
          <tr className="bg-gray-100 row-auto">
            <th className="border p-2">Nombre</th>
            <th className="hidden md:table-cell border p-2">Teléfono</th>
            <th className="hidden md:table-cell border p-2">Tiene auto</th>
            <th className="hidden md:table-cell border p-2">
              Tiene experiencia
            </th>
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
                  <div className="flex flex-row justify-evenly items-center ml-3 my-1 text-left">
                    <div className="bg-gray-200 hover:bg-gray-300 cursor-pointer p-3 gap-3 rounded-lg flex flex-row">
                      <LuUser size={20} />
                    {u.nombre} {u.apellido} ({u.usuario_id})
                    </div>
                  </div>
                </Link>
              </td>
              <td className="hidden md:table-cell">
                <div>
                  {u.telefono2 ? (
                    <span>
                      {u.telefono} / {u.telefono2}
                    </span>
                  ) : (
                    u.telefono
                  )}
                </div>
              </td>
              <td className="hidden md:table-cell">
                <div>{u.tieneAuto ? 'si' : 'no'}</div>
              </td>

              <td className="hidden md:table-cell">
                <div>{u.experienciaCP === true ? 'si' : 'no'}</div>
              </td>

              <td className="hidden md:table-cell">
                <div>
                  {u?.Disponibilidades.map((d) => (
                    <span key={d.disponibilidad_id}>
                      {d.diaSemana}, {d.horaInicio.slice(0, -3)}-
                      {d.horaFin.slice(0, -3)}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Voluntarios;