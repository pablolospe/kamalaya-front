import React from 'react';
import Link from 'next/link';
import { formatearFecha, calcularEdad, formatearNumeroTelefono, formatearNumeroAHora } from '@/utils/formats';
import {BotonAgregarDisponibilidad, BotonBorrarDisponibilidad, BotonAgregarAntecedenteDeAcompaniamiento, BotonBorrarAntecedenteAcompniamiento, BotonAgregarAntecedentePatologico, BotonBorrarAntecedentePatologico, BotonAgregarVacaciones, BotonBorrarVacaciones, FormularioVoluntarioId} from '@/components';
import { URL } from '@/config';
import style from './page.module.css';

const voluntarioDetalle = async (id) => {
  return fetch(`${URL}/voluntarios/${id}`, {
    cache: 'no-store',
  }).then((res) => res.json());
};

async function Voluntario({ params }) {
  const { id } = params;
  const v = await voluntarioDetalle(id);
  console.log(id);
  console.log(v);

  return (
    <div className="md:mx-40">
      <div className='flex flex-row align-middle justify-between content-center m-2 rounded-lg border p-2' >

      <h2 className="text-lg font-bold">
        {v?.nombre} {v?.apellido} 
      </h2> 
    
      <details>
        <summary className='cursor-pointer text-right'>editar</summary>
        <FormularioVoluntarioId v={v}/>
      </details>
      </div>

      <div className="flex flex-col flex-wrap justify-evenly items-start md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <details
          className={style.details}
          // className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg"
        >
          <summary className="font-bold text-md cursor-pointer">
            Información de contacto
          </summary>
          <div className="w-full mt-1 p-1 border rounded-md focus:ring focus:ring-blue-300">
            <b>Email: </b> {v?.email}
          </div>

          <div className="w-full mt-1 p-1 border rounded-md focus:ring focus:ring-blue-300">
            <b>Teléfono: </b>
            {formatearNumeroTelefono(v?.telefono)}
          </div>

          {v?.telefono2 && (
            <div className="w-full mt-1 p-1 border rounded-md focus:ring focus:ring-blue-300">
              <b>Teléfono alternativo: </b>
              {formatearNumeroTelefono(v?.telefono2)}
            </div>
          )}
        </details>

        <details className={style.details}>
          <summary className="font-bold text-md cursor-pointer">
            Ante una emergencia
          </summary>
          <div className="w-full mt-1 p-1 border rounded-md focus:ring focus:ring-blue-300">
            <b>Teléfono de Emergencia: </b>
            {formatearNumeroTelefono(v?.telefonoEmergencia)} ({v?.nombreContactoEmergencia})
          </div>
        </details>

        <details className={style.details}>
          <summary className="font-bold text-md cursor-pointer">
            Disponibilidad
          </summary>
          {v.Disponibilidades?.map((d) => (
            <>
              <div className="flex flex-row justify-between items-center w-full gap-6 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                {d.diaSemana}, {d.horaInicio}-{d.horaFin}
                <BotonBorrarDisponibilidad id={d.disponibilidad_id} />
              </div>
            </>
          ))}
          <BotonAgregarDisponibilidad id={id} />
        </details>

        <details className={style.details}>
          <summary className="font-bold text-md cursor-pointer">
            Inactividad
          </summary>

          {v.Vacaciones?.map((v) => (
            <>
              <div className="flex flex-row justify-between items-center w-full gap-6 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                Desde {formatearFecha(v.fechaInicio)} hasta{' '}
                {formatearFecha(v.fechaFin)} <br />
                {v.detalles}
                <BotonBorrarVacaciones id={v.vacaciones_id} />
              </div>
            </>
          ))}

          <BotonAgregarVacaciones id={id} />
        </details>

        <details className={style.details}>
          <summary className="font-bold text-md cursor-pointer">
            Antecedentes de acompañamiento
          </summary>

          {v.AntecedenteDeAcompaniamientos?.map((a) => (
            <div className="flex flex-col gap-2 mt-1 focus:ring focus:ring-blue-300">
              <div className="p-2 border rounded-md">
                <div className="flex justify-end">
                  <BotonBorrarAntecedenteAcompniamiento
                    id={a.antecedente_acompaniamiento_id}
                  />
                </div>
                <div className="w-full focus:ring focus:ring-blue-300">
                  <b>Institución </b>"{a.institucion}"
                </div>
                <div className="w-full focus:ring focus:ring-blue-300">
                  <b>Tareas realizadas: </b>
                  {a.tareasRealizadas}
                </div>
                {a.detalles && (
                  <div className="w-full focus:ring focus:ring-blue-300">
                    <b>Comentario: </b>
                    {a.detalles}
                  </div>
                )}
                <div className="w-full focus:ring focus:ring-blue-300">
                  <b>Duración: </b>Desde el {formatearFecha(a.fechaInicio)}{' '}
                  hasta el {formatearFecha(a.fechaFin)}
                </div>
              </div>
            </div>
          ))}
          <BotonAgregarAntecedenteDeAcompaniamiento id={id} />
        </details>

        <details className={style.details}>
          <summary className="font-bold text-md cursor-pointer">
            En Kamalaya
          </summary>
          <div className="flex flex-col gap-2 mt-1 focus:ring focus:ring-blue-300">
            <div className="p-2 border rounded-md">
              <div className="w-full focus:ring focus:ring-blue-300">
                <b>Fecha de alta: </b>
                {formatearFecha(v?.fechaAlta)}
              </div>

              <div className="w-full focus:ring focus:ring-blue-300">
                <b>Tiene auto: </b>
                {v?.tieneAuto ? 'Si.' : 'No.'}
              </div>

              <div className="w-full focus:ring focus:ring-blue-300">
                <b>Tiene experiencia en cuidados paliativos: </b>
                {v?.experienciaCP ? 'Si.' : 'No.'}
              </div>
            </div>
          </div>
        </details>

        <details className={style.details}>
          <summary className="font-bold text-md cursor-pointer">
            Información personal
          </summary>
          <div className="flex flex-col gap-2 mt-1 focus:ring focus:ring-blue-300">
            <div className="p-2 border rounded-md">
              <div className="w-full focus:ring focus:ring-blue-300">
                <b>DNI: </b>
                {v?.dni}
              </div>

              <div className="w-full focus:ring focus:ring-blue-300">
                <b>Género: </b>
                {v?.genero === 'M'
                  ? 'Masculino'
                  : v?.genero === 'F'
                  ? 'Femenino'
                  : 'otro'}
              </div>

              <div className="w-full focus:ring focus:ring-blue-300">
                <b>Fecha de Nacimiento: </b>
                {formatearFecha(v?.fechaDeNacimiento)} (
                {calcularEdad(v?.fechaDeNacimiento)} años)
              </div>

              <div className="w-full focus:ring focus:ring-blue-300">
                <b>Profesión/Oficio/Ocupación: </b>
                {v?.profesion_oficio_ocupacion}
                {/* className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" */}
              </div>

              <div className="w-full focus:ring focus:ring-blue-300">
                <b>Hobbies/Habilidades: </b>
                {v?.hobbies_habilidades}
                {/* className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" */}
              </div>
            </div>
          </div>
        </details>

        <details className={style.details}>
          <summary className="font-bold text-md cursor-pointer">
            Antecedentes patologicos del voluntario
          </summary>

          {v.AntecedentePatologicos?.map((a) => (
            <div className="flex flex-col gap-2 mt-1 focus:ring focus:ring-blue-300">
              <div className="p-2 border rounded-md">
                <div className="flex justify-end">
                  <BotonBorrarAntecedentePatologico
                    id={a.antecedente_patologico_id}
                  />
                </div>

                <div className="w-full focus:ring focus:ring-blue-300">
                  <b>Tipo de patología:</b> {a?.tipoPatologia}
                </div>
                {a.descripcion && (
                  <div className="w-full focus:ring focus:ring-blue-300">
                    <b>Descripción: </b> {a.descripcion}
                  </div>
                )}
                {a.fechaDiagnostico && (
                  <div className="w-full focus:ring focus:ring-blue-300">
                    <b>Fecha del diagnostico: </b> {a.fechaDiagnostico}
                  </div>
                )}
                {a.tratamientoActual && (
                  <div className="w-full focus:ring focus:ring-blue-300">
                    <b>Tratamiento actual: </b>
                    {a.tratamientoActual}
                  </div>
                )}
                {a.alergias && (
                  <div className="w-full focus:ring focus:ring-blue-300">
                    <b>Alergias: </b>
                    {a.alergias}
                  </div>
                )}
                {a.medicacion && (
                  <div className="w-full focus:ring focus:ring-blue-300">
                    <b>Medicación: </b>
                    {a.medicacion}
                  </div>
                )}
              </div>
            </div>
          ))}
          <BotonAgregarAntecedentePatologico id={id} />
        </details>

        <details className={style.details}>
          <summary className="font-bold text-md cursor-pointer">
            Domicilio
          </summary>
          <div className="flex flex-col gap-2 mt-1 focus:ring focus:ring-blue-300">
            <div className="p-2 border rounded-md">
              <div className="w-full rounded-md focus:ring focus:ring-blue-300">
                <b>Calle: </b>
                {v?.calle} {v?.numero}
              </div>

              <div className="w-full rounded-md focus:ring focus:ring-blue-300">
                <b>Localidad: </b>
                {v?.localidad}
              </div>

              <div className="w-full rounded-md focus:ring focus:ring-blue-300">
                {v?.provincia}, {v?.pais}({v?.codigoPostal})
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
export default Voluntario;
