//Schema: Para definir reglas. model: para consultar con la BD. Document
import { Schema, model, Document } from 'mongoose';

//Creando una interfaz de ts (Clase)
export interface IProject extends Document {
    //Atributos
    name: string; 
    description: string;
    createdAt: Date;
}

//Definimos molde (Objeto)
const ProjectSchema = new Schema<IProject>({
    name: {
        type: String,
        required: [true, 'Nombre de proyecto es obligatorio'], //Valida los datos, en caso de no colocar nombre rebota la peticion y manda el mensaje
        trim: true //Limpia o elimina los espacios en blanco
    },
    description: {
        type: String,
        required: [true, 'Descripcion es obligatorio'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now //Registra la fecha en que se creo el proyecto
    }
});

//Aquí estamos compilando el molde
export const Project = model<IProject>('Project', ProjectSchema); 