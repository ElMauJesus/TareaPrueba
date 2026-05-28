import { Request, Response } from 'express';
import User from '../models/User';

//Funcion que manejara la peticion de registro cuando se envien los datos
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        //Buscamos si el email ya se encuantra en la bd
        const userExists = await User.findOne({ email });

        if (userExists) { //Si el usuario existe (true)
            return res.status(400).json({ msg: 'El correo ya se encuantra registrado'})
        }

        //Creando la instancia del nuevo usuario
        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save(); //Guardando usuario

        //Imprimimos mensaje de que todo va bien:)
        res.status(201).json({ msg: 'Usuario creado correctamente' });

    } catch (error) { //En caso de error
        console.log(error);
        return res.status(500).json({ msg: 'Ocurrio un error en el servidor'})
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { name, password} = req.body;

        const user = await User.findOne({ email });

        if(!user) { //Si el usuario no se encontro, va a entrar y retornar el mensaje
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        //Se utiliza la funcion compare de bcrypt para comparar contraseñas de la bd y la que se valla a ingresar
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) { //Si la contraseña no coincide con la que esta en la bd
            return res.status(500).json({ msg: 'La contraseña ingresada es incorrecta' });
        }

        //Generando JSON Web TOKEN (JWT)
        const token = jwt.sign( //funcion para la firma digital
            { id: user._id }, //Datos encriptados guardados en el token
            precess.env.JWT_SECRET || "firma_temporal", //Va al archivo .env a buscar la palabra secreta
            { expiresIn: '1d' } //El token expira en un día
        );

        //Respondemos con el token de acceso
        res.status(200).json({
            msg: 'Ha iniciado sesion correctamente', //mensaje de exito
            token, //Token temporal
            user: { id: user._id, name: user.name, email: user.email} //Datos de usuario
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor' });
    }
};