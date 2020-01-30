const { readFile, writeFileSync, existsSync, writeFile, mkdirSync, access, constants } = require('fs');
const { promisify } = require('util');
const { join } = require('path');

const promise = {
    read: promisify(readFile),
    write: promisify(writeFile),
    access: promisify(access)
};

const remoteLinks = {
    version: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/version-info.json',
    ships: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json',
    equipment: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/equipments.json'
};

const dataFilePath = {
    ship: join(__dirname, '../data', 'ship.json'),
    equipment: join(__dirname, '../data', 'equipment.json')
};

const versionFilePath = join(__dirname, '../data', 'version.json');

const folderPath = join(__dirname, '../data');

/*
 * Sync methods are ONLY to be used at program startup and will never be used while the program is running
 */
class SaratogaUtil {
    static folderDataPath() {
        return folderPath;
    }

    static versionFilePath() {
        return versionFilePath;
    }

    static shipFilePath() {
        return dataFilePath.ship;
    }

    static equipFilePath() {
        return dataFilePath.equipment;
    }

    static latestVersionDataLink() {
        return remoteLinks.version;
    }

    static latestShipDataLink() {
        return remoteLinks.ships;
    }

    static latestEquipmentDataLink() {
        return remoteLinks.equipment;
    }

    static existSync(path) {
        return existsSync(path);
    }

    static existsFile(path) {
        return promise.access(path, constants.F_OK | constants.W_OK)
            .then(() => true)
            .catch(error => {
                if (error.code === 'ENOENT') return false;
                throw error;
            });
    }

    static readFile(path) {
        return promise.read(path);
    }

    static writeFileSync(path, data) {
        return writeFileSync(path, data);
    }

    static writeFile(path, data) {
        return promise.write(path, data);
    }

    static createDirectorySync(path) {
        return mkdirSync(path);
    }
}
module.exports = SaratogaUtil;