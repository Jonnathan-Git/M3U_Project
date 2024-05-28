import Channel from "../../models/db/Channel.js";
import { Success, Error } from "../../lang/es-Es/Messages.js";
import { ResponseMessage } from "../general/ResponseMessage.js";
import { verifyUrlChannels } from "./VerifyChannels.js";


class ChannelLogic{

    async createChannel(req, res) {

        const {body} = req;
        try {
            if (!await verifyUrlChannels(body.url, Channel)) {
                ResponseMessage(res, 400, Error.create);
                return;
            }
            
            const channel = await Channel.create(body);
            ResponseMessage(res, 201, Success.create, channel);

        } catch {
            ResponseMessage(res, 400, Error.create);
        }
    }

}
export default ChannelLogic;