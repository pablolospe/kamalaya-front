import { URL } from '@/config';

export const fetchSeguimientoId = async (id) => {
// console.log(id);
  const url = `${URL}/seguimiento/${id}`

  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes retornar un valor por defecto o lanzar una excepción personalizada si lo prefieres.
    return null;
  }
};