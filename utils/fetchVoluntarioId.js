import { URL } from '@/config';

// export const voluntarioDetalle = async (id) => {
// console.log(id);

//   const url = `${URL}/voluntario/${id}`

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

export const voluntarioDetalle = async (id) => {
  return fetch(`${URL}/voluntarios/${id}`, {
    cache: 'no-store',
  }).then((res) => res.json());
};
