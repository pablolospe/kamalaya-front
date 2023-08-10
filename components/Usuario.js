import React from 'react'


const usuarios = async () => {
    return fetch('https://kamalaya.onrender.com/usuarios', {
    }).then((res) => res.json());
  };
  
  
async function Usuario() {
const usuario = await usuarios();
  return (
    <ul>
        {
            data.map(u =>
                <li>u.nombre</li>
            )
        }
    </ul>
  )
}

export default Usuario