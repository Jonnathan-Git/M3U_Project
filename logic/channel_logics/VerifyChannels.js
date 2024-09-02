/***********************************************************************
 * Verifies if a given URL already exists in the Channel collection.
 * @param {string} url - The URL to be verified.
 * @param {Object} Channel - The Channel model object.
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is not found, false otherwise.
 ************************************************************************/
export async function verifyUrlChannels(url, Channel) {
    const repeatchannel = await Channel.findOne({ where: { url: url } });
    return repeatchannel;
}

/*************************************************************************
 * Verifies if the provided URL is active by making a fetch request.
 * @param {string} url - The URL to be verified.
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is active, false otherwise.
 ************************************************************************/
export async function verifyActiveUrlChannels(url) {

    try {
        return (await fetch(url)).ok;
    } catch (error) {
        return false;
    }
}