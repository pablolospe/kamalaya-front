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

      <div className="flex flex-col items-start md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <details className="">
          <summary>Información de contacto</summary>
          <div>Email: {v?.email}</div>

          <div>Teléfono: {v?.telefono}</div>
        </details>

        <details>
          <summary>Ante una emergencia</summary>
          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Teléfono de Emergencia: {v?.telefonoEmergencia} (
            {v?.nombreContactoEmergencia})
          </div>
        </details>

        <details>
          <summary>En Kamalaya</summary>

          <div className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300">
            Fecha de alta: {formatearFecha(v?.fechaAlta)}
          </div>
        </details>

        <details>
          <summary>Información personal</summary>

          <div>DNI: {v?.dni}</div>

          <div>
            Género:{' '}
            {v?.genero === 'M'
              ? 'Masculino'
              : v?.genero === 'F'
              ? 'Femenino'
              : 'otro'}
          </div>

          <div>
            Fecha de Nacimiento: {formatearFecha(v?.fechaDeNacimiento)} (
            {calcularEdad(v?.fechaDeNacimiento)} años)
          </div>

          <div>
            Hobbies: {v?.hobbies}
          </div>
        </details>

        <details>
          <summary>Domicilio</summary>

          <div>
            Calle: {v?.calle} {v?.numero}
          </div>

          <div>Localidad: {v?.localidad}</div>

          <div>
            {v?.provincia}, {v?.pais}({v?.codigoPostal})
          </div>
        </details>
      </div>
    </div>
  );
}
export default Paciente;
