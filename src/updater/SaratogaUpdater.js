const Fetch = require('node-fetch');
const SaratogaUtil = require('../util/SaratogaUtil');
const SaratogaValidator = require('./SaratogaValidator');

class SaratogaUpdater {
    constructor(store, saratoga) {
        this.saratoga = saratoga;
        this.store = store;
        this.checked = false;

        this.startUpCheck();
    }

    // a sync method to avoid accessing files that doesn't exist
    startUpCheck() {
        if (this.checked) return;
        const props = ['versionFilePath', 'shipFilePath', 'equipFilePath'];
        for (const prop of props) {
            if (!SaratogaUtil.existSync(SaratogaUtil[prop]())) SaratogaUtil.writeFileSync(SaratogaUtil[prop](), JSON.stringify({}));
        }
        this.checked = true;
    }

    // used to check for update w/o writing. Example: Use this function first before invoking updateData()
    async checkForUpdate() {
        const dataValidator = new SaratogaValidator();
        await dataValidator.fetch(false);
        const shipUpdateAvailable = dataValidator.setType('ships').needsUpdate();
        const equipmentUpdateAvailable = dataValidator.setType('equipments').needsUpdate();
        return { shipUpdateAvailable, equipmentUpdateAvailable };
    }

    async updateData() {
        const dataValidator = new SaratogaValidator();
        await dataValidator.fetch();
        if (dataValidator.noLocalData()) {
            await this.updateStoredShips();
            await this.updateStoredEquipments();
            await dataValidator.updateVersionFile();
        } else {
            if (dataValidator.setType('ships').needsUpdate()) {
                await this.updateStoredShips();
                await dataValidator.updateVersionFile();
            }
            if (dataValidator.setType('equipments').needsUpdate()) {
                await this.updateStoredEquipments();
                await dataValidator.updateVersionFile();
            }
        }
        this.store.loadShipsCache(await this.fetchShipsFromLocal());
        this.store.loadEquipmentsCache(await this.fetchEquipmentsFromLocal());
        console.log(`Loaded ${this.store._shipCache.length} ships from database.`);
        console.log(`Loaded ${this.store._equipCache.length} equipments from database.`);
    }

    async updateStoredShips() {
        await this.store.clearShipsData();
        await this.store.updateShipsData(await this.fetchShipsFromRemote());
    }

    async updateStoredEquipments() {
        await this.store.clearEquipmentsData();
        await this.store.updateEquipmentsData(await this.fetchEquipmentsFromRemote());
    }

    fetchShipsFromRemote() {
        return Fetch(SaratogaUtil.latestShipDataLink()).then(data => data.text());
    }

    fetchEquipmentsFromRemote() {
        return Fetch(SaratogaUtil.latestEquipmentDataLink()).then(data => data.text());
    }

    fetchShipsFromLocal() {
        return SaratogaUtil.readFile(SaratogaUtil.shipFilePath()).then(data => JSON.parse(data));
    }

    fetchEquipmentsFromLocal() {
        return SaratogaUtil.readFile(SaratogaUtil.equipFilePath()).then(data => JSON.parse(data));
    }
}
module.exports = SaratogaUpdater;