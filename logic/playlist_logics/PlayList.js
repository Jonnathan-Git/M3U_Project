import PlayList from "../../models/db/Playlist.js";
import { Success, Error } from "../../lang/es-Es/Messages.js";
import { ResponseMessage } from "../general/ResponseMessage.js";
import Channel from "../../models/db/Channel.js";
import updateFields from "../general/UpdateFields.js";
import CreateFile from "./CreateFile.js";
import { getGeneralGroup } from "../group_logics/ChannelsByGroup.js";
import PlaylistChannel from '../../models/db/PlaylistChannel.js'

class PlayListLogic {

    constructor() {
    }

    /******************************************************************
     * Retrieves all playlists by user ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     *****************************************************************/
    async getAllPlayListByUserId(req, res) {
        const { userId } = req.params;
        try {
            const playlist = await PlayList.findAll({
                where: { userId },
                order: [['index_position', 'ASC']]
            });

            if (!playlist) { return ResponseMessage(res, 404, Error.notFound); }

            ResponseMessage(res, 200, Success.get, playlist);
        } catch {
            ResponseMessage(res, 400, Error.get);
        }
    }

    /******************************************************************
     * Retrieves a playlist by its ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the playlist is retrieved.
     *****************************************************************/
    async getPlayListById(req, res) {
        const { id } = req.params;

        try {
            const playlist = await PlayList.findOne({
                where: { 
                    id: id
                 },
                include: {
                    model: Channel,
                    through: {
                        model: PlaylistChannel,
                        attributes: ['position'],
                    },
                },
            });

            if (!playlist) { return ResponseMessage(res, 404, Error.notFound); }
            playlist.Channels = playlist.Channels.sort((itemA, itemB) => itemA.PlaylistChannel.position - itemB.PlaylistChannel.position);
            ResponseMessage(res, 200, Success.get, playlist);

        } catch(error) {
            console.log(error);
            ResponseMessage(res, 400, Error.get);
        }
    }

    /******************************************************************
     * Creates a new playlist.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the playlist is created.
     *****************************************************************/
    async createPlayList(req, res) {
        const { UserId, name } = req.body;
        try {
            const playlist = await PlayList.create({ UserId, name });
            //crear grupo por defecto
            getGeneralGroup(playlist.id);
            ResponseMessage(res, 201, Success.create, playlist);

        } catch {
            ResponseMessage(res, 400, Error.create);
        }
    }

    /******************************************************************
     * Updates a playlist.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the playlist is updated.
     *****************************************************************/
    async updatePlayList(req, res) {
        const { body } = req;
        try {
            const playlist = await PlayList.findByPk(body.id);

            if (!playlist) { return ResponseMessage(res, 404, Error.notFound); }

            const updatedFields = updateFields(body, playlist);

            PlayList.update(updatedFields, { where: { id: body.id } });

            ResponseMessage(res, 200, Success.update);

        } catch {
            ResponseMessage(res, 400, Error.update);
        }
    }

     /******************************************************************
     * Deletes a playlist by its ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the playlist is deleted.
     *****************************************************************/

     async updateIndex_position(req, res){
        const {body} = req;

       try {
        const promises = body.map(async(playlist) => {
            return await PlayList.update({index_position: playlist.index_position}, {where: {id: playlist.id}})
        });

        await Promise.all(promises);

        ResponseMessage(res, 200, Success.update);
       } catch (error) {
        console.log(error);        
        ResponseMessage(res, 500, Error.update);
       }
     }

    /******************************************************************
     * Deletes a playlist by its ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the playlist is deleted.
     *****************************************************************/
    async deletePlayList(req, res) {
        const { id } = req.params;
        try {
            const playlistDeleteds = await PlayList.destroy({ where: { id: id } });
            if (playlistDeleteds === 0) return ResponseMessage(res, 404, Error.notFound);
            ResponseMessage(res, 200, Success.delete);

        } catch {
            ResponseMessage(res, 400, Error.delete);
        }
    }

    /******************************************************************
     * Retrieves the playlist file with the specified ID and sends it as a response.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the playlist file is sent as a response.
     *****************************************************************/
    async getPlaylistFile(req, res) {

        const { id } = req.params;

        try {
            const playlist = await PlayList.findOne({
                where: { id },
                include: {
                    model: Channel,
                    attributes: { exclude: ['UserId', 'id'] },
                }
            });

            if (!playlist) { return ResponseMessage(res, 404, Error.notFound); }

            CreateFile(res, playlist.name, '.m3u', playlist.Channels);

        } catch (error) {
            ResponseMessage(res, 400, error.message);
        }

    };

}

export default PlayListLogic;