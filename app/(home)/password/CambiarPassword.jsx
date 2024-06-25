'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { URL } from '@/config';
import { useParams } from 'next/navigation';
import { fetchUsuarioId } from '@/utils/fetchUsuarioId'
import { useSession, signOut } from 'next-auth/react';
import BotonBack from '@/components/BotonBack.jsx'

const CambiarPassword = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const router = useRouter();
  // const { id } = useParams()
  const [formData, setFormData] = useState({
    user_id: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (session?.user?.user_id) {
      setFormData((prevData) => ({
        ...prevData,
        user_id: session.user.user_id,
      }));
    }
  }, [session]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          text: 'Formulario ingresado correctamente',
          icon: 'success',
          confirmButtonColor: 'gray',
          color: 'black',
        }).then(() => signOut({ callbackUrl: '/auth/login' }))

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
    <div className="mx-4 mt-20" >
      <div className="flex flex-col items-center md:mx-auto p-4 bg-gray-100 rounded-lg shadow-md">

        <BotonBack />

        <form
          onSubmit={handleSubmit}
        >
          <h2 className="m-2 text-lg font-bold text-md p-2 rounded-lg border">
            Modificar mi contraseña
          </h2>


          <div className="flex flex-col md:max-w-3xl p-4 gap-2 shadow-lg rounded-lg">
            <div className="flex flex-col gap-6 justify-evenly">

              <label>
                Contraseña actual
                <input
                  type="password"
                  name="oldPassword"
                  value={formData?.oldPassword}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </label>

              <label>
                Nueva contraseña
                <input
                  type="password"
                  name="newPassword"
                  value={formData?.newPassword}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </label>

              {/* <label>
            Repetir nueva contraseña
            <input
              type="password"
              name="newPassword"
              value={formData?.newPassword}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </label> */}
            </div>
          </div>

          <button
            type="submit"
            className="w-40 mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Enviar formulario
          </button>
        </form>
      </ div>
    </ div>
  );
};

export default CambiarPassword;
