'use client';

import { URL } from '@/config';
import { useEffect, useState } from 'react';
import { grupos } from '@/utils/fetchGrupos';

function GruposTabla() {
  const [gruposData, setGruposData] = useState([]);

  const [query, setQuery] = useState({
    localidad: '',
    hobbies: '',
  });

  useEffect(() => {
    async function fetchData() {
      // if (session) {
      const gruposData = await grupos(query);
      
      setGruposData(gruposData);
      // }
    }
    fetchData();
  }, [query]);

  console.log(gruposData);


  return (
      <section className="flex flex-col gap-2 overflow-auto">
        <table>
          <thead>
            <tr className="bg-gray-100 row-auto">
              <th className="border p-2" >ID</th>
              <th className="border p-2" >Paciente</th>
              <th className="border p-2" >Voluntario 1</th>
              <th className="border p-2" >Voluntario 2</th>
              <th className="border p-2" >Voluntario 3</th>
              <th className="border p-2" >Fecha de inicio</th>
              <th className="border p-2" >Hora de inicio</th>
              <th className="border p-2" >Hora de finalización</th>
              <th className="border p-2" >Día de la semana</th>
              <th className="border p-2" >Descripción</th>
              <th className="border p-2" >Borrar</th>
            </tr>
          </thead>

          <tbody>
            {gruposData?.map((g) => (
              <tr key={g.grupo_id} 
              className="text-center bg-gray-100 hover:bg-gray-200"
              >
                <td className="table-cell p-2">{g.grupo_id}</td>
                <td className="table-cell p-2">{g.Paciente.nombre} {g.Paciente.apellido}</td>
                <td className="table-cell p-2">{g?.Voluntarios[0]?.nombre} {g.Voluntarios[0]?.apellido}</td>
                <td className="table-cell p-2">{g?.Voluntarios[1]?.nombre} {g.Voluntarios[1]?.apellido}</td>
                <td className="table-cell p-2">{g?.Voluntarios[2]?.nombre} {g.Voluntarios[2]?.apellido}</td>
                
                <td className="table-cell p-2">{g.fechaDeInicio}</td>
                <td className="table-cell p-2">{g.horaInicio}</td>
                <td className="table-cell p-2">{g.horaFin}</td>
                <td className="table-cell p-2">{g.diaSemana}</td>
                <td className="table-cell p-2">{g.descripcion}</td>
                <td className="table-cell p-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    
  );
}

export default GruposTabla;
