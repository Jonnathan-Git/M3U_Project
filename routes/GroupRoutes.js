import { Router } from "express";
import GroupController from "../controllers/GroupController.js";
import Auth from "../middlewares/Auth.js";

class GroupRoutes {
    constructor(){
        this.route_group = Router();    
        this.controller = new GroupController();
        this.init();
    }

    init(){
        this.route_group.get('/all/:idPlaylist',Auth.AuthenticateToken, this.controller.getGroups);
        this.route_group.get('/:id',Auth.AuthenticateToken, this.controller.getGroup);
        this.route_group.post('/',Auth.AuthenticateToken, this.controller.addGroup);
        this.route_group.put('/',Auth.AuthenticateToken, this.controller.updateGroup);
        this.route_group.delete('/:id/:playListId',Auth.AuthenticateToken, this.controller.deleteGroup);
    }

    getRoutes(){
        return this.route_group;
    }
}

export default GroupRoutes;
