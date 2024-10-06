import DataBase from "../../database/Connection.js";
import { DataTypes } from "sequelize";
//Agregar el campo public
//este campo es para saber si el usuario es publico o no
//si es publico permitira que otros usuarios puedan ver sus canales 
//si es privado solo el usuario podra ver sus canales
const User = DataBase.define("Users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: false
});

export default User;    
