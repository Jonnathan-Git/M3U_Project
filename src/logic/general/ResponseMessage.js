import Response from "../../models/Response.js";

/***********************************************************
 * Sends a response message with the specified status and message.
 * @param {object} res - The response object.
 * @param {number} status - The status code of the response.
 * @param {string} message - The message to be sent in the response.
 **********************************************************/
export function ResponseMessage (res,status, message){
    res.status(status).json(new Response(status, message));
}

/***********************************************************
 * Sends a response message with data to the client.
 * @param {Object} res - The response object.
 * @param {number} status - The HTTP status code.
 * @param {string} message - The response message.
 * @param {any} data - The data to be sent in the response.
 * @param {string|null} token - The token (optional).
 **********************************************************/
export function ResponseMessageWithData (res,status, message, data,token = null){
    res.status(status).json(new Response(status, message, data, token));
}

//probgar el de arriba a ver si funca
export function ResponseMessageWithDataAndToken (res,status, message,data, token){
    res.status(status).json(new Response(status, message, data, token));
}