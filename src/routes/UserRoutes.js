import { Router } from "express";
import UserController from "../controllers/UserController.js";
import Auth from "../middlewares/Auth.js";

class UserRoutes {

    constructor() {
        this.router_user = Router();
        this.controller = new UserController();
        this.init();
    }

    /***********************************************************
     * Initializes the user routes.
     **********************************************************/
    init() {
        // Route to login
        this.router_user.post('/login', this.controller.login);
        // Route to get a user
         this.router_user.get('/:id', Auth.AuthenticateToken, this.controller.getUserById);
        // Route to create a user
        this.router_user.post('/', this.controller.createUser);
        // Route to update a user
        this.router_user.put('/', Auth.AuthenticateToken, this.controller.updateUser);
        // Route to delete a user
        this.router_user.delete('/:id', Auth.AuthenticateToken, this.controller.deleteUser);
    }

    /***********************************************************
     * Get the routes for the user.
     * @returns {Router} The user router.
     **********************************************************/
    getRoutes() {
        return this.router_user;
    }

}

export default UserRoutes;