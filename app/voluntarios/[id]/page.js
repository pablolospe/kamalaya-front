import React from 'react';
import { formatearNumero, formatearFecha, calcularEdad } from '@/utils/formats';

const usuarioDetalle = async (id) => {
  return fetch(`https://kamalaya.onrender.com/usuarios/${id}`, {
    cache: 'no-store',
  }).then((res) => res.json());
};

async function Usuario({ params }) {
  const { id } = params;
  const u = await usuarioDetalle(id);
  return (
    <div
    // className="p-4 border rounded-lg shadow-md"
    >
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

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono alternativo: {u?.telefono2}
          </div>
        </div>

        <div className="flex flex-col md:max-w-3xl p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">Domicilio</h3>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Calle: {u?.calle} {u?.numero}
            </div>
            {/* 
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Número: 
            </div>
          </div> */}

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

        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">
            Ante una emergencia
          </h3>
          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono de Emergencia: {u?.telefonoEmergencia} (
            {u?.nombreContactoEmergencia})
          </div>
        </div>

        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">En Kamalaya</h3>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Fecha de alta: {formatearFecha(u?.fechaAlta)}
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Tiene Auto: {u?.tieneAuto ? 'Si' : 'No'}
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Tiene experiencia en cuidados paliativos: {u?.experienciaCP? 'Si' : 'No' }
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
              Fecha de Nacimiento: {formatearFecha(u?.fechaDeNacimiento)} ({calcularEdad(u?.fechaDeNacimiento)} años)
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

          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
              Profesión/Oficio/Ocupación: {u?.profesion_oficio_ocupacion}
              {/* className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" */}
            </div>

            <div className="flex flex-col md:flex-row justify-between">
              Hobbies/Habilidades: {u?.hobbies_habilidades}
              {/* className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" */}
            </div>
          </div>
        </div>

      </div>
{/* 
      <div className="mb-2 text-lg font-semibold">
        {u?.nombre} {u?.apellido}
      </div>
      <div className="text-gray-600">
        <div>Teléfono: {u?.telefono}</div>
        {u?.telefono2 && <div>Teléfono alternativo: {u?.telefono2}</div>}
        <div>Email: {u?.email}</div>
        <div>
          Dirección: {u?.calle} {u?.numero}, {u?.localidad}, {u?.provincia}, (
          {u?.codigoPostal})
        </div>
        <div>Tiene auto: {u?.tieneAuto ? 'Sí' : 'No'}</div>
        <div>
          Experiencia en cuidados paliativos: {u?.experienciaCP ? 'Sí' : 'No'}
        </div>
        <div>DNI: {formatearNumero(u?.dni)}</div>
        <div>Rol: {u?.rol_usuario}</div>
        <div>Género: {u?.genero}</div>
        <div>Fecha de nacimiento: {formatearFecha(u?.fechaDeNacimiento)}</div>
        <div>Ocupación: {u?.profesion_oficio_ocupacion}</div>
        <div>Fecha de alta: {formatearFecha(u?.fechaAlta)}</div>
        {u?.fechaBaja !== null ? (
          <div>Se encuentra activo</div>
          ) : (
        <div>Fecha de baja: {formatearFecha(u?.fechaBaja)}</div>
        )}
        <div> 
        Teléfono de emergencia: {u?.telefonoEmergencia} (
        {u?.nombreContactoEmergencia})
      </div>
    </div> */}
     </div>
  );
}
export default Usuario;
