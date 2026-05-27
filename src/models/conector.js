const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Conector = sequelize.define('Conector', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    codigo_fisico: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    esta_bueno: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    timestamps: true,
    tableName: 'conectores'
});

module.exports = Conector;