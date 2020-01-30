const SaratogaUpdater = require('../updater/SaratogaUpdater');
const SaratogaUtil = require('../util/SaratogaUtil');

class SaratogaStore {
    constructor(saratoga) {
        this.saratoga = saratoga;
        this.updater = new SaratogaUpdater(this, saratoga);

        // needs a bit of reimplementation for this next 2 lines
        this.updater.updateData()
            .catch(console.error);

        Object.defineProperty(this, '_shipCache', { value: [], writable: true });
        Object.defineProperty(this, '_equipCache', { value: [], writable: true  });
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