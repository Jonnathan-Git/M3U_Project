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
        this.router_channel.post('/', this.controller.createChannel);
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