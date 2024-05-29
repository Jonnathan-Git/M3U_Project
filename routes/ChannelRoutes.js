import { Router } from "express";
import ChannelController from "../controllers/ChannelController.js";
import Auth from "../middlewares/Auth.js";

class ChannelRoutes {
    constructor() {
        this.router_channel = Router();
        this.controller = new ChannelController();
        this.init();
    }

    init() {
        this.router_channel.post('/', Auth.AuthenticateToken, this.controller.createChannel);
        this.router_channel.put('/', Auth.AuthenticateToken,this.controller.updateChannel);
        this.router_channel.get('/:id', this.controller.getChannelById);
        this.router_channel.delete('/:id',  this.controller.deleteChannel);
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