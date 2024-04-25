import UserLogic from "../logic/user_logics/User.js";

/**
 * Controller class for handling user-related operations.
 */
class UserController {
    
    constructor() {
        this.userLogic = new UserLogic();
    }

    /***********************************************************
     * Retrieves a user by their ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     **********************************************************/
    getUserById = async (req, res) => {
        await this.userLogic.getUserById(req, res);
    }   

    /***********************************************************
     * Creates a new user.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     **********************************************************/
    createUser = async (req, res) => {
        await this.userLogic.createUser(req, res);
    }

    /***********************************************************
     * Updates an existing user.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     **********************************************************/
    updateUser = async (req, res) => {
       await this.userLogic.updateUser(req, res);
    }

    /***********************************************************
     * Deletes a user.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     **********************************************************/
    deleteUser = async (req, res) => {
       await this.userLogic.deleteUser(req, res);
    }

    /***********************************************************
     * Handles user login.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     **********************************************************/
    login = async (req, res) => {
       await this.userLogic.loginUser(req, res);
    }
}

export default UserController;