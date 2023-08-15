'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Formulario = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: 'asd',
    apellido: 'asd',
    dni: '123123123',
    email: 'asd@asd.asd',
    telefono: '112345678',
    telefono2: '112345679',
    calle: 'Siempreviva',
    numero: '1234',
    localidad: 'asd',
    provincia: 'Buenos Aires',
    hashPassword: null,
    pais: 'Argentina',
    codigoPostal: '****',
    rol_usuario: 'Admin',
    telefonoEmergencia: '1199887766',
    nombreContactoEmergencia: 'Juan Perez',
    genero: 'M',
    profesion_oficio_ocupacion: '...',
    hobbies_habilidades: '...',
    fechaDeNacimiento: '1970-01-02',
    fechaAlta: '1970-01-02',
    fechaBaja: null,
    tieneAuto: false,
    experienciaCP: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('http://localhost:8000/usuarios', {
      const response = await fetch('https://kamalaya.onrender.com/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/');
        alert('Formulario enviado exitosamente');
        console.log('Datos enviados exitosamente');
        // Puedes redirigir o mostrar un mensaje de éxito aquí
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // console.log(formData);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h3 className="m-2 font-bold text-md text-center">
        Información personal
      </h3>

      <div className="flex flex-col md:max-w-3xl p-4 gap-2 shadow-lg rounded-lg">
        <div className="flex flex-col gap-6 md:flex-row justify-evenly">
          <label >
            Nombre/s:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label >
            Apellido/s:
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>
        <div className="flex flex-col gap-6 md:flex-row justify-evenly">
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
        </div>

        <div className="flex flex-col gap-6 md:flex-row justify-between">
          <label>
            Profesión/Oficio/Ocupación:
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
      </div>

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
              type="text"
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
              type="text"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>
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
          Rol de Usuario:
          <select
            type="text"
            name="rol_usuario"
            value={formData.rol_usuario}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </label>

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

        <label>
          Tiene Auto:
          <input
            type="checkbox"
            name="tieneAuto"
            checked={formData.tieneAuto}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label>
          Tiene experiencia en cuidados paliativos:
          <input
            type="checkbox"
            name="experienciaCP"
            checked={formData.experienciaCP}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default Formulario;
