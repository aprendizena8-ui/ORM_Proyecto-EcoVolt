const express = require('express');
const sequelize = require('../Config/database');

const Usuario = require('./models/Usuario');
const Estacion = require('./models/Estacion');
const Reserva = require('./models/Reserva');
const Conector = require('./models/Conector');

// Relación M:N Usuario ↔ Conector vía Reserva
Usuario.belongsToMany(Conector, {
    through: Reserva,
    foreignKey: 'id_usuario'
});

Conector.belongsToMany(Usuario, {
    through: Reserva,
    foreignKey: 'id_conector'
});

// Relación Estación ↔ Conector
Estacion.hasMany(Conector, {
    foreignKey: 'id_estacion',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Conector.belongsTo(Estacion, {
    foreignKey: 'id_estacion',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relación Usuario ↔ Reserva
Usuario.hasMany(Reserva, {
    foreignKey: 'id_usuario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Reserva.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relación Conector ↔ Reserva (RESTRICT)
Conector.hasMany(Reserva, {
    foreignKey: 'id_conector',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Reserva.belongsTo(Conector, {
    foreignKey: 'id_conector',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function startServer() {
    try {
        console.log('Conectándose a la BD...');

        await sequelize.sync({ alter: true });

        console.log('Modelos actualizados correctamente');

        app.listen(PORT, () => {
            console.log(`Backend corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo inicializar el ecosistema:', error);
        process.exit(1);
    }
}

startServer();
