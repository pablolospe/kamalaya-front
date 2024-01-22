'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { URL } from '@/config';
import GoogleMapsView from '../../../../../components/GoogleMapsView';
import { voluntarioDetalle } from '@/utils/fetchVoluntarioId';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const FormularioVoluntarioId = () => {
  const { id } = useParams();

  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    telefono: '',
    telefono2: '',
    lat: '',
    lng: '',
    calle: '',
    numero: '',
    localidad: '',
    provincia: '',
    pais: '',
    codigoPostal: '',
    telefonoEmergencia: '',
    nombreContactoEmergencia: '',
    genero: '',
    profesion_oficio_ocupacion: '',
    hobbies_habilidades: '',
    fechaDeNacimiento: '',
    fechaAlta: '',
    fechaBaja: '',
    tieneAuto: '',
    experienciaCP: '',
    activo: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataJSON = JSON.stringify(formData);
    console.log(formDataJSON);

    try {
      const response = await fetch(
        `${URL}/voluntarios/${formData?.voluntario_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          text: 'Formulario editado correctamente',
          icon: 'success',
          confirmButtonColor: 'gray',
          color: 'black',
        }).then(router.push('/voluntarios'));

        console.log('Datos enviados exitosamente');
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const formData = await voluntarioDetalle(id);
      setFormData(formData);
    }
    fetchData();
  }, [setFormData]);

  const handleClick = async (e) => {
    e.preventDefault();
    const direccion = `${formData.calle} ${formData.numero} ${formData.localidad} ${formData.provincia} ${formData.pais}`;

    try {
      // Hacer una solicitud a la API de Geocodificación de Google Maps
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=AIzaSyBZXt6a5CJSfGyf9q5ymoWmrzUD_XT66DM`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status === 'OK') {
          // Obtener las coordenadas geográficas (latitud y longitud) de la respuesta
          const { lat, lng } = data.results[0].geometry.location;

          // Ahora puedes guardar lat y lng en tu base de datos junto con otros datos del formulario
          setFormData((prevData) => ({
            ...prevData,
            lat: lat.toString(),
            lng: lng.toString(),
          }));
          // ...código para guardar los datos en tu base de datos...

          console.log(`Coordenadas: Latitud ${lat}, Longitud ${lng}`);
        } else {
          console.error('Error al obtener las coordenadas');
        }
      } else {
        console.error('Error en la solicitud HTTP');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : (name === 'activo' ? value === 'true' : value);

    // const newValue = type === 'checkbox' ? checked : value;
    // const newValue = name === 'activo' ? value === 'true' : value;

    if (name === 'diaSemana' || name === 'horaInicio' || name === 'horaFin') {
      setFormData((prevData) => ({
        ...prevData,
        Disponibilidades: [
          { ...prevData.Disponibilidades[0], [name]: newValue },
        ],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <Link
        href={`/voluntarios/${formData.voluntario_id}`}
        className="fixed py-2 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 self-end font-semibold"
      >
        &larr;
      </Link>

      <h2 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
        Editar datos del voluntario
      </h2>
      <h3 className="m-2 font-bold text-md text-center">
        Información personal
      </h3>

      {/* <div className="flex flex-col md:max-w-3xl p-4 gap-2 shadow-lg rounded-lg"> */}
      <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
        <label>
          Nombre/s:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label>
          Apellido/s:
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block mb-2">
          Está activo:
          <select
            name="activo"
            value={formData.activo}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value='true'>Si</option>
            <option value='false'>no</option>
          </select>
        </label>

        <label>
          DNI:
          <input
            type="number"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            name="fechaDeNacimiento"
            value={formData.fechaDeNacimiento}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block mb-2">
          Género:
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Profesión/Oficio:
          <input
            type="text"
            name="profesion_oficio_ocupacion"
            value={formData.profesion_oficio_ocupacion}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label>
          Hobbies/Habilidades:
          <input
            type="text"
            name="hobbies_habilidades"
            value={formData.hobbies_habilidades}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>
      </div>
      {/* </div> */}

      <h3 className="mt-4 font-bold text-md text-center">
        Información de contacto
      </h3>
      <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label>
          Teléfono:
          <input
            type="number"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label>
          Teléfono 2:
          <input
            type="number"
            name="telefono2"
            value={formData.telefono2}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>
      </div>

      <h3 className="mt-4 font-bold text-md text-center">Domicilio</h3>
      <div className="flex flex-col md:max-w-3xl p-4 gap-2 shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <label>
            Calle:
            <input
              type="text"
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Número:
            <input
              type="number"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <label>
            Localidad:
            <input
              type="text"
              name="localidad"
              value={formData.localidad}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Provincia:
            <input
              type="text"
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <label>
            País:
            <input
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Código Postal:
            <input
              type="number"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>
        <button
          className="h-min bg-red-400 p-1 border rounded-md hover:bg-red-500 ease-in-out"
          onClick={handleClick}
        >
          buscar en el mapa
        </button>
        <GoogleMapsView marker={[formData]} />
      </div>

      <h3 className="mt-4 font-bold text-md text-center">
        Ante una emergencia
      </h3>
      <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
        <label>
          Teléfono de Emergencia:
          <input
            type="tel"
            name="telefonoEmergencia"
            value={formData.telefonoEmergencia}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label>
          Nombre de Contacto:
          <input
            type="text"
            name="nombreContactoEmergencia"
            value={formData.nombreContactoEmergencia}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>
      </div>

      <h3 className="mt-4 font-bold text-md text-center">En Kamalaya</h3>
      <div className="flex flex-col justify-between p-4 gap-2 shadow-lg rounded-lg">
        <label>
          Fecha de Alta:
          <input
            type="date"
            name="fechaAlta"
            value={formData.fechaAlta}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>
        <label className="inline-block mr-2">
          <input
            type="checkbox"
            name="tieneAuto"
            checked={formData.tieneAuto}
            onChange={handleChange}
            className="inline-block align-middle mr-2 border rounded-md p-2 focus:ring focus:ring-blue-300"
          />
          Tiene Auto?
        </label>

        <label>
          <input
            type="checkbox"
            name="experienciaCP"
            checked={formData.experienciaCP}
            onChange={handleChange}
            className="inline-block align-middle mr-2 border rounded-md p-2 focus:ring focus:ring-blue-300"
          />
          Tiene experiencia en CP?
        </label>
      </div>

      <button
        type="submit"
        className="w-40 mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Enviar formulario
      </button>
    </form>
  );
};

export default FormularioVoluntarioId;
