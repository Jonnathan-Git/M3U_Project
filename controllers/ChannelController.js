import ChannelLogic from "../logic/channel_logics/Channel.js";

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

    /* Set user-channel, playlist-channel relation */
    setRelationOnUserAndPlaylist = async (req, res) => {
        await this.channel_logic.setChannelOnPlaylistAndUser(req, res);
    }

    /* Verify if chanel exist */
    getExistingChannel = async (req, res) => {
        await this.channel_logic.getChannelByUrl(req, res);
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

    createAllChannels = async (req, res) => {
        await this.channel_logic.createAllChannels(req, res);
    }

    updateChannelsPositions = async (req, res) => {
        await this.channel_logic.update_channelsPositon(req, res);
    }
    
    getChannelsByGroup = async (req, res) => {
        await this.channel_logic.getChannelsByGroup(req, res);
    }
    changeChannelGroup = async (req, res) => {
        await this.channel_logic.changeChannelOfGroup(req, res);
    }
}

export default ChannelController;