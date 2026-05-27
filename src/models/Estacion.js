const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Estacion = sequelize.define('Estacion', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    ubicacion: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    tipo_conector: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    precioKw: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 100,
            max: 5000
        }
    },

    latitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
        validate: {
            min: -4,
            max: 13
        }
    },

    longitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
        validate: {
            min: -79,
            max: -66
        }
    }

}, {
    timestamps: true,
    tableName: 'estaciones'
});

module.exports = Estacion;