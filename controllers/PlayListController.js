import PlayListLogic from "../logic/playlist_logics/PlayList.js";

/******************************************************************
 * Controller class for managing playlists.
 *****************************************************************/
class PlayListController {

    constructor() {
        this.playListLogic = new PlayListLogic();
    }
    
    /******************************************************************
     * Retrieves all playlists for a given user ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    getAllPlayListByUserId = async (req, res) => {
        await this.playListLogic.getAllPlayListByUserId(req, res);
    }

    /******************************************************************
     * Retrieves a playlist by its ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    getPlaylistById = async (req, res) => {
        await this.playListLogic.getPlayListById(req, res);
    }

    /******************************************************************
     * Creates a new playlist.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    createPlaylist = async (req, res) => {
        await this.playListLogic.createPlayList(req, res);
    }

    /******************************************************************
     * Updates an existing playlist.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    updatePlaylist = async (req, res) => {
        await this.playListLogic.updatePlayList(req, res);
    }

    /******************************************************************
     * Deletes a playlist.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    deletePlaylist = async (req, res) => {
        await this.playListLogic.deletePlayList(req, res);
    }

    /******************************************************************
     * Retrieves the playlist file.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    getPlaylistFile = async (req, res) => {
        await this.playListLogic.getPlaylistFile(req, res);
    }
  
}

export default PlayListController;