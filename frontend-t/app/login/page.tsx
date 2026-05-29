"use client";

//herramienta para actualizar estado
import { useState } from 'react';

import styles from '../auth.module.css';

export default function RegisterPage() {
  //Estados del formulario para guardar la informacion
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  //Funcion al momento de enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    //colocamos la dereccion para mandar el registro a la bd
    const url = 'http://localhost:5000/api/auth/login';

    try {
      //Llamamos a la funcoin fetch
      const response = await fetch(url, {
        method: 'POST', //Metodo para enviar datos
        headers: {'Content-Type': 'application/json'}, //le decimos que los datos que vamos a enviar son formato json
        body: JSON.stringify({ name, password }), //convertimos variables a texto plano con JSON.stringify
      });

      const data = await response.json(); //Convirtiendo respuesta del servidor a texto JSON

      if(!response.ok) {
        setError(data.message || 'Error al iniciar sesion');
        return;
      }

      console.log('Respuesta del servidor: ', data); //Imprimiendo respuesta

      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('¡Token guardado exitosamente en el navegador!');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
    console.log({ name, password });
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