import DataBase from "../../database/Connection.js";
import { DataTypes } from "sequelize";

const PlayList = DataBase.define("PlayList", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    index_position: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    tableName: 'playlists',
    timestamps: false
});

export default PlayList;