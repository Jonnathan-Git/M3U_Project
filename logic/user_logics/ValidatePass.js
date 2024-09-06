import bcrypt from 'bcrypt';
import { ResponseMessage } from "../general/ResponseMessage.js";
import { Error } from "../../lang/es-Es/Messages.js";


/***********************************************************
 * Validates the provided password against the user's password.
 * @param {string} password - The password to validate.
 * @param {string} userPassword - The user's password to compare against.
 * @param {object} res - The response object to send the error message.
 * @returns {void}
 **********************************************************/
export default async function validatePassword(password, userPassword, res) {
    const validPassword = bcrypt.compareSync(password, userPassword);

    if (!validPassword) {
        ResponseMessage(res, 400, Error.user.login.invalidPassword);
    }
}