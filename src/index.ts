import express, { Request, Response} from 'express';

//Importando funcion para conectar con la base de datos
import { connectDB } from './config/db';

import projectRoutes from './routes/projectRoutes';

import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); //Ejecutando donfiguracion

//Creando el servidor
const app = express();

// Middlewares (intermediarios)
app.use(express.json());
app.use(cors());

app.use('/api/projects', projectRoutes);

//Conectando con la base de datos
connectDB();

//Para obtener las peticiones y enviar respuestas
app.get('/', (req: Request, res: Response) => {
    //Mostrando mensaje en la pagina
    res.send("¡El servidor esta funcionando correctamente!");
});

//Creando puerto del servidor
const PORT = process.env.PORT || 5000;

//Servidor escuchando en el puerto indicado
app.listen(PORT, () => {
    //mostrando mensaje en la consola de que esta abierto correctamente y la ruta donde se encuentra el servidor
    console.log(`[server]: Servidor corriendo en http://localhost:${PORT}`); //console.log('[server]: Servidor corriendo en http://localhost:' + PORT);
});

