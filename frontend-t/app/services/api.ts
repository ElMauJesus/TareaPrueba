//Direccion de el servidor 
const BASE_URL = 'http://localhost:5000/api';

//Funcion para registrar usuario
export const registrarUsuario = async (datosUsuario: object) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST', //Método de envío
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosUsuario),
  });

  const data = await response.json();
  return { ok: response.ok, data };
};

//funcoin para iniciar sesion
export const iniciarSesion = async (credenciales: object) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST', //Método de envío
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credenciales),
  });

  const data = await response.json();
  return { ok: response.ok, data };
};

//Funcion para crear un nuevo proyecto
export const crearProyecto = async (datosProyecto: object, token: string | null) => {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: 'POST', //Método de envio
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` //Envía el token en la cabecera para identificarte ante el servidor
    },
    body: JSON.stringify(datosProyecto), // Envía las propiedades del proyecto
  });

  const data = await response.json();
  return { ok: response.ok, data };
};

//Funcion para obtener los proyectos
export const obtenerProyectos = async () => {
  // 🚀 Hace una petición GET a tu ruta base de proyectos
  const response = await fetch(`${BASE_URL}/projects`, {
    method: 'GET', // Método para solicitar información
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json(); // 📥 Traduce el arreglo de proyectos que envía tu projectController
  return { ok: response.ok, data }; // Retorna el éxito y la lista de proyectos
};