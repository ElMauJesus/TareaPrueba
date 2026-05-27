//Herramienta especializada para gestionar direcciones URL
import { Router } from 'express';
//Importando funciones de el controlador
import { getAllProjects, createProject } from '../controllers/projectController';

//Iniciamos nuestro enrutador y lo guardamos en una constante
const router = Router();

//Para cuando un cliente pide los datos
router.get('/', getAllProjects);

//Para cuando el cliente este enviando los datos desde un formulario
router.post('/', createProject);

//Exportamos el mapa de rutas por defecto
export default router;