/*****************************************************************
 * Creates a file with the given data and sends it as a response.
 * @param {Object} res - The response object.
 * @param {string} fileName - The name of the file.
 * @param {string} extension - The file extension.
 * @param {string} data - The data to be written to the file.
 *****************************************************************/
export default function CreateFile(res, fileName, extension, data) {

    const result = CreateDatatoFile(data);

    res.setHeader('Content-Type', 'audio/x-mpegurl');
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName.concat(extension));
    res.send(result);

}

/********************************************************************
 * Formats an entry with the given key, value.
 * @param {string} key - The key of the entry.
 * @param {string} value - The value of the entry.
 * @returns {string} The formatted entry.
 **********************************************************************/
function formatEntry(key, value) {
    if (key === 'meta_data') { return `, ${value}`; }
    if (key === 'url') { return `\n${value}`; }

    return `${key.replace(/_/g, '-')}="${value}"`;
}

/***************************************************************
 * Creates data to a file in M3U format.
 * @param {Object} data - The data object containing the channels.
 ***************************************************************/
function CreateDatatoFile(channels) {
    const result = '#EXTM3U\n' + channels.flatMap(channel => {

        const entries = Object.entries(channel.dataValues)
            .filter(([value]) => value !== null)
            .map(([key, value]) => formatEntry(key, value));

        return "#EXTINF: -1 " + entries.join(' ') + '\n';
    }).join('');

    return result;
}