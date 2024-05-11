import DataBase from "../../database/Connection.js";
import { DataTypes } from "sequelize";

const ChannelPlayList = DataBase.define("Channel_PlayList", {
    ChannelId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    PlayListId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
}, {
    tableName: 'Channel_PlayList',
    timestamps: false
});

export default ChannelPlayList;