const SaratogaUpdater = require('../updater/SaratogaUpdater');
const SaratogaShips = require('./SaratogaShips');
const SaratogaEquipments = require('./SaratogaEquipments');
const SaratogaUtil = require('../util/SaratogaUtil');

class SaratogaStore {
    constructor(saratoga) {
        this.saratoga = saratoga;
        this.ready = false;
        this.ships = new SaratogaShips(this);
        this.equipments = new SaratogaEquipments(this);
        this.updater = new SaratogaUpdater(this, saratoga);

        Object.defineProperty(this, '_shipCache', { value: [], writable: true });
        Object.defineProperty(this, '_equipCache', { value: [], writable: true  });
    }

    async updateOnFirstStartUp() {
        if (this.ready) return;
        if (!this._shipCache.length || !this._equipCache.length) {
            console.log('No stored data available, trying to update from remote. Next updates must be done manually.');
            const update = await this.updater.checkForUpdate();
            if (update.shipUpdateAvailable || update.equipmentUpdateAvailable) await this.updater.updateDataAndCache();
        }
        console.log(`Loaded ${this._shipCache.length} ships from ${SaratogaUtil.shipFilePath()}.`);
        console.log(`Loaded ${this._equipCache.length} equipments from ${SaratogaUtil.equipFilePath()}`);
        this.ready = true;
    }

    loadShipsCache(rawShips) {
        this.clearShipsCache();
        this._shipCache = Object.values(rawShips);
    }

    loadEquipmentsCache(rawEquips) {
        this.clearEquipmentsCache();
        this._equipCache = Object.values(rawEquips);
    }

    clearShipsCache() {
        if (Array.isArray(this._shipCache)) this._shipCache.length = 0;
    }

    clearEquipmentsCache() {
        if (Array.isArray(this._equipCache)) this._equipCache.length = 0;
    }

    updateShipsData(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.shipFilePath(), typeof data === 'string' ? data : JSON.stringify(data));
    }

    updateEquipmentsData(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.equipFilePath(), typeof data === 'string' ? data : JSON.stringify(data));
    }

    clearShipsData() {
        return SaratogaUtil.writeFile(SaratogaUtil.shipFilePath(), JSON.stringify({}));
    }

    clearEquipmentsData() {
        return SaratogaUtil.writeFile(SaratogaUtil.equipFilePath(), JSON.stringify({}));
    }
}
module.exports = SaratogaStore;