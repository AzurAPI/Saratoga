const EventEmitter = require('events');
const SaratogaStore = require('./store/SaratogaStore');

/**
 * 本APIの出発点
 * Saratoga, the starting point of this API
 * @class Saratoga
 * @extends {EventEmitter}
 */
class Saratoga extends EventEmitter {
    /**
     * @param  {Object} options Object with a single parameter, which is notifyForNewUpdates, which is a boolean
     */
    constructor(options = { notifyForNewUpdates: false }) {
        super();
        /**
         * キャッシュデータの管理
         * Contains methods and props for managing cached data
         * @type {SaratogaStore}
         */
        this.store = new SaratogaStore(this);
        Object.defineProperty(this, '_options', { value: options });
    }

    /**
     * デバッグデータがあるときに発せられる
     * Emitted when there is a debug data
     * @event Saratoga#debug
     * @param {string} message Debug message 資料
     * @memberof Saratoga
     */
    /**
     * エラーが発生したときに発せられる
     * Emitted when there is a pesky error
     * @event Saratoga#error
     * @param {Error} error The error encountered.
     * @memberof Saratoga
     * @example
     * Saratoga.on('error', console.error);
     */
    /**
     * 更新があったときに発せられる
     * Emitted when there is an update available for local data. Only available when Saratoga is initialized with notifyForNewUpdates set to true
     * @event Saratoga#updateAvailable
     * @param {Object} data What data needs updating
     * @memberof Saratoga
     * @example
     * Saratoga.on('updateAvailable', (data) => {
     *      if (data.shipUpdateAvailable || data.equipmentUpdateAvailable) {
     *        // handle update
     *      }
     * })
     */
    /**
     * 準備ができたときに発せられる
     * Emitted when Saratoga is ready
     * @event Saratoga#ready
     * @memberof Saratoga
     */

    /**
     * アップデータ
     * Contains methods for updating Saratoga's local data & cache
     * @type {SaratogaUpdater}
     */
    get updater() {
        return this.store.updater;
    }

    /**
     * 状態
     * If Saratoga is ready to operate
     * @type {Boolean}
     */
    get ready() {
        return this.store.ready && this.store.updater.dataDirReady;
    }

    /**
     * 船のデータを取得する
     * Azur Lane's Ship related getter methods
     * @type {SaratogaShips}
     */
    get ships() {
        if (!this.ready) return null;
        return this.store.ships;
    }

    /**
     * 装置のデータを取得する
     * Azur Lane's Equipment related getter methods
     * @type {SaratogaEquipments}
     */
    get equipments() {
        if (!this.ready) return null;
        return this.store.equipments;
    }
    /**
     * チャプターのデータを取得する
     * Chapters related getters for this store
     * @type {SaratogaChapters}
     */
    get chapters() {
        if (!this.ready) return null;
        return this.store.chapters;
    }
    /**
     * ボイスラインのデータを取得する
     * Voiceline related getters for this store
     * @type {SaratogaVoicelines}
     */
    get voicelines() {
        if (!this.ready) return null;
        return this.store.voicelines;
    }
    /**
     * 連打のデータを取得する
     * Barrage related getters for this store
     * @type {SaratogaBarrages}
     */
    get barrages() {
        if (!this.ready) return null;
        return this.store.barrages;
    }
    /**
     * 旧船のデータを取得する
     * Azur Lane's Ship related getter methods with legacy API
     * @type {SaratogaLegacyShips}
     */
    get legacyShips() {
        if (!this.ready) return null;
        return this.store.legacyShips;
    }
    /**
     * 旧装置のデータを取得する
     * Azur Lane's Equipment related getter methods with legacy API
     * @type {SaratogaLegacyEquipments}
     */
    get legacyEquipments() {
        if (!this.ready) return null;
        return this.store.legacyEquipments;
    }
}
module.exports = Saratoga;
