import React from 'react';
import { formatearFecha, calcularEdad } from '@/utils/formats';
import BotonAgregarDisponibilidad from '@/components/BotonAgregarDisponibilidad';
import BotonBorrarDisponibilidad from '@/components/BotonBorrarDisponibilidad';
import BotonBorrarAntecedenteAcompniamiento from '@/components/BotonBorrarAntecedenteAcompniamiento';
import BotonAgregarAntecedenteDeAcompaniamiento from '@/components/BotonAgregarAntecedenteDeAcompaniamiento';
import BotonAgregarAntecedentePatologico from '@/components/BotonAgregarAntecedentePatologico';
import BotonBorrarAntecedentePatologico from '@/components/BotonBorrarAntecedentePatologico';
import BotonAgregarVacaciones from '@/components/BotonAgregarVacaciones';
import BotonBorrarVacaciones from '@/components/BotonBorrarVacaciones';
import { URL } from '@/config';

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
    <div>
      <h2 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
        {v?.nombre} {v?.apellido}
      </h2>

      <div className="flex flex-col flex-wrap justify-evenly items-start md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <details className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
          <summary className="font-bold text-md">
            Información de contacto
          </summary>
          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Email: {v?.email}
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono: {v?.telefono}
          </div>

          {v?.telefono2 && (
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Teléfono alternativo: {v?.telefono2}
            </div>
          )}
        </details>

        <details className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <summary className="font-bold text-md">
            Ante una emergencia
          </summary>
          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono de Emergencia: {v?.telefonoEmergencia} (
            {v?.nombreContactoEmergencia})
          </div>
        </details>

        <details className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <summary className="font-bold text-md">
            Disponibilidad
          </summary>

          {v.Disponibilidades.length === 0 ? (
            <BotonAgregarDisponibilidad id={id} />
          ) : (
            v.Disponibilidades.map((d) => (
              <>
                <BotonAgregarDisponibilidad id={id} />
                <div className="flex flex-row justify-between items-center w-full gap-6 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                  {d.diaSemana}, {d.horaInicio}-{d.horaFin}
                  <BotonBorrarDisponibilidad id={d.disponibilidad_id} />
                </div>
              </>
            ))
          )}
        </details>

        <details className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <summary className="font-bold text-md">
            Vacaciones
          </summary>

          {v.Vacaciones.length === 0 ? (
            <BotonAgregarVacaciones id={id} />
          ) : (
            v.Vacaciones.map((v) => (
              <>
                <BotonAgregarVacaciones id={id} />
                <div className="flex flex-row justify-between items-center w-full gap-6 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                  Desde {formatearFecha(v.fechaInicio)} hasta{' '}
                  {formatearFecha(v.fechaFin)} <br />
                  {v.detalles}
                  <BotonBorrarVacaciones id={v.vacaciones_id} />
                </div>
              </>
            ))
          )}
        </details>

        <details className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <summary className="font-bold text-md">
            Antecedentes de acompañamiento
          </summary>

          {v.AntecedenteDeAcompaniamientos.length === 0 ? (
            <BotonAgregarAntecedenteDeAcompaniamiento id={id} />
          ) : (
            v.AntecedenteDeAcompaniamientos.map((a) => (
              <div className="flex flex-col gap-2 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                <BotonAgregarAntecedenteDeAcompaniamiento id={id} />
                <div className="flex justify-end">
                  <BotonBorrarAntecedenteAcompniamiento
                    id={a.antecedente_acompaniamiento_id}
                  />
                </div>
                <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                  Institución "{a.institucion}"
                </div>
                <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                  Tareas realizadas: {a.tareasRealizadas}
                </div>
                {a.detalles && (
                  <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                    Comentario: {a.detalles}
                  </div>
                )}
                <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                  Duración: Desde el {formatearFecha(a.fechaInicio)} hasta el{' '}
                  {formatearFecha(a.fechaFin)}
                </div>
              </div>
            ))
          )}
        </details>

        <details className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <summary className="font-bold text-md">
            En Kamalaya
          </summary>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Fecha de alta: {formatearFecha(v?.fechaAlta)}
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Tiene auto: {v?.tieneAuto ? 'Si' : 'No'}
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Tiene experiencia en cuidados paliativos:{' '}
            {v?.experienciaCP ? 'Si' : 'No'}
          </div>
        </details>

        <details className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <summary className="m-2 font-bold text-md gap-2">
            Información personal
          </summary>
          <div className="flex flex-col md:flex-row justify-evenly">
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              DNI: {v?.dni}
            </div>

            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Género:{' '}
              {v?.genero === 'M'
                ? 'Masculino'
                : v?.genero === 'F'
                ? 'Femenino'
                : 'otro'}
            </div>
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Fecha de Nacimiento: {formatearFecha(v?.fechaDeNacimiento)} (
            {calcularEdad(v?.fechaDeNacimiento)} años)
          </div>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Profesión/Oficio/Ocupación: {v?.profesion_oficio_ocupacion}
              {/* className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" */}
            </div>

            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Hobbies/Habilidades: {v?.hobbies_habilidades}
              {/* className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" */}
            </div>
          </div>
        </details>

        <details className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
            <summary className="font-bold text-md">
              Antecedentes patologicos del voluntario
            </summary>
          
          {v.AntecedentePatologicos.length === 0 ? <BotonAgregarAntecedentePatologico id={id} /> : v.AntecedentePatologicos?.map((a) => (
            <div className="flex flex-col gap-2 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              <BotonAgregarAntecedentePatologico id={id} />
              <div className="flex justify-end">
                <BotonBorrarAntecedentePatologico
                  id={a.antecedente_patologico_id}
                />
              </div>
              <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                Tipo de patología: {a?.tipoPatologia}
              </div>
              {a.descripcion && (
                <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                  Descripción: {a.descripcion}
                </div>
              )}
              {a.fechaDiagnostico && (
                <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                  Fecha del diagnostico: {a.fechaDiagnostico}
                </div>
              )}
              {a.tratamientoActual && (
                <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                  Tratamiento actual: {a.tratamientoActual}
                </div>
              )}
              {a.alergias && (
                <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                  Alergias: {a.alergias}
                </div>
              )}
              {a.medicacion && (
                <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                  Medicación: {a.medicacion}
                </div>
              )}
            </div>
          ))}
        </details>

        <details className="flex flex-col md:max-w-3xl p-4 gap-2 shadow-lg rounded-lg">
          <summary className="font-bold text-md">Domicilio</summary>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Calle: {v?.calle} {v?.numero}
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                Localidad: {v?.localidad}
              </div>

              <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
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
