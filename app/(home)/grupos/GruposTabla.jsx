'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import BotonBorrarGrupo from '@/app/(home)/grupos/BotonBorrarGrupo';
import { convertirHora, formatearFecha, capitalizeFirstLetterOfEachWord, DiaSemanaEnum } from '@/utils/formats';
import { grupos } from '@/utils/fetchGrupos';

function GruposTabla() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [gruposData, setGruposData] = useState([]);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState({
    localidad: '',
    hobbies: '',
  });


  useEffect(() => {
    async function fetchData() {
      if (session) {
        const data = await grupos(query, token);
        setGruposData(data);
      }
    }
    fetchData();
  }, [query, session, gruposData]);

  return (
    <>
      {session?.user?.role === 'Admin' ?
      <div>
        <Link href={'/grupos/crear'} className="w-40 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Crear nuevo grupo
        </Link>
        <br/> <br/>
      </div>
        : null
      }

      <section className="flex flex-col gap-2 overflow-auto text-sm">
        <table>
          <thead>
            <tr className="bg-gray-100 row-auto">
              <th className="border p-2" >ID</th>
              <th className="border p-2 bg-green-200" >Paciente</th>
              <th className="border p-2 bg-purple-200" >Voluntario<br /> 1</th>
              <th className="border p-2 bg-purple-200" >Voluntario<br /> 2</th>
              <th className="border p-2 bg-purple-200" >Voluntario<br /> 3</th>
              <th className="border p-2 w-2" >Fecha de inicio</th>
              <th className="border p-2 w-2" >Desde las</th>
              <th className="border p-2 w-2" >Hasta las</th>
              <th className="border p-2 w-2" >Día de la semana</th>
              <th className="border p-2" >Descripción</th>
              {session?.user?.role === 'Admin' ?
                <>
                  <th className="border p-2 w-2" >Editar</th>
                  <th className="border p-2 w-2" >Borrar</th>
                </>
                : null
              }
              <th className="border p-2 w-2" >Activo</th>
            </tr>
          </thead>

          <tbody>
            {gruposData?.map((g) => (
              <tr key={g.grupo_id}
                className="text-center bg-gray-100 hover:bg-gray-200"
              >
                <td className="table-cell p-2 ">{g.grupo_id}</td>
                <td className="table-cell p-2 text-green-600">{capitalizeFirstLetterOfEachWord(`${g?.Paciente.nombre} ${g.Paciente.apellido}`)}</td>
                <td className="table-cell p-2 text-purple-600">{capitalizeFirstLetterOfEachWord(`${g?.Voluntarios[0]?.nombre} ${g.Voluntarios[0]?.apellido}`)}</td>
                <td className="table-cell p-2 text-purple-600">{g?.Voluntarios[1] ? capitalizeFirstLetterOfEachWord(`${g?.Voluntarios[1]?.nombre} ${g.Voluntarios[1]?.apellido}`) : '-'}</td>
                <td className="table-cell p-2 text-purple-600">{g?.Voluntarios[2] ? capitalizeFirstLetterOfEachWord(`${g?.Voluntarios[2]?.nombre} ${g.Voluntarios[2]?.apellido}`) : '-'}</td>

                <td className="table-cell p-2 whitespace-nowrap">{formatearFecha(g.fechaDeInicio)}</td>
                <td className="table-cell p-2">{convertirHora(g.horaInicio)}</td>
                <td className="table-cell p-2">{convertirHora(g.horaFin)}</td>
                <td className="table-cell p-2">{DiaSemanaEnum[g.diaSemana]}</td>
                <td className="table-cell p-2 text-xs">{g.descripcion}</td>

                {session?.user?.role === 'Admin' ?
                  <>
                    <td className="table-cell p-2"><Link className='p-2 rounded-full hover:bg-gray-300' href={`/grupos/${g.grupo_id}/editar`}>✏️</Link></td>
                    <td className="table-cell p-2">
                      <BotonBorrarGrupo id={g.grupo_id} />
                    </td>
                  </>
                  : null
                }
                <td className="table-cell p-2">{g.activo ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default GruposTabla;
