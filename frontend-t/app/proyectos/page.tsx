'use client';

import { useEffect, useState } from 'react'; //Herramienta para manejar los datos de la memoria
import { useRouter } from 'next/navigation'; //Enrutador para redirigir

import styles from './proyectos.module.css';

import { crearProyecto, obtenerProyectos } from '../services/api';

//Interfaz proyectos
interface TarjetaProyecto {
  _id: string;
  name: string;
  description: string;
}

export default function ProyectosPage() {
  const router = useRouter(); // 🕹️ Inicializa la redirección
  
  const [name, setName] = useState(''); //Guarda el nombre del usuario logueado para saludarlo
  const [vista, setVista] = useState<'mostrar' | 'crear'>('mostrar');
  
  const [proyectoName, setProyectoName] = useState(''); //Guarda el nombre del nuevo proyecto
  const [description, setDescription] = useState('');   //Guarda la descripción del nuevo proyecto

  const [listaProyectos, setListaProyectos] = useState<TarjetaProyecto[]>([]); //Lista de proyectos

  //funcion de seguridad
  useEffect(() => {
    const token = localStorage.getItem('token'); // guardando token
    const usuarioGuardado = localStorage.getItem('user'); // guardando usuario

    if (!token) { //Si el token no inicio sesion
      router.push('/login'); //Redirige a el login
    } else if (usuarioGuardado) { //Si el usuario existe 
      const userObj = JSON.parse(usuarioGuardado);
      
      setName(userObj.name || 'Usuario'); //guardando el campo name en la memoria de la pagina
    }

    cargarProyectosDesdeBD();
  }, [router]);

  const cargarProyectosDesdeBD = async () => {
    try {
      const { ok, data } = await obtenerProyectos();
      if (ok) {
        setListaProyectos(data); // Guardamos el arreglo de proyectos en el estado
      } else {
        console.error('No se pudieron obtener los proyectos');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  //Funcion para cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem('token'); //borra el token del navegador
    localStorage.removeItem('user');  // borra datos del usuario
    router.push('/login');            // Lo redirige al login
  };

  //Funcion para crear proyecto
  const handleCrearProyecto = async (e: React.FormEvent) => {
    e.preventDefault(); //Detiene la recarga automática de la página
    try {
      const token = localStorage.getItem('token'); //Guardando token
      
      const { ok, data } = await crearProyecto({ name: proyectoName, description }, token);

      if (ok) { //Si la respuesta esta todo bien
        alert(data.message || 'Nuevo proyecto creado correctamente');
        setProyectoName(''); //Limpia la caja
        setDescription(''); 
        setVista('mostrar'); //Muestra la vista de proyectos
      } else {
        alert('Error: ' + data.message); //Muestra un mensaje de error
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un fallo de conexión con el servidor backend');
    }
  };

  return (
    <div className={styles.contenedorPrincipal}>
      
      <header className={styles.encabezadoProyectos}>
        <h1 className={styles.saludoUsuario}>Hola, bienvenido <span className={styles.resaltado}>{name}</span></h1>
        <button onClick={handleLogout} className={styles.botonSalir}>
          Salir
        </button>
      </header>

      <div className={styles.formulario}>
        
        <nav className={styles.barraNavegacion}>
          <button 
            onClick={() => setVista('mostrar')}
            className={`${styles.botonPestaña} ${vista === 'mostrar' ? styles.activo : ''}`}
          >
            Mostrar Proyectos
          </button>
          <button 
            onClick={() => setVista('crear')}
            className={`${styles.botonPestaña} ${vista === 'crear' ? styles.activo : ''}`}
          >
            Crear Proyecto
          </button>
        </nav>

        {/* 📋 SECCIÓN DINÁMICA 1: MOSTRAR PROYECTOS */}
        {vista === 'mostrar' ? (
          <div className={styles.seccionLista}>
            <h3 className={styles.subtituloSeccion}>Mis Proyectos Activos</h3>
            
            {listaProyectos.length === 0 ? (
              <p className={styles.textoVacio}>No tienes ningún proyecto registrado aún.</p>
            ) : (
              <div className={styles.contenedorGrid}>
                {listaProyectos.map((proyecto) => (
                  <div key={proyecto._id} className={styles.tarjetaProyecto}>
                    <h4 className={styles.tituloProyectoCard}>{proyecto.name}</h4>
                    <p className={styles.descripcionProyectoCard}>{proyecto.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* 📝 SECCIÓN DINÁMICA 2: CREAR PROYECTO */
          <form onSubmit={handleCrearProyecto} className={styles.bloqueFormulario}>
            <h3 className={styles.subtituloSeccion}>Crear Nuevo Proyecto</h3>
            
            <div className={styles.grupoCampo}>
              <label className={styles.etiqueta}>Nombre del Proyecto</label>
              <input 
                type="text" 
                placeholder="Ej. Mi Marketplace B2B" 
                value={proyectoName}
                onChange={(e) => setProyectoName(e.target.value)}
                required
                className={styles.cajaTexto}
              />
            </div>
            
            <div className={styles.grupoCampo}>
              <label className={styles.etiqueta}>Descripción del Proyecto</label>
              <textarea 
                placeholder="Escribe los detalles aquí..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className={styles.cajaAreaTexto}
                rows={4}
              />
            </div>
            
            <button type="submit" className={styles.botonGuardar}>Guardar Proyecto</button>
          </form>
        )}

      </div>
    </div>
  );
}