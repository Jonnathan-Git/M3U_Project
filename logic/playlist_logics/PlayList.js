import PlayList from "../../models/db/PlayList.js";
import { Success, Error } from "../../lang/es-Es/Messages.js";
import { ResponseMessage } from "../general/ResponseMessage.js";
import Channel from "../../models/db/Channel.js";
import ChannelPlayList from "../../models/db/Channel_Playlist.js";

class PlayListLogic {

    constructor() {
    }

    async getAllPlayListById(req, res) {
        const { userId } = req.params;
        try {
            const playlist = await PlayList.findAll({
                where: { userId },
                include: {
                    model: Channel
                }
            });

            if (!playlist) {
                return ResponseMessage(res, 404, Error.notFound);
            }

            ResponseMessage(res, 200, Success.get, playlist);
        } catch {
            ResponseMessage(res, 400, Error.get);
        }
    }

    async getPlayListById(req, res) {
        const { id } = req.params;

        try {
            const playlist = await PlayList.findOne({
                where: { id },
                include: {
                    model: Channel
                }
            });

            if (!playlist) {
                return ResponseMessage(res, 404, Error.notFound);
            }
            ResponseMessage(res, 200, Success.get, playlist);

        } catch {
            ResponseMessage(res, 400, Error.get);
        }
    }

    async createPlayList(req, res) {
        const { UserId, name } = req.body;

        try {
            const playlist = await PlayList.create({ UserId, name });
            ResponseMessage(res, 201, Success.create, playlist);

        } catch {
            ResponseMessage(res, 400, Error.create);
        }
    }

}

export default PlayListLogic;