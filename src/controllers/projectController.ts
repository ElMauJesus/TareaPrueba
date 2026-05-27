import { Request, Response } from 'express'; //importando herramienta para manejar peticiones y respuestas
import { Project } from '../models/Project';

//Creamos una funcion asincrona para obtener todos los proyectos
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        //Guardamos todos los proyectos que se encuentren en la constante projects
        const projects = await Project.find();
        //Mandamos esa informacion al usuario en formato json
        res.json(projects);
    } catch (error) {
        //Error 500 (Error interno del servidor). Por si la bd se desconecta
        res.status(500).json({ message: 'Error al obtener los proyectos' });
    }
};

// Creando funcion para crear y guardar proyectos
export const createProject = async (req: Request, res: Response) => {
    try {
        //Guardamos nombre y descripcion del usuario dentro del cuerpo de la peticion
        const { name, description } = req.body;

        //procedemos a crear un nuevo proyecto
        const newProject = new Project({
            name,
            description
        });

        //Esperamos a que se termine de crear el proyecto para guardarlo en la bd
        await newProject.save();

        //Si todo salió bien, colocamos el estatus 201 (Creado con exito)
        res.status(201).json({
            //imprimiendo mensaje de que todo salio bien junto a su proyecto
            message: 'Nuevo proyecto creado exitosamente',
            project: newProject
        });
    } catch (error: any) { //Error si el usuario mando el molde vacio
        //Respondemos con un estatus 400, que la peticion fue incorrecta
        res.status(400).json({
            message: 'Error al crear el proyecto',
            error: error.message //Error configurado en el molde
        });
    }
};