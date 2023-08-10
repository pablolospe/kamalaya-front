import React from 'react';

const usuarioDetalle = async (id) => {
  return fetch(`https://kamalaya.onrender.com/usuarios/${id}`, {}).then((res) =>
    res.json()
  );
};
function agregarPuntosANumero(numero) {
  return numero.toLocaleString('es-ES');
}

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
      <div>DNI: {agregarPuntosANumero(u?.dni)}</div>
      <div>Rol: {u?.rol}</div>
      <div></div>
      <br />
      <hr />
      
      
      "codigoPostal": "1625", "hashPassword": null, "rol_usuario": null,
      "telefonoEmergencia": "66666666", "nombreContactoEmergencia": "Roberto
      Enfermero", "genero": "M", "profesion_oficio_ocupacion": "Doctor,
      especialidad: cardiología", "hobbies_habilidades": "electricista",
      "fechaDeNacimiento": "1984-11-07", "fechaAlta": "2020-06-21", "fechaBaja":
      "2025-06-21", "tieneAuto": true, "experienciaCP": true, "createdAt":
      "2023-08-10T16:43:01.161Z", "updatedAt": "2023-08-10T16:43:01.161Z"
    </div>
  );
}

export default Usuario;
