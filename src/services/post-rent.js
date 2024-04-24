import { METHODS, sendApiRequest } from './send-api-request.js';

export async function postRent(id, jsonData) {
  console.log('Enviando datos de alquiler al backend:', jsonData);

  try {
    const response = await sendApiRequest(
      METHODS.POST,
      `/new-renting/${id}`,
      jsonData
    );

    // Verificar si la respuesta tiene un estado exitoso (código 2xx)
    if (response.ok) {
      const data = await response.json();
      console.log('Respuesta del backend:', data);
      return data;
    } else {
      // Si la respuesta no es exitosa, lanzar un Error con el mensaje del servidor
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud al servidor');
    }
  } catch (error) {
    console.error('Error al procesar la respuesta del servidor:', error);
    // Manejar el error de manera adecuada, como mostrar un mensaje al usuario
    throw error; // Lanzar el error para que pueda ser manejado en el componente que llama a esta función
  }
}
