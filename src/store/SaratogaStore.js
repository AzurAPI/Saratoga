const SaratogaUpdater = require('../updater/SaratogaUpdater');
const SaratogaUtil = require('../util/SaratogaUtil');

class SaratogaStore {
    constructor(saratoga) {
        this.saratoga = saratoga;
        this.updater = new SaratogaUpdater(this, saratoga);

        // needs a bit of reimplementation for this next 2 lines
        this.updater.update()
            .catch(console.error);

        Object.defineProperty(this, '_shipCache', { value: [], writable: true });
        Object.defineProperty(this, '_equipCache', { value: [], writable: true  });
    }

    loadShipCache() {
        // soon
    }

    loadEquipmentCache() {
        // soon
    }

    clearShipCache() {
        this._shipCache.length = 0;
    }

    clearEquipmentCache() {
        this._equipCache.length = 0;
    }

    updateVersionFile(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.versionFilePath, JSON.stringify(data));
    }

    updateShipData(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.shipFilePath, JSON.stringify(data));
    }

    updateEquipmentData(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.equipFilePath, JSON.stringify(data));
    }

    clearVersionFile() {
        return SaratogaUtil.writeFile(SaratogaUtil.versionFilePath, JSON.stringify({}));
    }

    clearShipData() {
        return SaratogaUtil.writeFile(SaratogaUtil.shipFilePath, JSON.stringify({}));
    }

    clearEquipmentData() {
        return SaratogaUtil.writeFile(SaratogaUtil.equipFilePath, JSON.stringify({}));
    }
}
module.exports = SaratogaStore;