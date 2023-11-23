export const formatearNumero = (numero) => {
  return numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatearNumeroAHora(hora) {
  if (typeof hora !== 'string' || isNaN(hora) ) {
    return 'Formato inválido';
  }

  const numeroComoCadena = hora.toString();
  if (numeroComoCadena.length !== 4) {
    return 'Formato inválido';
  }

  const horas = numeroComoCadena.substring(0, 2);
  const minutos = numeroComoCadena.substring(2, 4);

  return `${horas}:${minutos}`;
}

export const formatearFecha = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

export function calcularEdad(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}


export function fechaActualEntreFechas(fechaInicioStr, fechaFinStr) {
  const fechaActual = new Date(); // Obtén la fecha actual
  const fechaActualStr = fechaActual.toISOString().split('T')[0];

  // Convierte las cadenas de fecha en objetos Date
  const fechaInicio = new Date(fechaInicioStr);
  const fechaFin = new Date(fechaFinStr);

  // Compara la fecha actual con las fechas de inicio y fin
  return fechaActualStr >= fechaInicio && fechaActualStr <= fechaFin ? 'Está de vacaciones' : 'No está de vacaciones'
}

export function formatearNumeroTelefono(numero) {
  if (typeof(numero)=='string'){

    // Eliminar cualquier carácter que no sea un dígito
    const numeroLimpio = numero.replace(/\D/g, '');
    
    // Obtener la longitud del número
    const longitud = numeroLimpio.length;

  // Aplicar el formato (x-xxxx-xxxx)
  return `${numeroLimpio.slice(0, longitud-8)} ${numeroLimpio.slice(longitud-8, longitud - 4)}-${numeroLimpio.slice(longitud - 4)}`;
} else{
  return numero
}
}

export const DiaSemanaEnum = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
  domingo: 'Domingo',
};
