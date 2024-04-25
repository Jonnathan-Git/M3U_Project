import User from '../../models/db/User.js';
import Auth from '../../middlewares/Auth.js';
import { ResponseMessage } from '../general/ResponseMessage.js';
import { Error, Success } from '../../lang/es-Es/Messages.js';
import bcrypt from 'bcrypt';
import validatePassword from './ValidatePass.js';

class UserLogic {

    constructor() {
        this.auth = new Auth();
    }

    /***********************************************************
     * Retrieves a user by their ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the user is retrieved.
     **********************************************************/
    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findOne({
                where: { id },
                attributes: { exclude: ['password', 'hint'] },
            });

            if (!user) {
                return ResponseMessage(res, 404, Error.notFound);
            }
            ResponseMessage(res, 200, Success.get, user);
        } catch (error) {
            ResponseMessage(res, 500, Error.get);
        }
    }

    /***********************************************************
     * Creates a new user.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the user is created.
     **********************************************************/
    async createUser(req, res) {
        const { body } = req;
        try {
            const emailExists = await User.findOne({ where: { email: body.email } });
            if (emailExists) {
                return ResponseMessage(res, 400, Error.user.emailExists);
            }

            body.password = bcrypt.hashSync(body.password, 10);
            const user = await User.create(body);

            ResponseMessage(res, 201, Success.create, user);
        } catch (error) {
            ResponseMessage(res, 500, Error.create);
        }
    }

    /***********************************************************
    * Updates a user in the database.
    *
    * @param {Object} req - The request object.
    * @param {Object} res - The response object.
    * @returns {Promise<void>} - A promise that resolves when the user is updated.
    **********************************************************/
    async updateUser(req, res) {
        const { body } = req;
        try {
            const user = await User.findByPk(body.id);
            if (!user) {
                return ResponseMessage(res, 404, Error.notFound);
            }

            const updatedFields = this.updateFields(body,user);

            await User.update(updatedFields, { where: { id: body.id } });
            ResponseMessage(res, 200, Success.update, body);
        } catch (error) {
            ResponseMessage(res, 500, error.message);
        }
    }

    /***********************************************************
     * Deletes a user by their ID.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the user is deleted.
     **********************************************************/
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return ResponseMessage(res, 404, Error.user.notFound);
            }
            await User.destroy({ where: { id } });
            ResponseMessage(res, 200, Success.delete);
        } catch (error) {
            ResponseMessage(res, 500, Error.delete);
        }
    }

    /***********************************************************
     * Logs in a user.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the user is logged in.
     **********************************************************/
    async loginUser(req, res) {
        const { body } = req;
        try {
            const user = await User.findOne({ where: { email: body.email } });
            if (!user) {
                return ResponseMessage(res, 404, Error.user.notFound);
            }

            validatePassword(body.password, user.password, res);

            const token = await this.auth.CreateAuthToken(user.id);

            ResponseMessage(res, 200, Success.login, {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email
            }, token);
        } catch (error) {

        }
    }

    /***********************************************************
     * Updates the fields of a user object based on the provided body object.
     * @param {Object} body - The object containing the updated field values.
     * @param {Object} user - The user object to be updated.
     * @returns {Object} - An object containing the updated fields.
     **********************************************************/
    updateFields(body,user) {
        // create a object to store the updated fields
        const updatedFields = {};
        
         // get the keys of the body object
         const keys = Object.keys(body);
 
         // iterate over the keys
         keys.forEach(key => {
             if (user[key] !== body[key]) {
                 // if the fiels is different from the user object (object in the database)
                 // then add the field to the updatedFields object
                 updatedFields[key] = body[key];
             }
         });
         
         return updatedFields;
    }
}

export default UserLogic;