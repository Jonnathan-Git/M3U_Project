import User from './db/User.js';
import Channel from './db/Channel.js';
import PlayList from './db/PlayList.js';


class Associations {
    static associate() {
        User.hasMany(PlayList);
        PlayList.belongsTo(User);

        User.hasMany(Channel);
        Channel.belongsTo(User);

        PlayList.belongsToMany(Channel, { through: 'Channel_PlayList' });
        Channel.belongsToMany(PlayList, { through: 'Channel_PlayList' });
    }
}

export default Associations;