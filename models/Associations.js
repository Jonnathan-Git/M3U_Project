import User from './db/User.js';
import Channel from './db/Channel.js';
import PlayList from './db/PlayList.js';
import ChannelPlayList from './db/Channel_Playlist.js';


/********************************************************
 * Represents the associations between different models.
 *********************************************************/
class Associations {
    static associate() {
        /**********************************************************
         *This is a one-to-many relationship between the User and PlayList models.  
         *********************************************************/
        User.hasMany(PlayList);
        PlayList.belongsTo(User);


        /**********************************************************
         * This is a one-to-many relationship between the User and Channel models.
         *********************************************************/
        User.hasMany(Channel);
        Channel.belongsTo(User);

        /**********************************************************
         * This is a many-to-many relationship between the Channel and PlayList models.
         * This is done through the Channel_PlayList table.
         *********************************************************/
        PlayList.belongsToMany(Channel, { through: ChannelPlayList });
        Channel.belongsToMany(PlayList, { through: ChannelPlayList });
    }
}

export default Associations;