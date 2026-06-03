const {DataTypes} = require('sequelize');
const sequelize = require('../../Config/database');
const Reserva = require('./Reserva'); // Importar Reserva para usarla en el hook

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
        allowNull: true,
        validate: {
            isNumeric: true,
            len: [10, 10] // Teléfono de 10 dígitos
        }
    },
    contraseña: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [8, 100] // mínimo 8 caracteres
        }
    },
    ciudad_residencia: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
        timestamps: true,
        paranoid: true, // Crear el campo deleted_at
        tableName: 'usuarios' // En plural y en minusculas
    });

// Hook para cancelar reservas activas antes del soft delete
Usuario.addHook('beforeDestroy', async (usuario, options) => {
    await Reserva.update(
        { estado: 'cancelada' },
        { where: { id_usuario: usuario.id } }
    );
});

    module.exports = Usuario;