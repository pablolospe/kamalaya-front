export async function fetchVoluntarios(query) {
    const queryString = new URLSearchParams(query).toString();
    const url = `https://kamalaya-dev.fl0.io/voluntarios${
    // const url = `https://kamalaya.onrender.com/usuarios${
      queryString ? `?${queryString}` : ''
    }`;
    const response = await fetch(url, { cache: 'no-store' });
    return response.json();
  }
  