import DataBase from "../../database/Connection.js";
import Group from "../../models/db/Group.js";
import { QueryTypes } from 'sequelize';

export async function updateChannelsByGroup(defaultGroup, deleteGroup) {
    await DataBase.query('UPDATE channels SET GroupId = ? Where GroupId = ?', {
        replacements: [defaultGroup, deleteGroup],
        type: QueryTypes.UPDATE,
    });
}

export async function getGeneralGroup(playListId) {
    let defaultGroup = null;
    defaultGroup = await Group.findOne({ where: { name: 'General', PlayListId: playListId } });
    !defaultGroup ? defaultGroup = await Group.create({ name: 'General', PlayListId: playListId }) : defaultGroup;
    return defaultGroup.dataValues;
}