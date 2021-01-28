const Fuse = require('fuse.js');
const SaratogaUpdater = require('../updater/SaratogaUpdater');
const ShipExtFilter = require('./SaratogaShips');
const SaratogaShips = require('./SaratogaShips');
const ShipExtAll = require('./SaratogaShips');
const SaratogaEquipments = require('./SaratogaEquipments');
const SaratogaUtil = require('../util/SaratogaUtil');

/**
 * Saratoga, the starting point of this API
 * @class SaratogaStore
 */
class SaratogaStore {
    /**
     * @param  {Saratoga} saratoga The saratoga class that generated this instance
     */
    constructor(saratoga) {
        /**
         * The saratoga instance that generated this instance
         * @type {Saratoga}
         */
        this.saratoga = saratoga;
        /**
         * Ship related getters for this store
         * @type {SaratogaShips}
         */
        this.ships = new SaratogaShips(this);
        this.ships.all = new ShipExtAll(this);
        this.ships.sort = new ShipExtFilter(this);
        /**
         * Equipment related getters for this store
         * @type {SaratogaEquipments}
         */
        this.equipments = new SaratogaEquipments(this);
        /**
         * Chapters related getters for this store
         * @type {SaratogaChapters}
         */
        // this.chapters = new SaratogaChapters TODO
        /**
         * Voiceline related getters for this store
         * @type {SaratogaVoicelines}
         */
        // this.voicelines = new SaratogaVOicelines TODO
        /**
         * Barrage related getters for this store
         * @type {SaratogaBarrages}
         */
        // this.barrages = new SaratogaBarrages TODO
        /**
         * Updater Class for the local data for this store
         * @type {SaratogaUpdater}
         */
        this.updater = new SaratogaUpdater(this);
        /**
         * If this store is already ready to operate
         * @type {Boolean}
         */
        this.ready = false;

        Object.defineProperty(this, '_shipCache', { value: null, writable: true });
        Object.defineProperty(this, '_equipCache', { value: null, writable: true  });
        Object.defineProperty(this, '_chapterCache', { value: null, writable: true  });
        Object.defineProperty(this, '_voicelineCache', { value: null, writable: true  });
        Object.defineProperty(this, '_barrageCache', { value: null, writable: true  });

        this.updater.startUpCheck();
        this.updateOnFirstStartUp()
            .then(() => {
                if (this.saratoga.ready) return;
                this.updater._startCronUpdate();
                this.ready = true;
                this.saratoga.emit('ready');
            })
            .catch((error) =>
                this.saratoga.emit('error', error)
            );
    }

    async updateOnFirstStartUp() {
        if (this.ready) return;
        const update = await this.updater.checkForUpdate();
        //update = update.shipUpdateAvailable || update.equipmentUpdateAvailable;
        if (update || (!this._shipCache || !this._equipCache)) await this.updater.updateDataAndCache();
        this.saratoga.emit('debug', `Loaded ${this._shipCache.list.length} stored ships from ${SaratogaUtil.shipFilePath()}`);
        this.saratoga.emit('debug', `Loaded ${this._equipCache.list.length} stored equipments from ${SaratogaUtil.equipFilePath()}`);
    }

    loadShipsCache(rawShips) {
        if (!rawShips) return;
        rawShips = Object.values(rawShips);
        if (!rawShips.length) return;
        this.clearShipsCache();
        this._shipCache = new Fuse(rawShips, { keys: [ 'names.en', 'names.cn', 'names.jp', 'names.kr', 'names.code' ], threshold: 0.4 });
    }

    loadEquipmentsCache(rawEquips) {
        if (!rawEquips) return;
        rawEquips = Object.values(rawEquips);
        if (!rawEquips.length) return;
        this.clearEquipmentsCache();
        this._equipCache = new Fuse(rawEquips, { keys: [ 'names.en', 'names.cn', 'names.jp', 'names.kr' ], threshold: 0.4 });
    }

    loadChapterCache(rawChapters) {
        if (!rawChapters) return;
        rawChapters = Object.values(Object.values(rawChapters));
        if (!rawChapters.length) return;
        this.clearChapterCache();
        this._chapterCache = new Fuse(rawChapters, { keys: [ 'names.en', 'names.cn', 'names.jp', 'names.kr' ], threshold: 0.4 });
    }

    loadVoicelineCache(rawVoicelines) {
        if (!rawVoicelines) return;
        this.clearVoicelineCache();
        this._voicelineCache = rawVoicelines;
    }

    loadBarrageCache(rawBarrages) {
        if (!rawBarrages) return;
        rawBarrages = Object.values(rawBarrages);
        if (!rawBarrages.length) return;
        this.clearBarrageCache();
        this._barrageCache = new Fuse(rawBarrages, { keys: [ 'id', 'name' ], threshold: 0.4 });
    }

    clearShipsCache() {
        this._shipCache = null;
    }

    clearEquipmentsCache() {
        this._equipCache = null;
    }

    clearChapterCache() {
        this._chapterCache = null;
    }

    clearVoicelineCache() {
        this._voicelineCache = null;
    }

    clearBarrageCache() {
        this._barrageCache = null;
    }

    updateShipsData(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.shipFilePath(), typeof data === 'string' ? data : JSON.stringify(data));
    }

    updateEquipmentsData(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.equipFilePath(), typeof data === 'string' ? data : JSON.stringify(data));
    }

    updateChapterData(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.chapterFilePath(), typeof data === 'string' ? data : JSON.stringify(data));
    }

    updateVoicelineData(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.voicelineFilePath(), typeof data === 'string' ? data : JSON.stringify(data));
    }

    updateBarrageData(data) {
        return SaratogaUtil.writeFile(SaratogaUtil.barrageFilePath(), typeof data === 'string' ? data : JSON.stringify(data));
    }

    clearShipsData() {
        return SaratogaUtil.writeFile(SaratogaUtil.shipFilePath(), JSON.stringify({}));
    }

    clearEquipmentsData() {
        return SaratogaUtil.writeFile(SaratogaUtil.equipFilePath(), JSON.stringify({}));
    }

    clearChapterData() {
        return SaratogaUtil.writeFile(SaratogaUtil.chapterFilePath(), JSON.stringify({}));
    }

    clearVoicelineData() {
        return SaratogaUtil.writeFile(SaratogaUtil.voicelineFilePath(), JSON.stringify({}));
    }

    clearBarrageData() {
        return SaratogaUtil.writeFile(SaratogaUtil.barrageFilePath(), JSON.stringify({}));
    }
}
module.exports = SaratogaStore;
