'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LuUser, LuEdit } from 'react-icons/lu';
import style from './page.module.css';
import { useSession } from 'next-auth/react';
import { usuarios } from '@/utils/fetchUsuarios';

function Ususarios() {
  const { data: session } = useSession();
  const [usuariosData, setUsuariosData] = useState([]);
  const [query, setQuery] = useState({
    nombre: '',
    apellido: '',
  });

  useEffect(() => {
    async function fetchData() {
      if (session) {
        const usuariosData = await usuarios(query, session.user.accessToken);
        setUsuariosData(usuariosData);
      }
    }
    fetchData();
  }, [query, session]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Link
          href={`/usuarios/generar`}
          className="p-2 w-56 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600"
        >
          Generar nuevo usuario
        </Link>

        <Link
          href={`/usuarios/password`}
          className="p-2 w-56 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600"
        >
          Modificar mi contraseña
        </Link>
        {/* <h1 className="text-center font-semibold text-xl">Usuarios</h1> */}
      </div>
      
      <table>
        <thead>
          <tr className="bg-gray-100 row-auto">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="hidden md:table-cell border p-2">Email</th>
            <th className="hidden md:table-cell border p-2">Rol</th>
            <th className="hidden md:table-cell border p-2">Editar</th>
          </tr>
        </thead>

        <tbody>
          {usuariosData?.map((v) => (
            <tr
              key={v.user_id}
              className="text-center bg-gray-100 hover:bg-gray-200"
            >
              <td className="hidden md:table-cell">
                <div>{v.user_id}</div>
              </td>
              <td>
                {/* <Link href={`/pacientes/${v.paciente_id}`}> */}
                <div className="flex flex-row items-center ml-3 my-1 text-left">
                  <div className="bg-gray-300 cursor-pointer p-3 mx-2 gap-3 rounded-lg flex flex-row">
                    <LuUser size={20} />
                  </div>
                  {v.nombre} {v.apellido}
                </div>
                {/* </Link> */}
              </td>

              <td className="hidden md:table-cell">
                <div>{v.email}</div>
              </td>

              <td className="hidden md:table-cell">
                <div>{v.role}</div>
              </td>

              <td className="hidden md:table-cell ">
                <Link href={`/usuarios/modificar/${v.user_id}`}>
                  <div className="bg-gray-300 cursor-pointer p-3 gap-3 w-11 rounded-lg">
                    <LuEdit size={20} />
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ususarios;
