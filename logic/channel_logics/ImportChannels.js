import { verifyActiveUrlChannels, verifyUrlChannels } from "./VerifyChannels.js";

/******************************************************************
 * Imports channels from a file and performs various validations.
 * @param {string} fileData - The data of the file containing the channels.
 * @param {ModelChannel} ModelChannel - The model for the channel.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{channels: Array, trashChannels: Array, repeatChannels: Array}>} - An object containing the imported channels, trash channels, and repeat channels.
 *****************************************************************/
export async function importChannels(fileData, ModelChannel, userId) {
    const channels = [];
    const trashChannels = [];
    const repeatChannels = [];
    //modificar esta parte
    //posible solucion, recorrer el archivo
    fileData = fileData.replace("#EXTM3U", '');
    fileData = fileData.replace(/:-1 |: -1 |&/g, '');
    fileData = deleteNullLines(fileData);
    const lines = fileData.split('#EXTINF').slice(1);

    await Promise.all(lines.map(async line => {
        const channel = await processLine(line);
        if (!await verifyActiveUrlChannels(channel.url)) return trashChannels.push(channel);
        if (!await verifyUrlChannels(channel.url, ModelChannel)) return repeatChannels.push(channel);
        channel.UserId = userId;
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
    tagPart = deleteSpaces(tagPart);
    const tags = tagPart.split('&');
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
    const [metadata, url] = metaPart ? metaPart.split('\n') : null;
    channel.meta_data = metadata || null;
    channel.url = url || null;
    return channel;
}

function deleteNullLines(text) {
    return text
        .split('\n')          
        .filter(linea => linea.trim() !== '') 
        .join('\n');          
}

function deleteSpaces(texto) {
    return texto.replace(/("[^"]*")|(\s+)/g, (match, group1, group2) => {
        if (group1) {
            return group1;
        } else if (group2) {
            return '&';
        }
        return match;
    });
}

