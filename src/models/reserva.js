const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Reserva = sequelize.define('Reserva', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    fecha_reserva: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },

    duracion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },

    estado: {
        type: DataTypes.ENUM(
            'pendiente',
            'activa',
            'finalizada',
            'cancelada'
        ),
        defaultValue: 'pendiente'
    }

}, {
    timestamps: true,
    tableName: 'reservas'
});

module.exports = Reserva;