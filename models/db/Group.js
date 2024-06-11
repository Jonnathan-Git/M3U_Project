import DataBase from "../../database/Connection.js";
import { DataTypes } from "sequelize";

const Group = DataBase.define("Group", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        timestamps: false,
    }
);

export default Group;