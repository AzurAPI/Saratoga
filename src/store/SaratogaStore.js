const SaratogaUpdater = require('../updater/SaratogaUpdater');

class SaratogaStore {
    constructor(saratoga) {
        this.saratoga = saratoga;
        this.updater = new SaratogaUpdater(this, saratoga);

        Object.defineProperty(this, '_shipCache', { value: [] });
        Object.defineProperty(this, '_equipCache', { value: [] });
    }
}
module.exports = SaratogaStore;