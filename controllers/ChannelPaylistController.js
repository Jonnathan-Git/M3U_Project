import ChannelPlaylistLogic from "../logic/channelPlaylist_logic/ChannelPlaylist.js";

/******************************************************************
 * Controller class for managing channel playlists.
 *****************************************************************/
class ChannelPlaylistController {

    constructor() {
        this.logic = new ChannelPlaylistLogic();
    }

    /******************************************************************
     * Adds a channel to the playlist.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    addChannelToPlaylist = async (req, res) => {
        this.logic.addChannelToPlaylist(req, res);
    }

    /******************************************************************
     * Deletes a channel from the playlist.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    deleteChannelFromPlaylist = async (req, res) => {
        this.logic.deleteChannelFromPlaylist(req, res);
    }
}

export default ChannelPlaylistController;