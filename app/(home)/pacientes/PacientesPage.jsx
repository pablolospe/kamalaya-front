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
    orderBy: '',
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
      if (session) {
        const pacienteData = await pacientes(query, session.user.accessToken);
        setPacientesData(pacienteData);
      }
    }
    fetchData();
  }, [query, session]);

  return (
    <div className="flex flex-col gap-2">
      <details className={style.details}>
        <summary className="ml-1 text-md cursor-pointer">Mapa</summary>
        <GoogleMapsView marker={pacientesData} />
      </details>

      <h1 className="text-center font-semibold text-xl">PACIENTES</h1>

      <table>
      <thead>
        <tr className="bg-gray-100 row-auto">
          <th className="border p-2">
            <button name="orderBy" value="nombre" onClick={handleChange}>
              Nombre ⬇️
            </button>
          </th>
          <th className="border p-2">
            <button name="orderBy" value="apellido" onClick={handleChange}>
              Apellido ⬇️
            </button>
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
