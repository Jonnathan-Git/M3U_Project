import fs from 'fs';
/***********************************************************
 * Contains the raw data read from the config.json file.
 * @type {Buffer}
 **********************************************************/
const rawData = fs.readFileSync('./config/config.json');
//const Config = JSON.parse(rawData).development;
const Config = JSON.parse(rawData).production;

export default Config;
