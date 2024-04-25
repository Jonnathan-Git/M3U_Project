import jwt from 'jsonwebtoken';
import { Error } from '../lang/es-Es/Messages.js';
import { ResponseMessage } from '../logic/general/ResponseMessage.js';
import Config from '../config/Config.js';

class Auth{
    constructor() {}

    /*********************************************************
     * This function will create a token that will be used
     * to authenticate the user.
     * @param {*} uid 
     * @returns the new token
     ********************************************************/
    CreateAuthToken = (uid) =>{
        return new Promise((resolve, reject) => {
            const payload = { uid };
            jwt.sign(payload, Config.autorization.secret_key, {
                expiresIn: '2h'
            }, (err, token) => {
                if (err) {
                    console.error(err);
                    reject('No se pudo generar el token');
                }
                resolve(token);
            });
        });
    }

    /***********************************************************
     * This function will authenticate the token that was sent
     * by the client.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @response 401 if the token is not valid or if the token is not sent
     * @response 200 if the token is valid 
     **********************************************************/
    static AuthenticateToken = (req, res, next) => {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return ResponseMessage(res, 401, Error.user.unauthorized);
        }
    
        try {
            const { uid } = jwt.verify(token, Config.autorization.secret_key);
            req.uid = uid;
            next();
        } catch (error) {
            return ResponseMessage(res, 401, Error.user.unauthorized);
        }
    }

    /***********************************************************
     * Verifies the authenticity and expiration of a token.
     * @param {string} token - The token to be verified.
     * @returns {string|null} - The user ID if the token is valid and not expired, otherwise null.
     **********************************************************/
    verifyToken = (token) => {
        try {
            const decodedToken = jwt.verify(token, Config.autorization.secret_key);
            const { exp, uid } = decodedToken;
            
            // Obtener la fecha actual en segundos
            const currentTimestamp = Math.floor(Date.now() / 1000);
            
            // Verificar si el token ha expirado comparando con la fecha actual
            if (exp && currentTimestamp > exp) {
                return ResponseMessage(401, Error.user.tokenExpired);
            }
            
            return uid;
        } catch (error) {
            console.error("Error al verificar el token:", error);
            return null;
        }
    }
}

export default Auth;