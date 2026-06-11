const Usuario = require('./models/Usuario');

async function pruebaSoftDelete() {
    try {
        const usuario = await Usuario.findOne({ where: { correo: 'soft@test.com' } });
        if (usuario) {
            await usuario.destroy(); // activa paranoid y el hook
            console.log("Usuario eliminado con soft delete, reservas canceladas.");
        } else {
            console.log("No se encontró el usuario.");
        }
    } catch (error) {
        console.error("Error en la prueba:", error);
    }
}

pruebaSoftDelete();
