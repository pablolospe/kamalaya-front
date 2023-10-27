'use client';
import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
import { voluntarios } from '@/utils/fetchVoluntarios';
import { pacientes } from '@/utils/fetchPacientes';

// const pacientes = async (query, accessToken) => {
//     const queryString = new URLSearchParams();

//     for (const key in query) {
//       if (Array.isArray(query[key])) {
//         query[key].forEach((value) => {
//           queryString.append(`${key}[]`, value);
//         });
//       } else {
//         if (query[key] !== '') {
//           queryString.append(key, query[key]);
//         }
//       }
//     }

//     const url = `${URL}/paciente${queryString ? `?${queryString}` : ''}`;

//     // const response = await fetch(url, {
//     //   cache: 'no-store',
//     //   headers: {
//     //     authorization: `bearer ${accessToken}`
//     //   }
//     // });
//     // return response.json();
//   };

function CrearGrupo() {
  // const { data: session } = useSession();
  const [pacientesData, setPacientesData] = useState([]);
  const [voluntariosData, setVoluntariosData] = useState([]);
  const [grupo, setGrupo] = useState({
    diaSemana: 'lunes',
    fechaDeInicio: '2023-04-04',
    horaInicio: '1000',
    horaFin: '1200',
    paciente_id: 1,
    voluntario_id: [1, 2],
  });

  const [query, setQuery] = useState({
    nombre: '',
    apellido: '',
    localidad: '',
    hobbies: '',
  });

  useEffect(() => {
    async function fetchData() {
      // if (session) {
      const pacienteData = await pacientes(query);
      const voluntariosData = await voluntarios(query);
      setPacientesData(pacienteData);
      setVoluntariosData(voluntariosData);
      // }
    }
    fetchData();
  }, [query]);

  return (
    <div className="mt-32 flex flex-col justify-evenly align-center max-w-xl">
      <h1>Crear nuevo grupo</h1>
      <label>Elige un paciente</label>
      <select
        name=""
        id=""
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
      >
        {pacientesData?.map((p) => (
          <option key={p.paciente_id}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>
      <label>Elige un voluntario</label>
      <select
        name=""
        id=""
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
      >
        {voluntariosData?.map((p) => (
          <option key={p.voluntario_id}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>
      
    </div>
  );
}

export default CrearGrupo;
