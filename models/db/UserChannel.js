import { DataTypes } from "sequelize";
import DataBase from "../../database/Connection.js";

const UserChannel = DataBase.define('UserChannel',{
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

export default UserChannel;