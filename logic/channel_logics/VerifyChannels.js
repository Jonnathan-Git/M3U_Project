export async function verifyUrlChannels(url, Channel) {
    const repeatchannel = await Channel.findOne({where:{ url: url }});
    return repeatchannel ? false : true;
}

export async function verifyActiveUrlChannels() {

}