import React from 'react';

const usuarioDetalle = async (id) => {
  return fetch(`https://kamalaya.onrender.com/usuarios/${id}`, {}).then((res) =>
    res.json()
  );
};
function agregarPuntosANumero(numero) {
  return numero.toLocaleString('es-ES');
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
    <div>
      <div>
        Nombre y apellido: {u?.nombre} {u?.apellido}
      </div>
      <div>Telefono: {u?.telefono}</div>
      {u?.telefono2 && <div>Telefono alternativo: {u?.telefono2}</div>}
      <div>Email: {u?.email}</div>
      <div>
        Dirección: {u?.calle} {u?.numero}, {u?.localidad}, {u?.provincia},{' '}
        {u.pais} ({u?.codigoPostal}).
      </div>

      <div>Tiene auto: {u?.tieneAuto ? 'Si' : 'No' }</div>
      <div>Tiene experiencia en cuidados paliativos: { u?.experienciaCP === true ? 'Si' : 'No' }</div>
      <div>DNI: {agregarPuntosANumero(u?.dni)}</div>
      <div>Rol: {u?.rol}</div>
      <div>Género: {u?.genero}</div>
      <div>Fecha de nacimiento: {formatDate(u?.fechaDeNacimiento)}</div>
      <div>Ocupación: {u?.profesion_oficio_ocupacion}</div>
      <div>Fecha de alta: {u?.fechaAlta}</div>
      {u?.fechaBaja === null ? <div>Fecha de baja: {u?.fechaAlta}</div> : <div>Se encuentra activo</div>}
      <div>Teléfono de emergencia: {u?.telefonoEmergencia} ({u?.nombreContactoEmergencia})</div>

    </div>
  );
}

export default Usuario;
