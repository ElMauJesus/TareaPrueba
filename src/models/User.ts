//Schema: Para definir reglas. model: para consultar con la BD. Document
import { Schema, model, Document } from 'mongoose';

//herramienta para encriptar
import bcrypt from 'bcryptjs';

//Creando una interfaz de usuario (Clase)
export interface IUser extends Document {
    //Atributos
    name: string; 
    email: string;
    password: string;
}

//Creando esquema de Mongoose
const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //Para evitar correos duplicados
    password: { type: String, required: true }
}, {
    timestamps: true //Crea automaticamente las fechas de creacion y actualizacion
});

//Intermediario para encriptar la contraseña antes de guardar
UserSchema.pre<IUser>('save', async function () {
    //Si el usuario esta haciendo algo que no tenga que ver con la contraseña, salta la encriptacion
    if (!this.isModified('password')) return;

    try {
        //Generando un salt, patrón aleatorio de seguridad de 10 niveles de complejidad
        const salt = await bcrypt.genSalt(10);
        //mezclando contraseña con el patrón aleatorio (ya no es texto plano, si no código encriptado)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error: any) {
        throw error;
    }
});

export default model<IUser>('User', UserSchema)