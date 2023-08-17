import React from 'react';
import { formatearNumero, formatearFecha } from '@/utils/formats';

const usuarioDetalle = async (id) => {
  return fetch(`https://kamalaya.onrender.com/usuarios/${id}`, {
    cache: 'no-store',
  }).then((res) => res.json());
};

async function Usuario({ params }) {
  const { id } = params;
  const u = await usuarioDetalle(id);
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="mb-2 text-lg font-semibold">
        {u?.nombre} {u?.apellido}
      </div>
      <div className="text-gray-600">
        <div>Teléfono: {u?.telefono}</div>
        {u?.telefono2 && <div>Teléfono alternativo: {u?.telefono2}</div>}
        <div>Email: {u?.email}</div>
        <div>
          Dirección: {u?.calle} {u?.numero}, {u?.localidad}, {u?.provincia}, (
          {u?.codigoPostal})
        </div>
        <div>Tiene auto: {u?.tieneAuto ? 'Sí' : 'No'}</div>
        <div>
          Experiencia en cuidados paliativos: {u?.experienciaCP ? 'Sí' : 'No'}
        </div>
        <div>DNI: {formatearNumero(u?.dni)}</div>
        <div>Rol: {u?.rol_usuario}</div>
        <div>Género: {u?.genero}</div>
        <div>Fecha de nacimiento: {formatearFecha(u?.fechaDeNacimiento)}</div>
        <div>Ocupación: {u?.profesion_oficio_ocupacion}</div>
        <div>Fecha de alta: {formatearFecha(u?.fechaAlta)}</div>
        {/* {u?.fechaBaja !== null ? (
          <div>Se encuentra activo</div>
          ) : ( */}
        <div>Fecha de baja: {formatearFecha(u?.fechaBaja)}</div>
        {/* )}
        <div> */}
        Teléfono de emergencia: {u?.telefonoEmergencia} (
        {u?.nombreContactoEmergencia})
      </div>
    </div>
    // </div>
  );
}
export default Usuario;
