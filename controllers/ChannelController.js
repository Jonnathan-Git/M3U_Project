import ChannelLogic from "../logic/channel_logics/channel.js";

/******************************************************************
 * Controller class for managing channels.
 *****************************************************************/
class ChannelController {

    constructor() {
        this.channel_logic = new ChannelLogic();
    }

    /******************************************************************
     * Creates a new channel.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    createChannel = async (req, res) => {
        await this.channel_logic.createChannel(req, res);
    }

    /******************************************************************
     * Updates an existing channel.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    updateChannel = async (req, res) => {
        await this.channel_logic.updateChannel(req, res);
    }

    /******************************************************************
     * Retrieves a channel by its ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    getChannelById = async (req, res) => {
        await this.channel_logic.getChannelById(req, res);
    }

    /*******************************************************************
     * Retrieves a channel by its ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the channel is retrieved.
     ******************************************************************/
    getChannelsByUserId = async (req, res) => {
        await this.channel_logic.getChannelsByUserId(req, res);
    }

    /******************************************************************
     * Deletes a channel.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    deleteChannel = async (req, res) => {
        await this.channel_logic.deleteChannel(req, res);
    }
    
    /******************************************************************
     * Imports channels from an external source.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     *****************************************************************/
    import = async (req, res) => {
        await this.channel_logic.import(req, res);
    }
}

export default ChannelController;