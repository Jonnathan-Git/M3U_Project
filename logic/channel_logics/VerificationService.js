
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

export async function userChannelRelationVerification(channels, userId, UserChannel){
    const userChannelsPromises = channels.map(async (channel) => {

        const existingUserChannel = await findUserChannel(UserChannel, userId, channel.id);
        if (!existingUserChannel) { return { UserId: userId, ChannelId: channel.id } }
        return null;
    });

    return userChannelsPromises;
}

//Find a relation between User and  channel
export async function findUserChannel(UserChannel, userId, channelId) {

    try {
        const userChannel = await UserChannel.findOne({
            where: {
                UserId: userId,
                ChannelId: channelId
            }
        })

        return userChannel != null;
    } catch (error) {
        console.error('Error al buscar el canal del usuario: ', error);
        return false;
    }
}

export async function playlistChannelRelationVerification(channels, playlistId, PlaylistChannel){
    const playlistChannelPromises = channels.map(async (channel) => {
        const existingPlaylistChannel = await PlaylistChannel.findOne({
            where: {
                PlayListId: playlistId,
                ChannelId: channel.id
            }
        });

        if (!existingPlaylistChannel) { return { PlayListId: playlistId, ChannelId: channel.id } }
        return null;
    });
    return playlistChannelPromises;
}