import { URL } from "@/config";

export const voluntarios = async (query, token) => {
  const queryString = new URLSearchParams();

  for (const key in query) {
    if (Array.isArray(query[key])) {
      query[key].forEach((value) => {
        queryString.append(`${key}[]`, value);
      });
    } else {
      if (query[key] !== '') {
        queryString.append(key, query[key]);
      }
    }
  }

  const url = `${URL}/voluntarios${queryString.toString() ? `?${queryString.toString()}` : ''}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json', // Ajusta esto como necesites
        'Authorization': 'Bearer ' + token, // Asumiendo que el rol es un token
        // Añade aquí cualquier otro header que necesites
      },
      cache: 'no-store',
    });

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
