async function probarRegistro() {
    const usuarioPrueba = {
        name: "Jesus Test",
        email: "jesus_test@correo.com",
        password: "Password123!"
    };

    try {
        console.log("⏳ Enviando petición de registro...");
        const respuesta = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioPrueba)
        });

        const datos = await respuesta.json();
        console.log(`STATUS HTTP: ${respuesta.status}`);
        console.log("RESPUESTA DEL SERVIDOR:", datos);

    } catch (error) {
        console.error("❌ Error al conectar con el servidor:", error);
    }
}

probarRegistro();