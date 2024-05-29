import Channel from "../../models/db/Channel.js";
import { Success, Error } from "../../lang/es-Es/Messages.js";
import { ResponseMessage } from "../general/ResponseMessage.js";
import { verifyActiveUrlChannels, verifyUrlChannels } from "./VerifyChannels.js";
import updateFields from "../general/UpdateFields.js";
import { importChannels } from "./ImportChannels.js";


/*************************************************************************
 * Represents the logic for creating a channel.
 ************************************************************************/
class ChannelLogic {

    /*************************************************************************
     * Creates a new channel.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     ************************************************************************/
    async createChannel(req, res) {

        const { body } = req;
        try {

            if (!await verifyActiveUrlChannels(body.url)) return ResponseMessage(res, 400, Error.channel.invalid);
            if (!await verifyUrlChannels(body.url, Channel)) return ResponseMessage(res, 400, Error.channel.channelExists);

            const channel = await Channel.create(body);
            ResponseMessage(res, 201, Success.create, channel);

        } catch {
            ResponseMessage(res, 400, Error.create);
        }
    }

    /******************************************************************
     * Updates a channel.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the channel is updated.
     *****************************************************************/
    async updateChannel(req, res) {
        const { body } = req;

        try {
            const channel = await Channel.findByPk(body.id);

            if (!channel) return ResponseMessage(res, 404, Error.notFound);
            await channel.update(updateFields(body, channel));

            ResponseMessage(res, 200, Success.update);
        } catch (error) {
            ResponseMessage(res, 400, Error.update);
        }
    }

    /******************************************************************
     * Retrieves a channel by its ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the channel is retrieved.
     *****************************************************************/
    async getChannelById(req, res) {
        const { id } = req.params;
        try {
            const channel = await Channel.findByPk(id);
            if (!channel) return ResponseMessage(res, 404, Error.notFound);
            ResponseMessage(res, 200, Success.get, channel);
        } catch {
            ResponseMessage(res, 400, Error.get);
        }
    }

    /******************************************************************
     * Deletes a channel by its ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the channel is deleted.
     *****************************************************************/
    async deleteChannel(req, res) {
        const { id } = req.params;
        try {
            const channelDeleteds = await Channel.destroy({ where: { id: id } });
            if (channelDeleteds === 0) return ResponseMessage(res, 404, Error.channel.notExists);
            ResponseMessage(res, 200, Success.delete);
        } catch (error) {
            ResponseMessage(res, 400, Error.delete);
        }
    }

    /******************************************************************
     * Imports channels from a file and creates them in the database.
     * @param {Object} req - The request object.
     * @param {Object} req.file - The file object containing the channels data.
     * @param {Object} req.body - The request body object.
     * @param {string} req.body.userId - The user ID.
     * @param {Object} res - The response object.
     *****************************************************************/
    async import(req, res) {
        const { file } = req;
        const { userId } = req.body;

        try {
            if (!file) return ResponseMessage(res, 400, Error.channel.notFile);
            const data = file.buffer.toString('utf8');
            if (!data) return ResponseMessage(res, 400, Error.channel.emptyFile);

            const importInfo = await importChannels(data, Channel,userId);

            Channel.bulkCreate(importInfo.channels);

            ResponseMessage(res, 200, Success.import.creteAll, { trash: importInfo.trashChannels, repeat: importInfo.repeatChannels });
        } catch {
            ResponseMessage(res, 400, Error.channel.import);
        }
    }


    //TODO: Implement the getChannels method
    // async getChannels(req, res) {
    //     try {
    //         const channels = await Channel.findAll();
    //         ResponseMessage(res, 200, Success.get, channels);
    //     } catch {
    //         ResponseMessage(res, 400, Error.get);
    //     }
    // }

}
export default ChannelLogic;