const SaratogaUpdater = require('../updater/SaratogaUpdater');
const SaratogaShips = require('./SaratogaShips');
const SaratogaEquipments = require('./SaratogaEquipments');
const SaratogaUtil = require('../util/SaratogaUtil');

class SaratogaStore {
    constructor(saratoga) {
        this.saratoga = saratoga;
        this.ships = new SaratogaShips(this);
        this.equipments = new SaratogaEquipments(this);
        this.updater = new SaratogaUpdater(this, saratoga);
        this.ready = false;

        Object.defineProperty(this, '_shipCache', { value: [], writable: true });
        Object.defineProperty(this, '_equipCache', { value: [], writable: true  });
    }

    async intializeStore() {
        if (this.ready) return;
        await this.updater.updateDataAndCache();
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
        this._shipCache.length = 0;
    }

    clearEquipmentsCache() {
        this._equipCache.length = 0;
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