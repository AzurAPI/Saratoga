const EventEmitter = require('events');
const SaratogaStore = require('./store/SaratogaStore');

/**
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
         * Contains methods and props for managing cached data
         * @type {SaratogaStore}
         */
        this.store = new SaratogaStore(this);
        Object.defineProperty(this, '_options', { value: options });
    }

    /**
     * Emitted when there is a debug data
     * @event Saratoga#debug
     * @param {string} message Debug message
     * @memberof Saratoga
     */
    /**
     * Emitted when there is a pesky error
     * @event Saratoga#error
     * @param {Error} error The error encountered.
     * @memberof Saratoga
     * @example
     * Saratoga.on('error', console.error);
     */
    /**
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
     * Emitted when Saratoga is ready
     * @event Saratoga#ready
     * @memberof Saratoga
     */

    /**
     * Contains methods for updating Saratoga's local data & cache
     * @type {SaratogaUpdater}
     */
    get updater() {
        return this.store.updater;
    }

    /**
     * If Saratoga is ready to operate
     * @type {Boolean}
     */
    get ready() {
        return this.store.ready && this.store.updater.dataDirReady;
    }

    /**
     * Azur Lane's Ship related getter methods
     * @type {SaratogaShips}
     */
    get ships() {
        if (!this.ready) return null;
        return this.store.ships;
    }

    /**
     * Azur Lane's Equipment related getter methods
     * @type {SaratogaEquipments}
     */
    get equipments() {
        if (!this.ready) return null;
        return this.store.equipments;
    }
}
module.exports = Saratoga;
