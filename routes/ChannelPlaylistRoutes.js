import { Router } from 'express';
import ChannelPlaylistController from '../controllers/ChannelPaylistController.js';
import Auth from '../middlewares/Auth.js';

/****************************************************************
 * Represents a class that defines the routes for managing channel playlists.
 *****************************************************************/
class ChannelPlaylistRoutes {

    constructor() {
        this.channelP = Router();
        this.controller = new ChannelPlaylistController();
        this.init();
    }

    /******************************************************************
     * Initializes the routes for adding and deleting channels from playlists.
     *****************************************************************/
    init() {
        this.channelP.post('/add/channel', Auth.AuthenticateToken, this.controller.addChannelToPlaylist);
        this.channelP.delete('/delete/channel', Auth.AuthenticateToken, this.controller.deleteChannelFromPlaylist);
    }

    /******************************************************************
     * Gets the defined routes for managing channel playlists.
     * @returns {Router} The router object containing the routes.
     *****************************************************************/
    getRoutes() {
        return this.channelP;
    }

}

export default ChannelPlaylistRoutes;