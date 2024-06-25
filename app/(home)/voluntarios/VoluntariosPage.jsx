'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LuUser } from 'react-icons/lu';
import { capitalizeFirstLetterOfEachWord, fechaActualEntreFechas, formatearNumeroTelefono, formatearFecha, DiaSemanaEnum, formatearNumeroAHora } from '@/utils/formats';
import GoogleMapsView from '@/components/GoogleMapsView';
import style from './page.module.css';
import { voluntarios } from '@/utils/fetchVoluntarios.js';
import { pacientes } from '@/utils/fetchPacientes.js';
import { useSession } from 'next-auth/react';

function VoluntariosPage() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [voluntariosData, setVoluntariosData] = useState([]);
  const [showPacientes, setShowPacientes] = useState(false);
  const [query, setQuery] = useState({
    nombre: '',
    apellido: '',
    localidad: '',
    profesion_oficio_ocupacion: '',
    hobbies_habilidades: '',
    tieneAuto: '',
    experienciaCP: '',
    activo: true,
    diaSemana: [],
  });

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
    setSortField(null)
    setQuery({
      nombre: '',
      apellido: '',
      localidad: '',
      profesion_oficio_ocupacion: '',
      hobbies_habilidades: '',
      tieneAuto: '',
      experienciaCP: '',
      activo: true,
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
      const voluntarioData = await voluntarios(query, token);
      let pacienteData = [];

      if (showPacientes) pacienteData = await pacientes(query, token);

      const combinedData = voluntarioData?.concat(pacienteData);

      let sortedData = combinedData;
      if (sortField !== null) {
        sortedData = sortedData.sort((a, b) =>
          sortOrder === 'asc'
            ? a[sortField].localeCompare(b[sortField])
            : b[sortField].localeCompare(a[sortField])
        );
      }
      setVoluntariosData(sortedData);
      // (combinedData);
    }
    fetchData();
  }, [query, session, sortField, sortOrder, showPacientes]);

  return (
    <div className="flex flex-col gap-2">

      {/* //////////////// MAPA //////////////// */}

      <details className="bg-gray-100 gap-4 p-4 rounded-lg">
        <summary className="hover:font-semibold cursor-pointer">MAPA</summary>
        <GoogleMapsView marker={voluntariosData} />
      </details>

      {/* //////////////// FILTROS1 //////////////// */}

      <details open className="bg-gray-100 gap-4 p-4 rounded-lg">
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
            <div className="flex flex-wrap gap-x-0.5">
              <input
                type="checkbox"
                value="lunes"
                checked={query.diaSemana.includes('lunes')}
                onChange={handleDiaSemanaChange}
              />
              <label className="mr-2">Lun</label>
              <input
                type="checkbox"
                value="martes"
                checked={query.diaSemana.includes('martes')}
                onChange={handleDiaSemanaChange}
              />
              <label className="mr-2">Mar</label>
              <input
                type="checkbox"
                value="miercoles"
                checked={query.diaSemana.includes('miercoles')}
                onChange={handleDiaSemanaChange}
              />
              <label className="mr-2">Mié</label>
              <input
                type="checkbox"
                value="jueves"
                checked={query.diaSemana.includes('jueves')}
                onChange={handleDiaSemanaChange}
              />
              <label className="mr-2">Jue</label>
              <input
                type="checkbox"
                value="viernes"
                checked={query.diaSemana.includes('viernes')}
                onChange={handleDiaSemanaChange}
              />
              <label className="mr-2">Vie</label>
              <input
                type="checkbox"
                value="sabado"
                checked={query.diaSemana.includes('sabado')}
                onChange={handleDiaSemanaChange}
              />
              <label className="mr-2">Sáb</label>
              <input
                type="checkbox"
                value="domingo"
                checked={query.diaSemana.includes('domingo')}
                onChange={handleDiaSemanaChange}
              />
              <label className="mr-2">Dom</label>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <label htmlFor="tieneAuto" className="text-xs text-gray-800 mr-2">
              Tiene Auto?
            </label>
            <select
              name="tieneAuto"
              value={query.tieneAuto}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              id="tieneAuto"
            >
              <option value="">Todos</option>
              <option value={true}>Si</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 text-wrap items-center">
            <label
              htmlFor="experienciaCP"
              className="text-xs text-gray-800 mr-2"
            >
              Experiencia en CP?
            </label>
            <select
              name="experienciaCP"
              type="text"
              value={query.experienciaCP}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              id="experienciaCP"
            >
              <option value="">todos</option>
              <option value={true}>si</option>
              <option value={false}>no</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 text-wrap items-center">
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
          </div>

          <button
            onClick={handleBorrarFiltros}
            className="h-14 p-3 text-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Borrar <br /> filtros
          </button>

          <button
            onClick={() =>
              setShowPacientes((prevShowPacientes) => !prevShowPacientes)
            }
            className="h-14 p-3 text-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            {!showPacientes ? 'Ver pacientes' : 'Ocultar pacientes'}
          </button>
        </div>
      </details>

      {/* //////////////// TABLA //////////////// */}
      <table className='text-sm'>
        <thead>
          <tr className="bg-gray-100 row-auto">
            <th className="border p-2 cursor-pointer hover:bg-gray-200" onClick={() => onSort('nombre')}>
              Nombre {!sortField && 'A-Z'}{sortField === 'nombre' && (sortOrder === 'desc' ? '⬆️' : '⬇️')}
            </th>
            <th className="border p-2 cursor-pointer hover:bg-gray-200" onClick={() => onSort('apellido')}>
              Apellido {!sortField && 'A-Z'}{sortField === 'apellido' && (sortOrder === 'desc' ? '⬆️' : '⬇️')}
            </th>
            <th className="hidden md:table-cell w-28 border p-2">Teléfono</th>
            <th className="hidden md:table-cell w-4 text-xs border p-2">Tiene auto</th>
            <th className="hidden md:table-cell w-4 text-xs border p-2">Exp CP</th>
            <th className="hidden md:table-cell w-4 text-xs border p-2">Activo</th>
            <th className="hidden md:table-cell w-4 text-xs border p-2">Está de vacaciones?</th>
            <th className="hidden md:table-cell border p-2">
              Disponibilidad semanal
            </th>
          </tr>
        </thead>

        <tbody>
          {voluntariosData?.map((v, i) => (
            <tr
              key={i}
              className={
                !v.paciente_id
                  ? 'text-center bg-purple-100 hover:bg-purple-200'
                  : 'text-center bg-green-50 hover:bg-green-100'
              }
            >
              {session?.user?.role === 'Admin' ?
                <td>
                  <Link
                    href={
                      !v.paciente_id
                        ? `/voluntarios/${v.voluntario_id}`
                        : `/pacientes/${v.paciente_id}`
                    }
                  >
                    <div className="flex flex-row items-center ml-3 my-1 text-left">
                      <div className="bg-gray-300 cursor-pointer p-3 mx-2 gap-3 rounded-lg flex flex-row">
                        <LuUser size={20} />
                      </div>
                      {capitalizeFirstLetterOfEachWord(v.nombre)}
                    </div>
                  </Link>
                </td>
                :
                <div className="flex flex-row items-center ml-3 my-1 text-left">
                  <div className="bg-gray-300 cursor-pointer p-3 mx-2 gap-3 rounded-lg flex flex-row">
                    <LuUser size={20} />
                  </div>
                  {capitalizeFirstLetterOfEachWord(v.nombre)}
                </div>

              }

              {session?.user?.role === 'Admin' ?
                <td>
                  <Link
                    href={
                      !v.paciente_id
                        ? `/voluntarios/${v.voluntario_id}`
                        : `/pacientes/${v.paciente_id}`
                    }
                  >
                    <div className="flex flex-row items-center ml-3 my-1 text-left">
                      {capitalizeFirstLetterOfEachWord(v.apellido)}
                    </div>
                  </Link>
                </td>
                :
                <td>
                  <div className="flex flex-row items-center ml-3 my-1 text-left">
                    {capitalizeFirstLetterOfEachWord(v.apellido)}
                  </div>
                </td>
              }
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
                {!v.paciente_id && <div>{v.tieneAuto ? '✅' : '❌'}</div>}
              </td>

              <td className="hidden md:table-cell">
                {!v.paciente_id && <div>{v.experienciaCP === true ? '✅' : '❌'}</div>}
              </td>

              <td className="hidden md:table-cell">
                {!v.paciente_id && <div>{v.activo === true ? '✅' : '❌'}</div>}
              </td>

              <td className="hidden md:table-cell">
                <div>
                  {
                    // v?.fechaBaja !== null ? `Se dio de baja ${v.fechaBaja}`: null
                  }
                  {v?.Vacaciones &&
                    v.Vacaciones.some((vac) =>
                      fechaActualEntreFechas(vac.fechaInicio, vac.fechaFin)
                    ) ? (
                    <details className={style.details}>
                      <summary>Si</summary>
                      <div className="bg-white rounded mb-2">
                        <small>
                          hasta el{' '}
                          {formatearFecha(
                            v.Vacaciones.find((vac) =>
                              fechaActualEntreFechas(
                                vac.fechaInicio,
                                vac.fechaFin
                              )
                            ).fechaFin
                          )}
                          <br />
                          Motivo:{' '}
                          {
                            v.Vacaciones.find((vac) =>
                              fechaActualEntreFechas(
                                vac.fechaInicio,
                                vac.fechaFin
                              )
                            ).detalles
                          }
                        </small>
                      </div>
                    </details>
                  ) : (
                    'No'
                  )}
                </div>
              </td>

              <td className="hidden md:table-cell">
                <div>
                  {v?.Disponibilidades?.map((d) => (
                    <span key={d.disponibilidad_id}>
                      {DiaSemanaEnum[d.diaSemana]} &nbsp;
                      {d.horaInicio}/{d.horaFin}
                      <br />
                      {d.acompTelefonico && '•Telefónico'}&nbsp;
                      {d.acompPresencial && '•Presencial'}&nbsp;
                      {d.admisiones && '•Admisiones'}
                      <br />
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

export default VoluntariosPage;
