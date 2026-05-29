"use client";

//herramienta para actualizar estado
import { useState } from 'react';

import styles from '../auth.module.css';

export default function RegisterPage() {
  //Estados del formulario para guardar la informacion
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  //Funcion al momento de enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    //colocamos la dereccion para mandar el registro a la bd
    const url = 'http://localhost:5000/api/auth/register';

    try {
      //Llamamos a la funcoin fetch
      const response = await fetch(url, {
        method: 'POST', //Metodo para enviar datos
        headers: {'Content-Type': 'application/json'}, //le decimos que los datos que vamos a enviar son formato json
        body: JSON.stringify({ name, email, password }), //convertimos variables a texto plano con JSON.stringify
      });

      const data = await response.json(); //Convirtiendo respuesta del servidor a texto JSON

      if(!response.ok) {
        setError(data.message || 'Error al registrar el usuario');
        return;
      }

      console.log('Respuesta del servidor: ', data); //Imprimiendo respuesta
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
    console.log({ name, email, password });
  };

  return (
    <div className={styles.contenedorPrincipal}>
      <h1 className={styles.titulo}>Crear Cuenta</h1>

      {error && <p className={styles.mensajeError} style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.formulario}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className={styles.cajaTexto} />
        <input type="emil" placeholder="Correo Electronico" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.cajaTexto} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.cajaTexto} />

        <button className={styles.boton} type="submit" >Registrarse</button>
      </form>
    </div>
  );
}