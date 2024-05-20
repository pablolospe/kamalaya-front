import Link from 'next/link';
import {
  formatearFecha,
  calcularEdad,
  formatearNumeroTelefono,
  formatearNumeroAHora,
} from '@/utils/formats';
import {
  BotonAgregarDisponibilidad,
  BotonBorrarDisponibilidad,
  BotonAgregarAntecedenteDeAcompaniamiento,
  BotonBorrarAntecedenteAcompniamiento,
  BotonAgregarAntecedentePatologico,
  BotonBorrarAntecedentePatologico,
  BotonAgregarVacaciones,
  BotonBorrarVacaciones,
  FormularioVoluntarioId,
} from '@/components';
import { URL } from '@/config';
import style from './page.module.css';
import { voluntarioDetalle } from '@/utils/fetchVoluntarioId';

// const voluntarioDetalle = async (id) => {
//   return fetch(`${URL}/voluntarios/${id}`, {
//     cache: 'no-store',
//   }).then((res) => res.json());
// };

async function VoluntarioDetalle({ params }) {
  const { id } = params;
  const v = await voluntarioDetalle(id);
  // console.log(id);
  // console.log(v);

  return (
    <div className="flex flex-col">
      <h2 className="my-2 w-full md:w-1/2 text-lg text-center self-center font-semibold bg-purple-100 text-md p-2 rounded-lg border">
        {v?.nombre} {v?.apellido} ({v?.activo ? "activo" : "inactivo"})
      </h2>

      {/* <details>
        <summary className='cursor-pointer text-right'>editar</summary>
        <FormularioVoluntarioId v={v}/>
      </details> */}

      <div className="flex flex-col md:mx-auto md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
        <details className={style.details}>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">
            En Kamalaya
          </summary>
          <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
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
        </details>

        <details className={style.details}>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">
            Información personal
          </summary>

          <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
            <div>
              <b>Teléfono/contacto de Emergencia: </b>
              {formatearNumeroTelefono(v?.telefonoEmergencia)} (
              {v?.nombreContactoEmergencia})
            </div>
            <div>
              <b>Teléfono </b>
              {v?.telefono2 ? (
                <span>
                  {v?.telefono} / {v?.telefono2}
                </span>
              ) : (
                v?.telefono
              )}
            </div>
            <div>
              <b>Email</b> {v?.email}
            </div>
            <div>
              <b>Género</b>{' '}
              {v?.genero === 'M'
                ? 'Masculino'
                : v?.genero === 'F'
                ? 'Femenino'
                : 'otro'}
            </div>

            <div>
              <b>Fecha de Nacimiento: </b>
              {formatearFecha(v?.fechaDeNacimiento)} (
              {calcularEdad(v?.fechaDeNacimiento)} años)
            </div>

            <div>
              <b>DNI</b> {v?.dni}
            </div>
            <div>
              <b>Dirección </b> {v?.calle} {v?.numero}, {v?.localidad}
            </div>
            <div>
              {v?.provincia}, {v?.pais}({v?.codigoPostal})
            </div>
            <div>
              <b>Profesión/Oficio/Ocupación: </b>
              {v?.profesion_oficio_ocupacion}
            </div>
            <div>
              <b>Hobbies/Habilidades: </b>
              {v?.hobbies_habilidades}
            </div>
          </div>
        </details>

        <details className={style.details}>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">
            Disponibilidad
          </summary>

          <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
            {v?.Disponibilidades?.map((d) => (
              <>
                <div className="flex flex-row justify-between items-center w-full gap-6 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                  {d.diaSemana} - {d.horaInicio}/{d.horaFin} hs.
                  <br/> {d.acompTelefonico && '• Acompañamiento telefónico'}
                  <br/> {d.acompPresencial ? '• Acompañamiento presencial':''}
                  <br/> {d.admisiones ? '• Admisiones': ''}
                  <BotonBorrarDisponibilidad id={d.disponibilidad_id} />
                </div>
              </>
            ))}
            <div className="flex flex-row items-center w-full gap-6 mt-1 p-1 border rounded-md focus:ring focus:ring-blue-300">
              <BotonAgregarDisponibilidad id={id} /> agregar disponibilidad
              horaria
            </div>
          </div>
        </details>

        <details className={style.details}>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">
            Inactividad / Vacaciones
          </summary>
          <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">

          {v?.Vacaciones?.map((v) => (
            <>
              <div className="flex flex-row justify-between items-center w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                Inactivo desde {formatearFecha(v.fechaInicio)} hasta{' '}
                {formatearFecha(v.fechaFin)} <br />
                {v.detalles}
                <BotonBorrarVacaciones id={v.vacaciones_id} />
              </div>
            </>
          ))}

          <div className="flex flex-row items-center w-full gap-6 mt-1 p-1 border rounded-md focus:ring focus:ring-blue-300">
            <BotonAgregarVacaciones id={id} /> Agregar vacaciones / inactividad
          </div>
          </div>
        </details>

        <details className={style.details}>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">
            Antecedentes de acompañamiento
          </summary>
          <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">

          {v?.AntecedenteDeAcompaniamientos?.map((a) => (
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
          <div className="flex flex-row items-center w-full gap-6 mt-1 p-1 border rounded-md focus:ring focus:ring-blue-300">
          <BotonAgregarAntecedenteDeAcompaniamiento id={id} /> Agregar antecedentes de acompañamiento
          </div>
          </div>
        </details>

        <details className={style.details}>
          <summary className="font-bold text-lg text-blue-900 cursor-pointer">
            Antecedentes patologicos del voluntario
          </summary>
          <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">

          {v?.AntecedentePatologicos?.map((a) => (
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
          <div className="flex flex-row items-center w-full gap-6 mt-1 p-1 border rounded-md focus:ring focus:ring-blue-300">
            <BotonAgregarAntecedentePatologico id={id} /> Agregar antecedente patológico
          </div>
          </div>
        </details>

        <details className={style.details}>
        <summary className="font-bold text-lg text-blue-900 cursor-pointer">Grupo</summary>
        {v?.Grupos[0]
        ? 
        <div className="w-full mb-2 p-2 bg-white rounded-md focus:ring focus:ring-blue-300">
          <div><b>Fecha de inicio: </b> {formatearFecha(v.Grupos[0]?.fechaDeInicio)}</div>
          <div><b>Dia de la semana: </b> {v.Grupos[0]?.diaSemana}</div>
          <div><b>Hora de inicio: </b> {v.Grupos[0]?.horaInicio}</div>
          <div><b>Hora de fin: </b> {v.Grupos[0]?.horaFin}</div>
          <div><b>Descripcion: </b> {v.Grupos[0]?.descripcion}</div>
          {/* <div><b>Voluntarios: </b> {v.Grupos[0]?.Voluntarios.map(v=> 
            
            <span className="p-2 w-56 font-semibold text-blue-500 rounded-md hover:text-blue-800">
              <Link href={`/voluntarios/${v.voluntario_id}`}>{v.nombre} {v.apellido} </Link>
            </span>
          )}</div> */}
        </div>
        : 
        <div>Este voluntario aún no posee grupo. 
          <span className="p-2 w-56 font-semibold text-blue-500 rounded-md hover:text-blue-800 border-solid ">
              <Link href={`/grupos/crear`} >Crear nuevo grupo </Link>
            </span>
        </div>
      }
        </details>

      </div>

      <div className='flex flex-col md:flex-row justify-center align-middle m-8 text-center gap-4'>
        <Link href={`/voluntarios/${id}/editar`} className="p-2 w-56 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600">
        Editar voluntario
        </Link>
      </div>
    </div>
  );
}
export default VoluntarioDetalle;
