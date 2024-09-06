import { STARTREGEX, VALIDTAGS } from "./ImportConstants.js";
import { verifyActiveUrlChannels, verifyUrlChannels } from "./VerificationService.js";

/******************************************************************
 * Imports channels from a file and performs various validations.
 * @param {string} fileData - The data of the file containing the channels.
 * @param {ModelChannel} ModelChannel - The model for the channel.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{channels: Array, trashChannels: Array, repeatChannels: Array}>} - An object containing the imported channels, trash channels, and repeat channels.
 *****************************************************************/
export async function importChannels(fileData, ModelChannel,groupId) {

    const channels = [];
    const trashChannels = [];
    const repeatChannels = [];

    fileData = fileData.replace("#EXTM3U", '');
    const lines = fileData.split('#').slice(1);

    await Promise.all(lines.map(async line => {
        const channel = await processLine(line);
        if (!await verifyActiveUrlChannels(channel.url)) return trashChannels.push(channel);
        if (await verifyUrlChannels(channel.url, ModelChannel)) return repeatChannels.push(channel);
        channel.GroupId = groupId;
        channels.push(channel);
    }));

    return { channels, trashChannels, repeatChannels };
}

/******************************************************************
 * Processes a line of input and returns a channel object.
 * 
 * @param {string} line - The input line to process.
 * @returns {Object} The channel object containing the processed tags and metadata.
 *****************************************************************/
async function processLine(line) {
    const [tagPart, metaPart] = line.split(',');
    const channel = {};
    if (!STARTREGEX.test(tagPart)) return channel;
    processTags(tagPart, channel);
    processMetadata(metaPart, channel);
    return channel;
}

/******************************************************************
 * Processes the tags of a channel and updates the channel object accordingly.
 * 
 * @param {string} tagPart - The tag part of the channel.
 * @param {object} channel - The channel object to be updated.
 * @returns {object} The updated channel object.
 *****************************************************************/
function processTags(tagPart, channel) {
    const tags = createAllValidTags(tagPart);
    tags.forEach(tag => {
        const [key, value] = tag.split('=');
        channel[key.replace("-", "_")] = value.replace(/"/g, '');
    });

    return channel;
}

/******************************************************************
 * Processes the metadata part and updates the channel object.
 * 
 * @param {string} metaPart - The metadata part to process.
 * @param {object} channel - The channel object to update.
 * @returns {object} - The updated channel object.
 *****************************************************************/
function processMetadata(metaPart, channel) {
    if (metaPart) {
        const [metadata, url] = metaPart.split('\n');
        channel.meta_data = metadata || null;
        channel.url = url || null;
    } else {
        channel.meta_data = null;
        channel.url = null;
    }

    return channel;
}

/******************************************************************
 * Creates an array of valid tags found in the tag part.
 * 
 * @param {string} tagPart - The tag part to search for valid tags.
 * @returns {Array<string>} An array of valid tags with their values.
 *****************************************************************/
function createAllValidTags(tagPart) {
    let result = [];
    VALIDTAGS.forEach(tag => {
        const tagResult = new RegExp(`${tag}="([^"]*)"`);
        const match = tagPart.match(tagResult);
        if (match) result.push(`${tag}="${match[1]}"`);
    });
    return result;
}