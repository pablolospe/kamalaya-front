import React from 'react';
import { formatearFecha, calcularEdad } from '@/utils/formats';


const pacienteDetalle = async (id) => {
  return fetch(`https://kamalaya-dev.fl0.io/paciente/${id}`, {
  // return fetch(`http://localhost:8000/paciente/${id}`, {
    cache: 'no-store',
  }).then((res) => res.json());
};

async function Paciente({ params }) {
  const { id } = params;
  const v = await pacienteDetalle(id);
  // console.log(id);
  // console.log(v);

  return (
    <div>
        <h2 className="m-2 text-lg text-center font-bold text-md p-2 rounded-lg border">
          {v?.nombre} {v?.apellido}
        </h2>

      <div className="flex flex-row flex-wrap justify-evenly items-start md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">

        <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">
            Información de contacto
          </h3>
          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Email: {v?.email}
          </div>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono: {v?.telefono}
          </div>
        </div>

        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">Ante una emergencia</h3>
          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono de Emergencia: {v?.telefonoEmergencia} (
            {v?.nombreContactoEmergencia})
          </div>
        </div>

        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">En Kamalaya</h3>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Fecha de alta: {formatearFecha(v?.fechaAlta)}
          </div>
        </div>

        <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="m-2 font-bold text-md gap-2 text-center">
            Información personal
          </h3>
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
              Hobbies: {v?.hobbies}
              {/* className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300" */}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:max-w-3xl p-4 gap-2 shadow-lg rounded-lg">
          <h3 className="font-bold text-md text-center">Domicilio</h3>
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
        </div>
      </div>
    </div>
  );
}
export default Paciente;
