import ChannelLogic from "../logic/channel_logics/channel.js";

class ChannelController {

    constructor() {
        this.channel_logic = new ChannelLogic();
    }

     createChannel = async (req, res) => {
        await this.channel_logic.createChannel(req, res);
    }

    updateChannel = async (req, res) => {
        await this.channel_logic.updateChannel(req, res);
    }

    getChannelById = async (req, res) => {
        await this.channel_logic.getChannelById(req, res);
    }
}

export default ChannelController;