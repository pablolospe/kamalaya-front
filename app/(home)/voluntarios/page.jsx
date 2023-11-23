'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LuUser } from 'react-icons/lu';
import { fechaActualEntreFechas, formatearNumeroTelefono, formatearFecha, DiaSemanaEnum, formatearNumeroAHora } from '@/utils/formats';
import GoogleMapsView from '@/components/GoogleMapsView';
import style from './page.module.css';
import { voluntarios } from '@/utils/fetchVoluntarios.js'

// const voluntarios = async (query) => {
//   const queryString = new URLSearchParams();

//   for (const key in query) {
//     if (Array.isArray(query[key])) {
//       query[key].forEach((value) => {
//         queryString.append(`${key}[]`, value);
//       });
//     } else {
//       if (query[key] !== '') {
//         queryString.append(key, query[key]);
//       }
//     }
//   }

//   const url = `${URL}/voluntarios${queryString ? `?${queryString}` : ''}`;

//   const response = await fetch(url, { cache: 'no-store' });
//   return response.json();
// };

function Voluntarios() {
  const [voluntariosData, setVoluntariosData] = useState([]);
  
  const [query, setQuery] = useState({
    nombre: '',
    apellido: '',
    localidad: '',
    profesion_oficio_ocupacion: '',
    hobbies_habilidades: '',
    tieneAuto: '',
    experienciaCP: '',
    diaSemana: [],
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
      diaSemana: [],
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
      ? query.diaSemana.filter((day) => day !== selectedDay)
      : [...query.diaSemana, selectedDay];

    setQuery((prevState) => ({
      ...prevState,
      diaSemana: updatedDays,
    }));
  }

  useEffect(() => {
    async function fetchData() {
      const voluntarioData = await voluntarios(query);
      setVoluntariosData(voluntarioData);
    }
    fetchData();
  }, [query, voluntarios]);


  return (
    <div className="flex flex-col gap-2">    
      {/* //////////////// MAPA //////////////// */}
      <details className={style.details}>
        <summary className="ml-1 text-md cursor-pointer">Mapa</summary>

        <GoogleMapsView marker={voluntariosData} />

      </details>

      {/* //////////////// FILTROS //////////////// */}
      <div className="flex flex-wrap flex-col md:flex-row md:justify-evenly md:items-center bg-gray-100 gap-4 p-4 rounded-lg shadow-md">
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
          
        <div>
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
          <input
            name="hobbies_habilidades"
            type="text"
            value={query.hobbies_habilidades}
            onChange={handleChange}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="hobbies / habilidades..."
          />
        </div>

        <div className="bg-white rounded-md shadow-sm p-2 border border-gray-300">
          <label className="block mb-1 text-gray-400">Disponibilidad</label>
          <div className="flex flex-wrap first-letter:gap-3 gap-3">
            <label>
              <input
                type="checkbox"
                value="lunes"
                checked={query.diaSemana.includes('lunes')}
                onChange={handleDiaSemanaChange}
              />
              Lunes
            </label>
            <label>
              <input
                type="checkbox"
                value="martes"
                checked={query.diaSemana.includes('martes')}
                onChange={handleDiaSemanaChange}
              />
              Martes
            </label>
            <label>
              <input
                type="checkbox"
                value="miercoles"
                checked={query.diaSemana.includes('miercoles')}
                onChange={handleDiaSemanaChange}
              />
              Miércoles
            </label>
            <label>
              <input
                type="checkbox"
                value="jueves"
                checked={query.diaSemana.includes('jueves')}
                onChange={handleDiaSemanaChange}
              />
              Jueves
            </label>
            <label>
              <input
                type="checkbox"
                value="viernes"
                checked={query.diaSemana.includes('viernes')}
                onChange={handleDiaSemanaChange}
              />
              Viernes
            </label>
            <label>
              <input
                type="checkbox"
                value="sabado"
                checked={query.diaSemana.includes('sabado')}
                onChange={handleDiaSemanaChange}
              />
              Sábado
            </label>
            <label>
              <input
                type="checkbox"
                value="domingo"
                checked={query.diaSemana.includes('domingo')}
                onChange={handleDiaSemanaChange}
              />
              Domingo
            </label>
          </div>
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

      {/* //////////////// TABLA //////////////// */}

      <table>
        <thead>
          <tr className="bg-gray-100 row-auto">
            <th className="border p-2">Nombre</th>
            <th className="hidden md:table-cell border p-2">Teléfono</th>
            <th className="hidden md:table-cell border p-2">Tiene auto</th>
            <th className="hidden md:table-cell border p-2">
              Tiene experiencia
            </th>
            <th className="hidden md:table-cell border p-2">Está activo/a?</th>
            <th className="hidden md:table-cell border p-2">
              Disponibilidad semanal
            </th>
          </tr>
        </thead>

        <tbody>
          {voluntariosData?.map((v) => (
            <tr
              key={v.voluntario_id}
              className="text-center bg-gray-100 hover:bg-gray-200"
            >
              <td>
                <Link href={`/voluntarios/${v.voluntario_id}`}>
                  <div className="flex flex-row items-center ml-3 my-1 text-left">
                    <div className="bg-gray-300 cursor-pointer p-3 mx-2 gap-3 rounded-lg flex flex-row">
                      <LuUser size={20} />
                    </div>
                    {v.nombre} {v.apellido} ({v.voluntario_id})
                  </div>
                </Link>
              </td>
              <td className="hidden md:table-cell">
                <div>
                  {v.telefono2 ? (
                    <span>
                      {formatearNumeroTelefono(v.telefono)} /{' '}
                      {formatearNumeroTelefono(v.telefono2)}
                    </span>
                  ) : (
                    formatearNumeroTelefono(v.telefono)
                  )}
                </div>
              </td>
              <td className="hidden md:table-cell">
                <div>{v.tieneAuto ? 'si' : 'no'}</div>
              </td>

              <td className="hidden md:table-cell">
                <div>{v.experienciaCP === true ? 'si' : 'no'}</div>
              </td>

              <td className="hidden md:table-cell">
                <div>
                  {
                  // v?.fechaBaja !== null ? `Se dio de baja ${v.fechaBaja}`: null
                  }
                  {v?.Vacaciones && v.Vacaciones.some((vac) =>fechaActualEntreFechas( vac.fechaInicio, vac.fechaFin)
                  ) ? (
                    <details className={style.details}>
                      <summary>
                        Inactivo
                      </summary>
                      <small>
                        Inactivo hasta el{' '}
                        {
                          formatearFecha(v.Vacaciones.find((vac) => fechaActualEntreFechas(vac.fechaInicio, vac.fechaFin)).fechaFin)
                        }
                        <br />Motivo:{' '}
                        {
                          v.Vacaciones.find((vac) => fechaActualEntreFechas(vac.fechaInicio, vac.fechaFin)).detalles
                        } 
                      </small>
                    </details>
                  ) : (
                    'Activo'
                  )}
                </div>
              </td>

              <td className="hidden md:table-cell">
                <div>
                  {v?.Disponibilidades.map((d) => (
                    <span key={d.disponibilidad_id}>
                      {DiaSemanaEnum[d.diaSemana]} &nbsp;
                      {d.horaInicio}-{d.horaFin} <br />
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
