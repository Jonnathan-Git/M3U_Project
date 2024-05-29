import { Router } from "express";
import multer from "multer";
import ChannelController from "../controllers/ChannelController.js";
import Auth from "../middlewares/Auth.js";

class ChannelRoutes {
    constructor() {
        this.router_channel = Router();
        this.controller = new ChannelController();
        this.upload = multer({ storage: multer.memoryStorage() });
        this.init();
    }

    init() {
        this.router_channel.post('/', Auth.AuthenticateToken, this.controller.createChannel);
        this.router_channel.put('/', Auth.AuthenticateToken, this.controller.updateChannel);
        this.router_channel.get('/:id', Auth.AuthenticateToken, this.controller.getChannelById);
        this.router_channel.delete('/:id', Auth.AuthenticateToken, this.controller.deleteChannel);
        this.router_channel.post('/import', Auth.AuthenticateToken, this.upload.single('file'), this.controller.import);
    }

    /***********************************************************
       * Get the routes for the channels.
       * @returns {Router} The channel router.
    **********************************************************/
    getRoutes() {
        return this.router_channel;
    }
}

export default ChannelRoutes;