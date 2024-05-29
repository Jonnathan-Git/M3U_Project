import Channel_Playlist from "../../models/db/Channel_Playlist.js"
import { ResponseMessage } from "../general/ResponseMessage.js"
import { Success, Error } from "../../lang/es-Es/Messages.js"


/******************************************************************
 * Represents the logic for managing channel playlists.
 *****************************************************************/
class ChannelPlaylistLogic {

    /******************************************************************
     * Adds a channel to a playlist.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    async addChannelToPlaylist(req, res) {
        const { body } = req;

        try {
            const channelP = await Channel_Playlist.create(body);
            ResponseMessage(res, 200, Success.create, channelP);

        } catch (error) {
            ResponseMessage(res, 400, Error.create);
        }
    }

    /******************************************************************
     * Deletes a channel from a playlist.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    async deleteChannelFromPlaylist(req, res) {
        const { body } = req;

        try {
            const channelP = await Channel_Playlist.destroy({ where: {
                PlayListId: body.PlayListId, 
                ChannelId: body.ChannelId
             } });

            if (channelP === 0) return ResponseMessage(res, 404, Error.notFound);

            ResponseMessage(res, 200, Success.delete);

        } catch (error) {
            ResponseMessage(res, 400, Error.delete);
        }
    }

}

export default ChannelPlaylistLogic;