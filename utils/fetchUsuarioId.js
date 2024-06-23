import { URL } from '@/config';

export const fetchUsuarioId = async (id, token) => {
  
  try {
    const response = await fetch(`${URL}/users/${id}`, {
      method: 'GET', 
      headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
          },
      { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    // Puedes retornar un valor por defecto o lanzar una excepción personalizada si lo prefieres.
    return null;
  }
};


// import { URL } from '@/config';

// export const fetchUsuarioId = async (id, token) => {

//   const url = `${URL}/users/${id}`;

//   try {
//     const response = await fetch(url, { cache: 'no-store' });
//     if (!response.ok) {
//       throw new Error(`Error en la solicitud: ${response.status}`);
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error en la solicitud:', error);
//     // Puedes retornar un valor por defecto o lanzar una excepción personalizada si lo prefieres.
//     return null;
//   }
// };