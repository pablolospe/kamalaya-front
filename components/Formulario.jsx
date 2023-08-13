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
    telefono: 'asd',
    telefono2: 'asd',
    calle: 'asd',
    numero: 'asd',
    localidad: 'asd',
    provincia: 'asd',
    hashPassword: null,
    pais: 'asd',
    codigoPostal: 'asd',
    rol_usuario: 'Admin',
    telefonoEmergencia: 'asd',
    nombreContactoEmergencia: 'asd',
    genero: 'M',
    profesion_oficio_ocupacion: 'asd',
    hobbies_habilidades: 'asd',
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

  console.log(formData);
  //   quiero que me agregues estilo con tailwind SOLO en esta porcion de codigo, y que sea responsive. Quiero un estilo sobrio.
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto p-6 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="flex flex-row justify-evenly">
        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        {/* Campo Apellido */}
        <label className="block mb-2">
          Apellido:
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>
      </div>

      <h3 className="font-bold text-lg text-center">Información de contacto</h3>
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
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
        />
      </label>

      <label>
        Teléfono 2:
        <input
          type="tel"
          name="telefono2"
          value={formData.telefono2}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
        />
      </label>
      <h3 className="font-bold text-xl text-center">Domicilio</h3>
      <div className="flex flex-row justify-evenly">
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
      <div className="flex flex-row justify-evenly">
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
      <div className="flex flex-row justify-evenly">
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
      <label>
        Rol de Usuario:
        <select
          type="text"
          name="rol_usuario"
          value={formData.rol_usuario}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
        >
          <option value="M">Admin</option>
          <option value="F">User</option>
        </select>
      </label>
      <div className='flex flex-row justify-between'>
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
          Nombre de Contacto de Emergencia:
          <input
            type="text"
            name="nombreContactoEmergencia"
            value={formData.nombreContactoEmergencia}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>
      </div>
      <h3 className="font-bold text-lg text-center">Información personal</h3>
      <div className="flex flex-row justify-center align-middle gap-2">
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
        Experiencia en cuidados paliativos:
        <input
          type="checkbox"
          name="experienciaCP"
          checked={formData.experienciaCP}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
        />
      </label>

      {/* Repite esto para todos los campos restantes */}
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
