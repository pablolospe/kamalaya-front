'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { URL } from '@/config';
import { fetchUsuarioId } from '@/utils/fetchUsuarioId'
import BotonBack from '@/components/BotonBack';
import BotonBorrarUsuario from './BotonBorrarUsuario.jsx'
import { useSession } from 'next-auth/react';

const FormularioUsuarioId = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    async function fetchData() {
      const user = await fetchUsuarioId(id, token);
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        role: user.role || "",
        password: "", // No deberías obtener el password del usuario
      });
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataJSON = JSON.stringify(formData);
    // console.log(formDataJSON);

    try {
      const response = await fetch(`${URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: formDataJSON,
      });

      if (response.ok) {
        Swal.fire({
          text: 'Formulario ingresado correctamente',
          icon: 'success',
          confirmButtonColor: 'gray',
          color: 'black',
        }).then(() => router.push('/usuarios'));

        console.log('Datos enviados exitosamente');
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

  return (
    <div className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
        Modificar usuario
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
                    <option value="">Elije una opción</option>
                    <option value="Admin">Administrador</option>
                    <option value="User">Usuario</option>
                  </select>
                </label>
              </div>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </label>

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
            className="w-40 mt-4 py-2 px-4 text-center ring-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Enviar formulario
          </button>
         
          <BotonBorrarUsuario id={id} nombre={formData.nombre} apellido={formData.apellido} />
        </div>

      </form>
    </div>
  );
};

export default FormularioUsuarioId;
