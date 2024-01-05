'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { URL } from '@/config';
import { useParams } from 'next/navigation';
import { fetchUsuarioId } from '@/utils/fetchUsuarioId'

const FormularioUsuarioId = () => {
  const router = useRouter();
  const { id } = useParams()
  const [formData, setFormData] = useState({   
    nombre:"",
    apellido:"",
    email:"",
    role:"",   
    password:"",
  });

  useEffect(() => {
    async function fetchData() {
      const user = await fetchUsuarioId(id)
      setFormData(user);
    }
    fetchData();
  }, [setFormData])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataJSON= JSON.stringify(formData)
    console.log(formDataJSON);

    try {
      const response = await fetch(`${URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          text: 'Formulario ingresado correctamente',
          icon: 'success',
          confirmButtonColor: 'gray',
          color: 'black',
        }).then(router.push('/usuarios'))
        
        console.log('Datos enviados exitosamente');
        
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    
    const isVoluntarioField = e.target.name === 'voluntario_id';
  
    let newValue =
      e.target.type === 'checkbox'
        ? e.target.checked
        : isVoluntarioField
        ? e.target.value || undefined
        : e.target.value;
  
    if (isVoluntarioField && newValue) {
      newValue = Number(newValue);
    }
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: newValue,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
        Modificar usuario
      </h2>

      <div className="flex flex-col md:max-w-3xl p-4 gap-2 shadow-lg rounded-lg">
        <div className="flex flex-col gap-6 justify-evenly">
          <label>
            Nombre/s
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Apellido/s
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label className="block mb-2">
            Rol
            <select
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="">Elije una opcion</option>
              <option value="Admin">Administrador</option>
              <option value="User">Usuario</option>
            </select>
          </label>
       
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>
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

export default FormularioUsuarioId;
