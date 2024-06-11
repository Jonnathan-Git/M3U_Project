import Group from "../../models/db/Group.js";
import { ResponseMessage } from "../general/ResponseMessage.js";
import { Success, Error } from "../../lang/es-Es/Messages.js";
import updateFields from "../general/UpdateFields.js";
import { getGeneralGroup, updateChannelsByGroup } from "./ChannelsByGroup.js";

class GroupLogic {

    async addGroup(req, res) {
        const { body } = req;

        try {
            const group = await Group.findOne({ where: { name: body.name } });
            if (group) return ResponseMessage(res, 400, Error.group.groupExists);

            await Group.create(body);

            ResponseMessage(res, 201, Success.create);
        } catch {
            ResponseMessage(res, 400, Error.create);
        }
    }

    async updateGroup(req, res) {
        const { body } = req;

        try {
            const group = await Group.findByPk(body.id);

            if (!group) return ResponseMessage(res, 404, Error.notFound);

            await group.update(updateFields(body, group));

            ResponseMessage(res, 200, Success.update);
        } catch (error) {
            ResponseMessage(res, 400, Error.update);
        }
    }

    async deleteGroup(req, res) {
        const { id, playListId } = req.params;
        try {
            const group = await Group.findByPk(id);
            const defaultGroup = await getGeneralGroup(playListId);

            if (!group) return ResponseMessage(res, 404, Error.notFound);

            await updateChannelsByGroup(defaultGroup.id, id);
            await group.destroy();

            ResponseMessage(res, 200, Success.delete);
        } catch (error) {
            ResponseMessage(res, 400, Error.delete);
        }
    }

    async getGroup(req, res) {
        const { id } = req.params;

        try {
            const group = await Group.findByPk(id);

            if (!group) return ResponseMessage(res, 404, Error.notFound);

            ResponseMessage(res, 200, Success.get, group);
        } catch (error) {
            ResponseMessage(res, 400, Error.get);
        }
    }

    async getGroups(req, res) {

        const { idPlaylist } = req.params;

        try {
            const groups = await Group.findAll({ where: { PlayListId: idPlaylist } });

            if (!groups) return ResponseMessage(res, 404, Error.notFound);

            ResponseMessage(res, 200, Success.get, groups);
        } catch (error) {
            ResponseMessage(res, 400, Error.get);
        }
    }
}

export default GroupLogic;