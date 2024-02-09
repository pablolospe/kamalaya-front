import React from 'react';
import Link from 'next/link';

const VoluntariosTabla = async ({voluntariosData}) => {
//    await console.log('aca '+ voluntariosData[0]?.Disponibilidades[0].diaSemana);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tabla de Voluntarios</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Teléfono</th>
            <th className="border p-2">Tiene auto</th>
            <th className="border p-2">Tiene experiencia</th>
            <th className="border p-2">Disponibilidad</th>
          </tr>
        </thead>
        
        <tbody>

        {voluntariosData?.map((v) => (
            
            <tr>
                <td>
                <Link key={v.voluntario_id} href={`/voluntarios/${v.voluntario_id}`}>

                    <div key={v.voluntario_id} className="text-black hover:text-violet-800">
                        {v.nombre} {v.apellido} (id:{v.voluntario_id})
                    </div>
                </Link>
                </td>
                <td>
                    <div key={v.voluntario_id} className="text-black text-center hover:text-violet-800">
                        {v.telefono} /{v.telefono2}
                    </div>
                </td>
                <td>
                    <div key={v.voluntario_id} className="text-black text-center hover:text-violet-800">
                        {v.tieneAuto? "si":"no"}
                    </div>
                </td>
                <td>
                    <div key={v.voluntario_id} className="text-black text-center hover:text-violet-800">
                        {v.expreienciaCP? "si":"no"}
                    </div>
                </td>
                <td>
                    <div key={v.voluntario_id} className="text-black text-center hover:text-violet-800">
                        {v?.Disponibilidades.map(d=><span>{d.diaSemana}, {d.horaInicio}-{d.horaFin}</span>)}
                    </div>
                </td>
            </tr>
                   
      ))}
      
        </tbody>
      </table>
    </div>
  );
};

export default VoluntariosTabla;
