import DataBase from "../../database/Connection.js"
import PlayList from "./Playlist.js";
import Channel from "./Channel.js";
import { DataTypes } from "sequelize"

const PlaylistChannel = DataBase.define('PlaylistChannel', {
    PlayListId: {
        type: DataTypes.UUID,
        references: {
            model: PlayList,
            key: 'id'
        }
    },
    ChannelId: {
        type: DataTypes.UUID,
        references: {
            model: Channel,
            key: 'id'
        }
    },
    position: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},
    {
        timestamps: false,
        tableName: 'PlaylistChannel',
    });

export default PlaylistChannel;