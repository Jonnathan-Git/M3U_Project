import { DataTypes } from "sequelize";
import DataBase from "../../database/Connection.js";
import User from "./User.js";
import Channel from "./Channel.js";


const UserChannel = DataBase.define('UserChannel', 
    {
        UserId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false
        },
        ChannelId: {
            type: DataTypes.UUID,
            references: {
                model: Channel,
                key: 'id'
            },
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

export default UserChannel;