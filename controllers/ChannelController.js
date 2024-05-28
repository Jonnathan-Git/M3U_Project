import ChannelLogic from "../logic/channel_logics/channel.js";

class ChannelController {

    constructor() {
        this.channel = new ChannelLogic();
    }

     createChannel = async (req, res) => {
        await this.channel.createChannel(req, res);
    }

}

export default ChannelController;