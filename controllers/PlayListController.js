import PlayListLogic from "../logic/playlist_logics/PlayList.js";

class PlayListController {

    constructor() {
        this.playListLogic = new PlayListLogic();
    }
    
    getAllPlayListById = async (req, res) => {
        await this.playListLogic.getAllPlayListById(req, res);
    }

    getPlaylistById = async (req, res) => {
        await this.playListLogic.getPlayListById(req, res);
    }

    createPlaylist = async (req, res) => {
        await this.playListLogic.createPlayList(req, res);
    }

    updatePlaylist = async (req, res) => {
        await this.playListLogic.updatePlayList(req, res);
    }

    deletePlaylist = async (req, res) => {
        await this.playListLogic.deletePlayList(req, res);
    }

    getPlaylistFile = async (req, res) => {
        await this.playListLogic.getPlaylistFile(req, res);
    }
  
}

export default PlayListController;