import { Router } from "express";
import PlayListController from "../controllers/PlayListController.js";
import Auth from "../middlewares/Auth.js";

class PlaylistRoutes {

    constructor() {
        this.router_playlist = Router();
        this.controller = new PlayListController();
        this.init();
    }

    /***********************************************************
     * Initializes the playlist routes.
     **********************************************************/
    init() {
        // Route to get a playlist form a user
        this.router_playlist.get('/:id',Auth.AuthenticateToken,this.controller.getPlaylistById);
        this.router_playlist.post('/',Auth.AuthenticateToken,this.controller.createPlaylist);
        this.router_playlist.get('/all/:userId',Auth.AuthenticateToken,this.controller.getAllPlayListByUserId);
        this.router_playlist.put('/',Auth.AuthenticateToken,this.controller.updatePlaylist);
        this.router_playlist.delete('/:id',Auth.AuthenticateToken,this.controller.deletePlaylist);
        this.router_playlist.get('/file/:id',this.controller.getPlaylistFile);
    }

    /***********************************************************
     * Get the routes for the user.
     * @returns {Router} The user router.
     **********************************************************/
    getRoutes() {
        return this.router_playlist;
    }

}

export default PlaylistRoutes;