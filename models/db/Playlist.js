import DataBase from "../../database/Connection.js";
import Channel from "./Channel.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const PlayList = DataBase.define("PlayList", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: 'playlists',
    timestamps: false
});

export default PlayList;