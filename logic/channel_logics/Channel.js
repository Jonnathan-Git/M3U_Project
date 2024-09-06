import Channel from "../../models/db/Channel.js";
import Playlist from "../../models/db/Playlist.js"
import { Success, Error } from "../../lang/es-Es/Messages.js";
import { ResponseMessage } from "../general/ResponseMessage.js";
import {
    verifyActiveUrlChannels,
    verifyUrlChannels,
    userChannelRelationVerification,
    playlistChannelRelationVerification,
    findUserChannel
} from "./VerificationService.js";
import updateFields from "../general/UpdateFields.js";
import { importChannels } from "./ImportChannels.js";
import { getGeneralGroup } from "../group_logics/ChannelsByGroup.js";
import UserChannel from '../../models/db/UserChannel.js';
import PlaylistChannel from '../../models/db/PlaylistChannel.js'


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

        let channel = null;
        const { body } = req;

        try {

            if (!await verifyActiveUrlChannels(body.url)) return ResponseMessage(res, 400, Error.channel.invalid);

            const existingChannel = await verifyUrlChannels(body.url, Channel);
            if (existingChannel) {
                channel = existingChannel;
            } else {
                channel = await Channel.create(body);
            }
            await this.addUserChannel(res, body.UserId, channel);
            await this.addChannelToPlaylist(res, body.PlayListId, channel);
            ResponseMessage(res, 201, Success.create);

        } catch (error) {
            ResponseMessage(res, 400, Error.create, error.message);
        }
    }

    /* checks if the user already has the channel added, if not add the channel for that user */
    async addUserChannel(res, userId, channel) {

        const existUserChannel = await findUserChannel(UserChannel,userId, channel.id);
        if (existUserChannel) {
            return ResponseMessage(res, 400, Error.channel.channelExists);
        }
        await UserChannel.create({ UserId: userId, ChannelId: channel.id });
    }


    //add channel to playlist
    async addChannelToPlaylist(res, playListId, chno) {

        try {

            const playlist = await Playlist.findByPk(playListId);
            const channel = await Channel.findByPk(chno.id);

            // Verificar si el canal ya está en la playlist
            const existingRelation = await playlist.hasChannel(channel);

            if (existingRelation) {
                return ResponseMessage(res, 400, Error.channel.channelExistOnPlaylist);
            }

            // Agregar el canal a la playlist
            await playlist.addChannel(channel);

        } catch (error) {
            console.error("Error al agregar el canal a la playlist: ", error);
            ResponseMessage(res, 500, Error.channel.addOnPlaylist_Error);
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

    /*******************************************************************
     * Retrieves channels by user ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the channels are retrieved.
     ******************************************************************/
    async getChannelsByUserId(req, res) {
        const { userId } = req.params;
        try {
            const channels = await Channel.findAll({ where: { userId: userId } });
            if (!channels) return ResponseMessage(res, 404, Error.notFound);
            ResponseMessage(res, 200, Success.get, channels);
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
        const { userId, channelId, playlistId } = req.params;
        try {
            const deletedUserChannel = await UserChannel.destroy({ where: { UserId: userId, ChannelId: channelId } });
            await PlaylistChannel.destroy({ where: { PlayListId: playlistId, ChannelId: channelId } });
            if (deletedUserChannel === 0) return ResponseMessage(res, 404, Error.channel.notExists);
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
        const { playListId } = req.body;

        try {
            if (!file) return ResponseMessage(res, 400, Error.channel.notFile);
            const data = file.buffer.toString('utf8');
            if (!data) return ResponseMessage(res, 400, Error.channel.emptyFile);
            const groupGeneral = await getGeneralGroup(playListId);
            console.log(groupGeneral);
            const importInfo = await importChannels(data, Channel, playListId, groupGeneral.id);

            if (importInfo.channels.length === 0) return ResponseMessage(res, 400, Error.channel.notChannelsImported);

            ResponseMessage(res, 200, Success.get, importInfo.channels);
        } catch (error) {
            ResponseMessage(res, 400, Error.channel.import);
        }
    }

    async createAllChannels(req, res) {
        const { body } = req;
        const { userId, playlistId } = req.query;

        try {
            if (body.length === 0) return ResponseMessage(res, 400, Error.create);

            const channels = await Channel.bulkCreate(body);
            const userChannelData = await userChannelRelationVerification(channels, userId, UserChannel);
            const playlistChannelData = await playlistChannelRelationVerification(channels, playlistId, PlaylistChannel);

            const userChannelRelations = (await Promise.all(userChannelData)).filter(Boolean);
            const playlistChannelRelations = (await Promise.all(playlistChannelData)).filter(Boolean);
            if (userChannelRelations) { await UserChannel.bulkCreate(userChannelRelations); }
            if (playlistChannelRelations) { await PlaylistChannel.bulkCreate(playlistChannelRelations); }

            ResponseMessage(res, 201, Success.create);
        } catch {
            ResponseMessage(res, 400, Error.create);
        }
    }



    //OBTENER CANALES POR GRUPO
    async getChannelsByGroup(req, res) {
        const { groupId } = req.params;
        try {
            const channels = await Channel.findAll({ where: { groupId: groupId } });
            if (!channels) return ResponseMessage(res, 404, Error.notFound);
            ResponseMessage(res, 200, Success.get, channels);
        } catch {
            ResponseMessage(res, 400, Error.get);
        }
    }

    //CAMBIAR GRUPO AL CANAL
    async changeChannelOfGroup(req, res) {
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

}
export default ChannelLogic;