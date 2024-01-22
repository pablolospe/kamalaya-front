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
    hobbies: '',
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
      <h1 className="text-center font-semibold text-xl">PACIENTES</h1>
      <details className="bg-gray-100 gap-4 p-4 rounded-lg">
        <summary className="hover:font-semibold cursor-pointer">MAPA</summary>
        <GoogleMapsView marker={pacientesData} />
      </details>


      <table>
        <thead>
          <tr className="bg-gray-100 row-auto">
            <th className="border p-2 cursor-pointer hover:bg-gray-200" onClick={() => onSort('nombre')}>
              Nombre {sortField === 'nombre' && (sortOrder === 'desc' ? '⬆️' : '⬇️')}
            </th>
            <th className="border p-2 cursor-pointer hover:bg-gray-200" onClick={() => onSort('apellido')}>
              Apellido {sortField === 'apellido' && (sortOrder === 'desc' ? '⬆️' : '⬇️')}
            </th>
            <th className="hidden md:table-cell border p-2">Teléfono</th>
          </tr>
        </thead>

        <tbody>
          {pacientesData?.map((v) => (
            <tr
              key={v.paciente_id}
              className="text-center bg-gray-100 hover:bg-gray-200"
            >
              <td>
                <Link href={`/pacientes/${v.paciente_id}`}>
                  <div className="flex flex-row items-center ml-3 my-1 text-left">
                    <div className="bg-gray-300 cursor-pointer p-3 mx-2 gap-3 rounded-lg flex flex-row">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PacientesPage;
