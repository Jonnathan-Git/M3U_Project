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
        this.route_group.get('/all/:idPlaylist', this.controller.getGroups);
        this.route_group.get('/:id', this.controller.getGroup);
        this.route_group.post('/', this.controller.addGroup);
        this.route_group.put('/', this.controller.updateGroup);
        this.route_group.delete('/:id/:playListId', this.controller.deleteGroup);
    }

    getRoutes(){
        return this.route_group;
    }
}

export default GroupRoutes;
