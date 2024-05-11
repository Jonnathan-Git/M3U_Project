import DataBase from "../../database/Connection.js";
import { DataTypes } from "sequelize";

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
    },
    hint: {
        type: DataTypes.STRING(512),
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: false
});

export default User;    
