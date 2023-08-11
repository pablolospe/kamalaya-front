import React from 'react';

const usuarioDetalle = async (id) => {
  return fetch(`https://kamalaya.onrender.com/usuarios/${id}`, {}).then((res) =>
    res.json()
  );
};
function formatearNumero(numero) {
  return numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
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
          Dirección: {u?.calle} {u?.numero}, {u?.localidad}, {u?.provincia}, ({u?.codigoPostal})
        </div>
        <div>Tiene auto: {u?.tieneAuto ? 'Sí' : 'No'}</div>
        <div>Experiencia en cuidados paliativos: {u?.experienciaCP ? 'Sí' : 'No'}</div>
        <div>DNI: {formatearNumero(u?.dni)}</div>
        <div>Rol: {u?.rol_usuario}</div>
        <div>Género: {u?.genero}</div>
        <div>Fecha de nacimiento: {formatDate(u?.fechaDeNacimiento)}</div>
        <div>Ocupación: {u?.profesion_oficio_ocupacion}</div>
        <div>Fecha de alta: {u?.fechaAlta}</div>
        {u?.fechaBaja !== null ? (
          <div>Fecha de baja: {u?.fechaBaja}</div>
        ) : (
          <div>Se encuentra activo</div>
        )}
        <div>
          Teléfono de emergencia: {u?.telefonoEmergencia} ({u?.nombreContactoEmergencia})
        </div>
      </div>
    </div>
  );
}
export default Usuario;
