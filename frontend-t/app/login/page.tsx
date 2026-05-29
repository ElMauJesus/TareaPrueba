"use client";

//herramienta para actualizar estado
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from '../auth.module.css';
import { iniciarSesion } from '../services/api';

export default function RegisterPage() {
  const router = useRouter(); //Iniciamos enrutador
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //Funcion al momento de enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { ok, data } = await iniciarSesion({ name, password }); //Llamamos a la funcion

      if(!ok) {
        setError(data.msg || 'Error al iniciar sesion');
        return;
      }

      console.log('Respuesta del servidor: ', data); //Imprimiendo respuesta

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('¡Token Y datos de usuario guardados correctamente en el navegador!');

        router.push('/proyectos'); //redirigimos a la pagina de proyectos
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className={styles.contenedorPrincipal}>
      <h1 className={styles.titulo}>Iniciar Sesion</h1>

      {error && <p className={styles.mensajeError} style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.formulario}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className={styles.cajaTexto} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.cajaTexto} />

        <button className={styles.boton} type="submit">Ingresar</button>
      </form>
    </div>
  );
}