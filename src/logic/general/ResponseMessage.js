import Response from "../../models/Response.js";

/***********************************************************
 * Sends a response message with the specified status and message data to the client.
 * @param {Object} res - The response object.
 * @param {number} status - The HTTP status code.
 * @param {string} message - The response message.
 * @param {any} data - The data to be sent in the response.
 * @param {string|null} token - The token (optional).
 **********************************************************/
export function ResponseMessage (res,status, message, data,token){
    res.status(status).json(new Response(status, message, data, token));
}