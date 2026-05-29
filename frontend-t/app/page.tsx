"use client";

import Link from 'next/link';
import styles from './inicio.module.css'; // 🎨 Importamos sus propios estilos especializados

export default function InicioPortalPage() {
  return (
    <div className={styles.contenedorPortal}>
      <div className={styles.tarjetaBienvenida}>
        <h1 className={styles.tituloPrincipal}>Gestor de Proyectos</h1>
        <p className={styles.descripcion}>
          Bienvenido. inicie sesion o registrese.
        </p>

        <div className={styles.bloqueAcciones}>
          {/* 🔑 Botón para ir al Inicio de Sesión */}
          <Link href="/login" className={styles.botonLogin}>
            Iniciar Sesión
          </Link>

          {/* 📝 Botón para ir al Registro */}
          <Link href="/register" className={styles.botonRegistro}>
            Crear una Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};