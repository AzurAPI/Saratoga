const Fetch = require('node-fetch');
const SaratogaUtil = require('../util/SaratogaUtil');
const SaratogaValidator = require('./SaratogaValidator');

/**
 * Manages the local data & cache updates
 * @class SaratogaUpdater
 */
class SaratogaUpdater {
    /**
     * @param  {SaratogaStore} store The updater instance that generated this instance
     */
    constructor(store) {
        /**
         * The updater instance that generated this instance
         * @type {SaratogaStore}
         */
        this.store = store;
        /**
         * If the data directory of this updater is ready to operate
         * @type {Boolean}
         */
        this.dataDirReady = false;
        /**
         * The cron update checker which is responsible for Saratoga#updateAvailable event
         * @type {?Timeout}
         */
        this.cronUpdate = null;
    }

    /**
     * The saratoga instance that generated this instance
     * @type {Saratoga}
     */
    get saratoga() {
        return this.store.saratoga;
    }

    _startCronUpdate() {
        if (!this.saratoga._options.notifyForNewUpdates) return;
        if (!this.cronUpdate) this.saratoga.emit('debug', 'Notify for new updates is enabled, will check every one hour for updates');
        if (this.cronUpdate) {
            clearInterval(this.cronUpdate);
            this.cronUpdate = null;
        }
        this.cronUpdate = setInterval(() => {
            this.checkForUpdate()
                .then((data) => {
                    if (/*data.shipUpdateAvailable || data.equipmentUpdateAvailable()*/data) this.saratoga.emit('updateAvailable', data);
                })
                .catch((error) => this.saratoga.emit('error', error));
        }, 3600000);
    }

    startUpCheck() {
        if (this.dataDirReady) return;
        if (!SaratogaUtil.existSync(SaratogaUtil.folderDataPath())) SaratogaUtil.createDirectorySync(SaratogaUtil.folderDataPath());
        for (const prop of ['versionFilePath', 'shipFilePath', 'equipFilePath', 'chapterFilePath', 'voicelineFilePath', 'barrageFilePath']) {
            if (!SaratogaUtil.existSync( SaratogaUtil[prop]() )) SaratogaUtil.writeFileSync(SaratogaUtil[prop](), JSON.stringify({}));
        }
        this.store.loadShipsCache(JSON.parse(SaratogaUtil.readFileSync(SaratogaUtil.shipFilePath())));
        this.store.loadEquipmentsCache(JSON.parse(SaratogaUtil.readFileSync(SaratogaUtil.equipFilePath())));
        this.store.loadChapterCache(JSON.parse(SaratogaUtil.readFileSync(SaratogaUtil.chapterFilePath())));
        this.store.loadVoicelineCache(JSON.parse(SaratogaUtil.readFileSync(SaratogaUtil.voicelineFilePath())));
        this.store.loadBarrageCache(JSON.parse(SaratogaUtil.readFileSync(SaratogaUtil.barrageFilePath())));
        this.dataDirReady = true;
    }

    /**
     * Updates the Local Files & Cached Data in one method, good for single process scenarios as it's easy. Not for multi sharded programs that has its own Saratoga instance per shard.
     * @memberof SaratogaUpdater
     * @returns {Promise<void>}
     */
    async updateDataAndCache() {
        await this.updateLocalData();
        await this.updateCache();
    }

    /**
     * Checks if there is new updates for ship or equipment data
     * @memberof SaratogaUpdater
     * @returns {Promise<Object>}
     * @example
     * const api = new Saratoga();
     * api.updater.checkForUpdate()
     *   .then((response) => {
     *       if (response.shipUpdateAvailable || response.equipmentUpdateAvailable) console.log('update available');
     *   })
     */
    async checkForUpdate() {
        const dataValidator = new SaratogaValidator();
        await dataValidator.fetch();
        //const shipUpdateAvailable = dataValidator.setType('ships').needsUpdate();
        //const equipmentUpdateAvailable = dataValidator.setType('equipments').needsUpdate();
        //return { shipUpdateAvailable, equipmentUpdateAvailable };
        return dataValidator.needsUpdate();
    }

    /**
     * Updates the Local Files of Saratoga if there is an update
     * @memberof SaratogaUpdater
     * @returns {Promise<void>}
     */
    async updateLocalData() {
        const dataValidator = new SaratogaValidator();
        await dataValidator.fetch();
        if (dataValidator.noLocalData()) {
            await this.updateStoredShips();
            await this.updateStoredEquipments();
            await this.updateStoredChapters();
            await this.updateStoredVoicelines();
            await this.updateStoredBarrages();
            await dataValidator.updateVersionFile();
        } else {
            if (dataValidator/*.setType('ships')*/.needsUpdate()) {
                await this.updateStoredShips();
                await this.updateStoredEquipments();
                await this.updateStoredChapters();
                await this.updateStoredVoicelines();
                await this.updateStoredBarrages();
                await dataValidator.updateVersionFile();
            }
            /*if (dataValidator.setType('equipments').needsUpdate()) {
                await this.updateStoredEquipments();
                await dataValidator.updateVersionFile();
            }*/
        }
    }

    /**
     * Updates the Cached Data, loaded from the local files of Saratoga
     * @memberof SaratogaUpdater
     * @returns {Promise<void>}
     */
    async updateCache() {
        this.store.loadShipsCache(await this.fetchShipsFromLocal());
        this.store.loadEquipmentsCache(await this.fetchEquipmentsFromLocal());
    }

    async updateStoredShips() {
        await this.store.clearShipsData();
        await this.store.updateShipsData(await this.fetchShipsFromRemote());
    }

    async updateStoredEquipments() {
        await this.store.clearEquipmentsData();
        await this.store.updateEquipmentsData(await this.fetchEquipmentsFromRemote());
    }

    async updateStoredChapters() {
        await this.store.clearChapterData();
        await this.store.updateChapterData(await this.fetchChaptersFromRemote());
    }

    async updateStoredVoicelines() {
        await this.store.clearVoicelineData();
        await this.store.updateVoicelineData(await this.fetchVoicelinesFromRemote());
    }

    async updateStoredBarrages() {
        await this.store.clearBarrageData();
        await this.store.updateBarrageData(await this.fetchBarragesFromRemote());
    }

    fetchShipsFromRemote() {
        return Fetch(SaratogaUtil.latestShipDataLink()).then(data => data.text());
    }

    fetchEquipmentsFromRemote() {
        return Fetch(SaratogaUtil.latestEquipmentDataLink()).then(data => data.text());
    }

    fetchChaptersFromRemote() {
        return Fetch(SaratogaUtil.latestChapterDataLink()).then(data => data.text());
    }

    fetchVoicelinesFromRemote() {
        return Fetch(SaratogaUtil.latestVoicelineDataLink()).then(data => data.text());
    }

    fetchBarragesFromRemote() {
        return Fetch(SaratogaUtil.latestBarrageDataLink()).then(data => data.text());
    }

    fetchShipsFromLocal() {
        return SaratogaUtil.readFile(SaratogaUtil.shipFilePath()).then(data => JSON.parse(data));
    }

    fetchEquipmentsFromLocal() {
        return SaratogaUtil.readFile(SaratogaUtil.equipFilePath()).then(data => JSON.parse(data));
    }

    fetchChaptersFromLocal() {
        return SaratogaUtil.readFile(SaratogaUtil.chapterFilePath()).then(data => JSON.parse(data));
    }

    fetchVoicelinesFromLocal() {
        return SaratogaUtil.readFile(SaratogaUtil.voicelineFilePath()).then(data => JSON.parse(data));
    }

    fetchBarragesFromLocal() {
        return SaratogaUtil.readFile(SaratogaUtil.barrageFilePath()).then(data => JSON.parse(data));
    }
}
module.exports = SaratogaUpdater;
