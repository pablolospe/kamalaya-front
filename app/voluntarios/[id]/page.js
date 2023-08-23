import React from 'react';
import { formatearFecha, calcularEdad } from '@/utils/formats';
import BotonAgregarDisponibilidad from '@/components/BotonAgregarDisponibilidad';
import BotonBorrarDisponibilidad from '@/components/BotonBorrarDisponibilidad';
import BotonBorrarAntecedenteAcompniamiento from '@/components/BotonBorrarAntecedenteAcompniamiento';
import BotonAgregarAntecedenteDeAcompaniamiento from '@/components/BotonAgregarAntecedenteDeAcompaniamiento';

const usuarioDetalle = async (id) => {
  return fetch(`https://kamalaya-dev.fl0.io/usuarios/${id}`, {
    cache: 'no-store',
  }).then((res) => res.json());
};

async function Usuario({ params }) {
  const { id } = params;
  const u = await usuarioDetalle(id);

  return (
    <div>
      <div className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
          {u?.nombre} {u?.apellido}
        </h2>

        <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">
            Información de contacto
          </h3>
          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Email: {u?.email}
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono: {u?.telefono}
          </div>

          {u?.telefono2 && (
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Teléfono alternativo: {u?.telefono2}
            </div>
          )}
        </div>


        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">Ante una emergencia</h3>
          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono de Emergencia: {u?.telefonoEmergencia} (
            {u?.nombreContactoEmergencia})
          </div>
        </div>

        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <div className="flex flex-row gap-3 items-center justify-center">
            <h3 className="font-bold text-md text-center">Disponibilidad</h3>
            <BotonAgregarDisponibilidad id={id} />
          </div>

          {u.Disponibilidades.map((d) => (
            <>
              <div className="flex flex-row justify-between items-center w-full gap-6 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                {d.diaSemana}, {d.horaInicio.slice(0, -3)}-
                {d.horaFin.slice(0, -3)}
                <BotonBorrarDisponibilidad id={d.disponibilidad_id} />
              </div>
            </>
          ))}
        </div>

        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <div className="flex flex-row gap-3 items-center justify-center">
            <h3 className="font-bold text-md text-center">
              Antecedentes de acompañamiento
            </h3>
            <BotonAgregarAntecedenteDeAcompaniamiento id={id} />
          </div>

          {u.AntecedenteDeAcompaniamientos.map((a) => (
            <div className="flex flex-col gap-2 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
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
              <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                Comentario: {a.detalles}
              </div>
              <div className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                Duración: Desde el {formatearFecha(a.fechaInicio)} hasta el{' '}
                {formatearFecha(a.fechaFin)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">En Kamalaya</h3>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Fecha de alta: {formatearFecha(u?.fechaAlta)}
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Tiene auto: {u?.tieneAuto ? 'Si' : 'No'}
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Tiene experiencia en cuidados paliativos:{' '}
            {u?.experienciaCP ? 'Si' : 'No'}
          </div>
        </div>

        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="m-2 font-bold text-md gap-2 text-center">
            Información personal
          </h3>
          <div className="flex flex-col md:flex-row justify-evenly">
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              DNI: {u?.dni}
            </div>

            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Género:{' '}
              {u?.genero === 'M'
                ? 'Masculino'
                : u?.genero === 'F'
                ? 'Femenino'
                : 'otro'}
            </div>
          </div>

            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Fecha de Nacimiento: {formatearFecha(u?.fechaDeNacimiento)} (
              {calcularEdad(u?.fechaDeNacimiento)} años)
            </div>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Profesión/Oficio/Ocupación: {u?.profesion_oficio_ocupacion}
              {/* className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" */}
            </div>

            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Hobbies/Habilidades: {u?.hobbies_habilidades}
              {/* className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" */}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:max-w-3xl p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">Domicilio</h3>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Calle: {u?.calle} {u?.numero}
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                Localidad: {u?.localidad}
              </div>

              <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
                {u?.provincia}, {u?.pais}({u?.codigoPostal})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Usuario;