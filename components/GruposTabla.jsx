'use client';
import { useEffect, useState } from 'react';
import { grupos } from '@/utils/fetchGrupos';
import Link from 'next/link';
import BotonBorrarGrupo from '@/app/(home)/grupos/BotonBorrarGrupo';

function GruposTabla() {
  const [gruposData, setGruposData] = useState([]);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState({
    localidad: '',
    hobbies: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await grupos(query);
        setGruposData(data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener los datos de los grupos:', error);
        setError('Hubo un error al obtener los datos de los grupos.');
      }
    }

    fetchData();
  }, [query]);

  // console.log(gruposData);
  return (
      <section className="flex flex-col gap-2 overflow-auto">
        <table>
          <thead>
            <tr className="bg-gray-100 row-auto">
              <th className="border p-2" >ID</th>
              <th className="border p-2 bg-green-200" >Paciente</th>
              <th className="border p-2 w-20 bg-purple-200" >Voluntario<br/> 1</th>
              <th className="border p-2 bg-purple-200" >Voluntario<br/> 2</th>
              <th className="border p-2 bg-purple-200" >Voluntario<br/> 3</th>
              <th className="border p-2" >Fecha de inicio</th>
              <th className="border p-2" >Hora de inicio</th>
              <th className="border p-2" >Hora de finalización</th>
              <th className="border p-2" >Día de la semana</th>
              <th className="border p-2" >Descripción</th>
              <th className="border p-2" >Editar</th>
              <th className="border p-2" >Borrar</th>
              <th className="border p-2" >Activo</th>
            </tr>
          </thead>

          <tbody>
            {gruposData?.map((g) => (
              <tr key={g.grupo_id} 
              className="text-center bg-gray-100 hover:bg-gray-200"
              >
                <td className="table-cell p-2 ">{g.grupo_id}</td>
                <td className="table-cell p-2 text-green-600">{g.Paciente.nombre} {g.Paciente.apellido}</td>
                <td className="table-cell p-2 text-purple-600">{g?.Voluntarios[0]?.nombre} {g.Voluntarios[0]?.apellido}</td>
                <td className="table-cell p-2 text-purple-600">{g?.Voluntarios[1]?.nombre} {g.Voluntarios[1]?.apellido}</td>
                <td className="table-cell p-2 text-purple-600">{g?.Voluntarios[2]?.nombre} {g.Voluntarios[2]?.apellido}</td>

                <td className="table-cell p-2">{g.fechaDeInicio}</td>
                <td className="table-cell p-2">{g.horaInicio}</td>
                <td className="table-cell p-2">{g.horaFin}</td>
                <td className="table-cell p-2">{g.diaSemana}</td>
                <td className="table-cell p-2">{g.descripcion}</td>
                <td className="table-cell p-2"><Link href={`/grupos/${g.grupo_id}/editar`}>✏️</Link></td>
                <td className="table-cell p-2">
                  <BotonBorrarGrupo id={g.grupo_id} />
                </td>
                <td className="table-cell p-2">{g.activo ? "Activo" : "Inactivo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    
  );
}

export default GruposTabla;
