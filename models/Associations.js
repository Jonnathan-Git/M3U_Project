import User from './db/User.js';
import Channel from './db/Channel.js';
import PlayList from './db/Playlist.js';
import Group from './db/Group.js';
import PlaylistChannel from './db/PlaylistChannel.js';
import UserChannel from './db/UserChannel.js'


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
        /* PlayList.hasMany(Channel);
        Channel.belongsTo(PlayList); */
        
        PlayList.belongsToMany(Channel, {
            through: PlaylistChannel
        });
        Channel.belongsToMany(PlayList, {
            through: PlaylistChannel
        });

        /**********************************************************
         * This is a one-to-many relationship between the User and Group models.
         * *******************************************************/
        Group.hasMany(Channel);
        Channel.belongsTo(Group);

        PlayList.hasMany(Group);
        Group.belongsTo(PlayList);

        User.belongsToMany(Channel, {through: UserChannel});
        Channel.belongsToMany(User, {through: UserChannel});

    }
}

export default Associations;