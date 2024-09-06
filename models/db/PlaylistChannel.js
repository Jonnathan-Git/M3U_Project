import DataBase from "../../database/Connection.js"
import { DataTypes } from "sequelize"

const PlaylistChannel = DataBase.define('PlaylistChannel', {
    channelPosition: {
        type: DataTypes.INTEGER
    }
},
    {
        timestamps: false
    });

export default PlaylistChannel;