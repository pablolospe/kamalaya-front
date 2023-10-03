'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LuUser } from 'react-icons/lu';
import { URL } from '@/config';
import GoogleMapsView from '@/components/GoogleMapsView';

const pacientes = async (query) => {
  const queryString = new URLSearchParams();


  for (const key in query) {
    if (Array.isArray(query[key])) {
      query[key].forEach(value => {
        queryString.append(`${key}[]`, value);
      })
    } else {
      if (query[key] !== '') {
        queryString.append(key, query[key]);
      }
    }
  }

  const url = `${URL}/paciente${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await fetch(url, { cache: 'no-store' });
  return response.json();
};

function Pacientes() {
  const [pacientesData, setpacientesData] = useState([]);
  
  const [query, setQuery] = useState({
    nombre: '',
    apellido: '',
    localidad: '',
    hobbies: '',
  });
  // console.log(query);

  function handleBorrarFiltros() {
    setQuery({
      nombre: '',
      apellido: '',
      localidad: '',
      hobbies: '',
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleDiaSemanaChange(event) {
    const selectedDay = event.target.value;
    const updatedDays = query.diaSemana.includes(selectedDay)
      ? query.diaSemana.filter(day => day !== selectedDay)
      : [...query.diaSemana, selectedDay];
  
    setQuery(prevState => ({
      ...prevState,
      diaSemana: updatedDays
    }));
  }
  
  useEffect(() => {
    async function fetchData() {
      const pacienteData = await pacientes(query);
      setpacientesData(pacienteData);
      console.log(pacientesData[12]);
    }
    fetchData();
  }, [query, pacientes]);


  return (
    <div className="flex flex-col gap-2">
      <GoogleMapsView marker={pacientesData} />
      <h1 className='text-center font-semibold text-xl'>PACIENTES</h1>

      <table>
        <thead>
          <tr className="bg-gray-100 row-auto">
            <th className="border p-2">Nombre</th>
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
                    {v.nombre} {v.apellido} ({v.paciente_id})
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

export default Pacientes;
