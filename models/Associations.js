import User from './db/User.js';
import Channel from './db/Channel.js';
import PlayList from './db/Playlist.js';


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
        PlayList.hasMany(Channel);
        Channel.belongsTo(PlayList);
    }
}

export default Associations;