import { Sequelize } from "sequelize";
import Config from "../config/Config.js";

/***********************************************************
 * Represents the database connection.
 * @type {Sequelize}
 **********************************************************/
const DataBase = new Sequelize(Config.database, Config.user, Config.password,{
    host: Config.host,
    dialect: Config.dialect,
    dialectOptions: {
        options: {
            encrypt: true
        }
    }
});

export default DataBase;