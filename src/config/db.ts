//importamos la herramienta para interactuar con la base de datos
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//Creando e importando funcion para conectar con la base de datos
export const connectDB = async () => { //async para que la aplicacion no se congele
    //Tipos de contidionales
    try {
        //Creamos la direccion de la base de datos
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tarea_prueba';

        //Esperando a que cargue la base de datos
        await mongoose.connect(mongoURI, {
            tlsAllowInvalidCertificates: true //Para validar la certificacion y quitar restricciones
        } as mongoose.ConnectOptions);

        //Si todo va bien muestra un mensaje de que la conexion fue exitosa
        console.log('[database]: Conexion exitosa a MongoDB');
    } catch (error) { //En caso de que de error:
        //Muestra un mensaje de que dio error
        console.log('[database]: Error al conectar a MongoDB', error);
        //Cerrando el servidor completamente
        process.exit(1);
    }
};