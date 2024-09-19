import DataBase from "../../database/Connection.js"
import { DataTypes } from "sequelize"

const PlaylistChannel = DataBase.define('PlaylistChannel', {
    channelPosition: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},
    {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['PlayListId', 'ChannelId'],
                name: 'playlist_channel_unique'
            }
        ]
    });

export default PlaylistChannel;