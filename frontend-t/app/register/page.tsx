"use client";

//herramienta para actualizar estado
import { useState } from 'react';

import styles from '../auth.module.css';
import { registrarUsuario } from '../services/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //Funcion al momento de enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { ok, data } = await registrarUsuario({ name, email, password });

      if(!ok) {
        setError(data.msg || 'Error al registrar el usuario');
        return;
      }

      console.log('Respuesta del servidor: ', data); //Imprimiendo respuesta
      alert('¡Usuario creado correctamente!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
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