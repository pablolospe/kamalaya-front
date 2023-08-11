import React from 'react'


const usuarios = async () => {
    return await fetch('https://kamalaya.onrender.com/usuarios', {
    }).then((res) => res.json());
  };
  
  
async function Usuario() {
const usuario = await usuarios();
  return (
    <ul>
        {
            usuario.map(u =>
                <li>u.nombre</li>
            )
        }
    </ul>
  )
}

export default Usuario