import GroupLogic from "../logic/group_logics/Group.js";

class GroupController {
    constructor() {
        this.groupLogic = new GroupLogic();
    }

    getGroup = async (req, res) => {
        this.groupLogic.getGroup(req, res);
    }

    getGroups = async (req, res) => {
        this.groupLogic.getGroups(req, res);
    }

    addGroup = async (req, res) => {
        this.groupLogic.addGroup(req, res);
    }

    updateGroup = async (req, res) => {
        this.groupLogic.updateGroup(req, res);
    }

    deleteGroup = async (req, res) => {
        this.groupLogic.deleteGroup(req, res);
    }

}

export default GroupController;