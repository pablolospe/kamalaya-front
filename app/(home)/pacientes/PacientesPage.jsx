'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LuUser } from 'react-icons/lu';
import { URL } from '@/config';
import GoogleMapsView from '@/components/GoogleMapsView';
import style from './page.module.css';
import { useSession } from 'next-auth/react';
import { pacientes } from '@/utils/fetchPacientes';

function PacientesPage() {
  const { data: session } = useSession();
  const [pacientesData, setPacientesData] = useState([]);
  const [query, setQuery] = useState({
    nombre: '',
    apellido: '',
    localidad: '',
    // hobbies: '',
  });

  // Definir el estado para el campo de ordenación
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('');

  const onSort = (field) => {
    // Si se hace clic en el mismo campo, cambiar el orden
    // De lo contrario, ordenar en orden ascendente
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  function handleBorrarFiltros() {
    setQuery({
      nombre: '',
      apellido: '',
      localidad: '',
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
      if (session) {
        const pacienteData = await pacientes(query, session.user.accessToken);
        // Ordenar los datos basado en el sortField y sortOrder
        let sortedData = pacienteData;
        if (sortField !== null) {
          sortedData = sortedData.sort((a, b) =>
            sortOrder === 'asc'
              ? a[sortField].localeCompare(b[sortField])
              : b[sortField].localeCompare(a[sortField])
          );
        }
        setPacientesData(sortedData);
      }
    }
    fetchData();
  }, [query, session, sortField, sortOrder]);

  return (
    <div className="flex flex-col gap-2">
      {/* <h1 className="text-center font-semibold text-xl">PACIENTES</h1> */}

      <details className="bg-gray-100 gap-4 p-4 rounded-lg">
        <summary className="hover:font-semibold cursor-pointer">MAPA</summary>
        <GoogleMapsView marker={pacientesData} />
      </details>

      <details className="bg-gray-100 gap-4 p-4 rounded-lg">
        <summary className="hover:font-semibold cursor-pointer">
          FILTROS
        </summary>
        <div className="flex flex-wrap flex-col md:flex-row md:justify-evenly md:items-center bg-gray-100 gap-4 p-4 rounded-lg ">
          <div>
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
            <input
              name="localidad"
              type="text"
              value={query.localidad}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Localidad..."
            />
          </div>

          {/* <div>
            <input
              name="profesion_oficio_ocupacion"
              type="text"
              value={query.profesion_oficio_ocupacion}
              onChange={handleChange}
              className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Profesión / oficio / ocupación..."
            />
          </div> */}

          {/* <div className="flex flex-col gap-1 text-wrap items-center">
            <label
              htmlFor="activo"
              className="text-xs text-gray-800 mr-2"
            >
              Está activo?
            </label>
            <select
              name="activo"
              type="text"
              value={query.activo}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              id="activo"
            >
              <option value={true}>si</option>
              <option value={false}>no</option>
              <option value="">todos</option>
            </select>
          </div> */}

          <button
            onClick={handleBorrarFiltros}
            className="h-14 p-3 text-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Borrar <br/> filtros
          </button>
        </div>
      </details>


      <table className='text-sm'>
        <thead>
          <tr className="bg-gray-100 row-auto">
            <th className="border p-2 cursor-pointer hover:bg-gray-200" onClick={() => onSort('nombre')}>
              Nombre {sortField === 'nombre' && (sortOrder === 'desc' ? '⬆️' : '⬇️')}
            </th>
            <th className="border p-2 cursor-pointer hover:bg-gray-200" onClick={() => onSort('apellido')}>
              Apellido {sortField === 'apellido' && (sortOrder === 'desc' ? '⬆️' : '⬇️')}
            </th>
            <th className="hidden md:table-cell border p-2">Teléfono</th>
            <th className="hidden md:table-cell border p-2">Dirección</th>
          </tr>
        </thead>

        <tbody>
          {pacientesData?.map((v) => (
            <tr
              key={v.paciente_id}
              className="text-center bg-green-50 hover:bg-green-100"
            >
              <td>
                <Link href={`/pacientes/${v.paciente_id}`}>
                  <div className="flex flex-row items-center ml-3 my-1 text-left">
                    <div className="bg-green-200 cursor-pointer p-3 mx-2 gap-3 rounded-lg flex flex-row">
                      <LuUser size={20} />
                    </div>
                    {v.nombre}
                  </div>
                </Link>
              </td>
              <td>
                <Link href={`/pacientes/${v.paciente_id}`}>
                  <div className="flex flex-row items-center ml-3 my-1 text-left">
                    {v.apellido}
                  </div>
                </Link>
              </td>
              <td className="hidden md:table-cell">
                <div>
                  {v.telefono2 ? (
                    <span>
                      {v.telefono} / {v.telefono2}
                    </span>
                  ) : (
                    v.telefono
                  )}
                </div>
              </td>
              <td className="hidden md:table-cell">
                <div>
                    <p> {v.calle} {v.numero}</p>
                    <p> {v.localidad}, {v.provincia}, {v.pais} ({v.codigoPostal})</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PacientesPage;
