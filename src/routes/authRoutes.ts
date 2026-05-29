import { Router } from 'express';
import { register, login } from '../controllers/authController'; //Importando funciones del controlador

//Iniciamos enrutador
const router = Router();

router.post('/register', register); //Ruta para el registro

router.post('/login', login); //ruta para el login

export default router;