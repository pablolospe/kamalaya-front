'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { URL } from '@/config';
import BotonBack from '@/components/BotonBack';

const FormularioUsuario = () => {
  const router = useRouter();
  //   const [usuariosData, setUsuariosData] = useState();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    role: "",
  });

  //   useEffect(() => {
  //     async function fetchData() {
  //       const usuariosData = await fetchCrearUsuario();
  //       setUsuariosData(usuariosData);
  //     }
  //     fetchData();
  //   }, [setUsuariosData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataJSON = JSON.stringify(formData);
    console.log(formDataJSON);

    try {
      const response = await fetch(`${URL}/signin`, {
        method: 'POST',
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
        }).then(router.push('/usuarios'));

        console.log('Datos enviados exitosamente');
      } else {
        const errorData = await response.json(); // Parsea el JSON del cuerpo de la respuesta
        
        Swal.fire({
          title: 'Error',
          text: errorData.errors,
          icon: 'error',
          confirmButtonColor: 'gray',
          color: 'black',
        });
      }
    } catch (error) {
     
      // Muestra un Swal de error genérico en caso de error en la solicitud
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonColor: 'gray',
        color: 'black',
      });
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
    <div className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
        Crear nuevo usuario
      </h2>

      <BotonBack />
      <form
        onSubmit={handleSubmit}
      >

        <div className="flex flex-col md:flex-row justify-evenly align-center max-w-xl gap-8">
          <div className="p-4 md:max-w-3xl gap-2 shadow-lg rounded-lg">
            <div className="flex flex-col justify-evenly align-center max-w-xl gap-4">
              <div>
                <label>
                  Nombre/s
                  <input
                    required
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </label>
              </div>

              <div>
                <label>
                  Apellido/s
                  <input
                    required
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="p-4 max-w-md shadow-lg rounded-lg">
            <div className="grid grid-cols-1 gap-2">
              <div className="col-span-1">

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
              </div>

              <div>
                <label>
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </label>
              </div>

              <label>
                Password
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </label>
            </div>
          </div>
        </div>

        <div
          className='flex flex-row justify-center gap-8'
        >
          <button
            type="submit"
            className="w-40 mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Enviar formulario
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioUsuario;
