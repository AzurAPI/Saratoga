const SaratogaStore = require('./store/SaratogaStore');
const SaratogaUpdater = require('./updater/SaratogaUpdater');

class Saratoga {
    constructor() {
        this.store = new SaratogaStore(this);
        this.updater = new SaratogaUpdater(this);
    }
}
module.exports = Saratoga;