import Channel from "../../models/db/Channel.js";
import { Success, Error } from "../../lang/es-Es/Messages.js";
import { ResponseMessage } from "../general/ResponseMessage.js";
import { verifyActiveUrlChannels, verifyUrlChannels } from "./VerifyChannels.js";
import updateFields from "../general/UpdateFields.js";


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