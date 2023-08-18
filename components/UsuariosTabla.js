import React from 'react';
import Link from 'next/link';

const UsuariosTabla = async ({usuariosData}) => {
//    await console.log('aca '+ usuariosData[0]?.Disponibilidades[0].diaSemana);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tabla de Usuarios</h1>
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

        {usuariosData?.map((u) => (
            
            <tr>
                <td>
                <Link key={u.usuario_id} href={`/voluntarios/${u.usuario_id}`}>

                    <div key={u.usuario_id} className="text-black hover:text-violet-800">
                        {u.nombre} {u.apellido} (id:{u.usuario_id})
                    </div>
                </Link>
                </td>
                <td>
                    <div key={u.usuario_id} className="text-black text-center hover:text-violet-800">
                        {u.telefono} /{u.telefono2}
                    </div>
                </td>
                <td>
                    <div key={u.usuario_id} className="text-black text-center hover:text-violet-800">
                        {u.tieneAuto? "si":"no"}
                    </div>
                </td>
                <td>
                    <div key={u.usuario_id} className="text-black text-center hover:text-violet-800">
                        {u.expreienciaCP? "si":"no"}
                    </div>
                </td>
                <td>
                    <div key={u.usuario_id} className="text-black text-center hover:text-violet-800">
                        {u?.Disponibilidades.map(d=><span>{d.diaSemana}, {d.horaInicio}-{d.horaFin}</span>)}
                    </div>
                </td>
            </tr>
                   
      ))}
      
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosTabla;
