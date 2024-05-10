import DataBase from "../../database/Connection.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import PlayList from "./PlayList.js";


const Channel = DataBase.define("Channels", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    header: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    tvg_id: {
        type: DataTypes.STRING(128),
        allowNull: true
    }
    ,
    tvg_chno: {
        type: DataTypes.STRING(32),
        allowNull: true
    },
    tvg_logo: {
        type: DataTypes.STRING(128),
        allowNull: true
    },
    group_title: {
        type: DataTypes.STRING(32),
        allowNull: true
    },
    meta_data: {
        type: DataTypes.STRING(512),
        allowNull: true
    }
},{
    tableName: 'channels',
    timestamps: false
});

export default Channel;