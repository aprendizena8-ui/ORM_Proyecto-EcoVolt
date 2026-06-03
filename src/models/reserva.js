const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Reserva = sequelize.define('Reserva', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    id_usuario: {
        type: DataTypes.UUID,
        allowNull: false
    },

    id_conector: {
        type: DataTypes.UUID,
        allowNull: false
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
    },

    total_pagar: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    }

}, {
    timestamps: true,
    tableName: 'reservas'
});

module.exports = Reserva;