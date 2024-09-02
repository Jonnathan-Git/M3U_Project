import express from 'express';
import cors from 'cors';
import Config from '../config/Config.js';
import DataBase from '../database/Connection.js';
import UserRoutes from '../routes/UserRoutes.js';
import ChannelRoutes from '../routes/ChannelRoutes.js';
import PlaylistRoutes from '../routes/PlayListRoutes.js';
import GroupRoutes from '../routes/GroupRoutes.js';
import Associations from './Associations.js';

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || Config.PORT;
        this.userRoutes = new UserRoutes();
        this.PlaylistRoutes = new PlaylistRoutes();
        this.ChannelRoutes = new ChannelRoutes();
        this.groupRoutes = new GroupRoutes();
        this.DataBaseConnection();
        Associations.associate();
        this.middlewares();
        this.routes();

    }

    /**********************************************************
     * This method will set up the middleware that will
     * be used to handle the requests.
     ********************************************************/
    middlewares() {
        this.app.use(cors({
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            // origin: 'http://localhost:3000'
        }));

        //Reading and parsing of the body
        this.app.use(express.json());
        //public folder
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));

        //Error handling
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Error interno del servidor');
        });
    }

    /*********************************************************
     * This method will start the server on the port
     * that was set in the constructor.
     ********************************************************/
    start() {
        this.app.listen(this.port, () => {
            console.log(`app is running on http://localhost:${this.port}`);
        });
    }

    routes() {
        this.app.use(Config.path.user, this.userRoutes.getRoutes());
        this.app.use(Config.path.playlist, this.PlaylistRoutes.getRoutes());
        this.app.use(Config.path.channel, this.ChannelRoutes.getRoutes());
        this.app.use(Config.path.group, this.groupRoutes.getRoutes());
    }

    /**************************************************
     * This method will connect to the database using
     * the credentials that are set in the config file.
     **************************************************/
    async DataBaseConnection() {
       try {
        await DataBase.authenticate();
       // DataBase.sync({ force: true });
        console.log('Connection has been established successfully.');
       } catch (error) {
        console.error('Unable to connect to the database:', error);
       }
    }
}

export default Server;