const {DataTypes} = require('sequelize');
const sequelize = require('../../Config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombreCompleto: {
        type: DataTypes.STRING(100),
        allowNull: false 
    },
    correo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Valida el formato antes de guardar
        }
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    }}, {
        timestamps: true,
        paranoid: true, // Crear el campo deleted_at
        tableName: 'usuarios' // En plural y en minusculas
    });

    module.exports = Usuario;