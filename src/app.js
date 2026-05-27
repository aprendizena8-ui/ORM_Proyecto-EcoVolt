const express = require('express');
const sequelize = require('../Config/database');

const Usuario = require('./models/Usuario');
const Estacion = require('./models/Estacion');
const Reserva = require('./models/Reserva');
const Conector = require('./models/Conector');


Usuario.hasMany(Reserva, {
    foreignKey: 'id_usuario',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Reserva.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
});



Estacion.hasMany(Reserva, {
    foreignKey: 'id_estacion',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Reserva.belongsTo(Estacion, {
    foreignKey: 'id_estacion'
});


Estacion.hasMany(Conector, {
    foreignKey: 'id_estacion',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Conector.belongsTo(Estacion, {
    foreignKey: 'id_estacion'
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