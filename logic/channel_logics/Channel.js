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

        const { body } = req;

        try {

            if (!await verifyActiveUrlChannels(body.url)) return ResponseMessage(res, 400, Error.channel.invalid);
            const channel = await Channel.create(body);
            ResponseMessage(res, 201, Success.create, channel);

        } catch (error) {
            ResponseMessage(res, 400, Error.create, error.message);
        }
    }

    /* Set channel relation with user and channel */
    async setChannelOnPlaylistAndUser(req, res) {
        const { userId, playlistId, channelId } = req.query;
        await this.addUserChannel(res, userId, playlistId, channelId);
    }

    /* checks if the user already has the channel added, if not add the channel for that user */
    async addUserChannel(res, userId, playlistId, channelId) {

        const existUserChannel = await findUserChannel(UserChannel, userId,  channelId);
        if (existUserChannel) {
            return ResponseMessage(res, 400, Error.channel.channelExists);
        }
        await UserChannel.create({ UserId: userId, ChannelId: channelId });
        await this.addChannelToPlaylist(res, playlistId, channelId);
    }


    //add channel to playlist
    async addChannelToPlaylist(res, playListId, channelId) {

        try {

            const playlist = await Playlist.findByPk(playListId);
            const channel = await Channel.findByPk(channelId);

            const existingRelation = await playlist.hasChannel(channel);

            if (existingRelation) {
                return ResponseMessage(res, 400, Error.channel.channelExistOnPlaylist);
            }

            // save channel and update amount playlist property
            await playlist.addChannel(channel);
            const count = await playlist.countChannels();
            playlist.amount = count;
            await playlist.save(); //save on Db
            ResponseMessage(res, 200, Success.create);

        } catch (error) {
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

    async getChannelByUrl(req, res) {
        const url = req.query.channelUrl;

        try {
            const channel = await verifyUrlChannels(url, Channel);

            if(!channel) return ResponseMessage(res, 404, Error.notFound);
            ResponseMessage(res, 200, Success.get, channel);
        } catch (error) {
            ResponseMessage(res, 500, Error.get);
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
        const { userId, channelId, playlistId } = req.query;
        try {
            const deletedUserChannel = await UserChannel.destroy({ where: { UserId: userId, ChannelId: channelId } });
            await PlaylistChannel.destroy({ where: { PlayListId: playlistId, ChannelId: channelId } });
            if (deletedUserChannel === 0) return ResponseMessage(res, 404, Error.channel.notExists);
            const playlist = await Playlist.findByPk(playlistId);
            const count = await playlist.countChannels();
            playlist.amount = count;
            await playlist.save();
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
            const importInfo = await importChannels(data, Channel, groupGeneral.id);

            ResponseMessage(res, 200, Success.get, importInfo.channels);
        } catch (error) {
            ResponseMessage(res, 400, Error.channel.import);
        }
    }

    async createAllChannels(req, res) {
        const { body } = req;
        const { userId, playlistId } = req.query;
        const repeatedChannels = [];

        try {
            if (body.length === 0) return ResponseMessage(res, 400, Error.create);

            const channelPromises = body.map(async (channelRecord) => {
                const repeatedChannel = await verifyUrlChannels(channelRecord.url, Channel);
                if (!repeatedChannel) {
                    return channelRecord
                }
                repeatedChannels.push(repeatedChannel);

                return null;
            });

            const unrepeatedChannels = (await Promise.all(channelPromises)).filter(Boolean);
            if (unrepeatedChannels) {
                const bulkCreateResult = await Channel.bulkCreate(unrepeatedChannels);
                const userChannelData = await userChannelRelationVerification(bulkCreateResult, userId, UserChannel);
                const playlistChannelData = await playlistChannelRelationVerification(bulkCreateResult, playlistId, PlaylistChannel);
                await this.setRelations(userChannelData, playlistChannelData);
            }

            const userChannelDt = await userChannelRelationVerification(repeatedChannels, userId, UserChannel);
            const playlistChannelDt = await playlistChannelRelationVerification(repeatedChannels, playlistId, PlaylistChannel);
            await this.setRelations(userChannelDt, playlistChannelDt);

            const count = await PlaylistChannel.count({ where: { playlistId } });
            await Playlist.update({ amount: count }, { where: { id: playlistId } });

            ResponseMessage(res, 201, Success.create);
        } catch (error) {
            ResponseMessage(res, 400, Error.create);
        }
    }

    //Set relation to user/channnel and playlist/channel
    async setRelations(userChannelData, playlistChannelData) {
        const userChannelRecords = (await Promise.all(userChannelData)).filter(Boolean);
        const playlistChannelRecords = (await Promise.all(playlistChannelData)).filter(Boolean);
        if (userChannelRecords) { await UserChannel.bulkCreate(userChannelRecords); }
        if (playlistChannelRecords) { await PlaylistChannel.bulkCreate(playlistChannelRecords); }
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

    //update channels position in user playlist
    async update_channelsPositon(req, res) {
        const { playlistId } = req.params;
        const { updtChannels } = req.body;

        try {
            const updates = updtChannels.map(async (channel) => {
                return await PlaylistChannel.update({ position: channel.newPosition }, { where: { PlayListId: playlistId, ChannelId: channel.channelId } })
            });

            await Promise.all(updates);
            ResponseMessage(res, 200, Success.update);
        } catch (error) {
            ResponseMessage(res, 400, Error.update);
        }

    }

}
export default ChannelLogic;