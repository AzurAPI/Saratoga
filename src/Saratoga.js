const SaratogaStore = require('./store/SaratogaStore');

class Saratoga {
    constructor() {
        this.store = new SaratogaStore(this);
        this.store.intializeStore();
    }

    get ships() {
        if (!this.store._isReady) return null;
        return this.store.ships;
    }

    get equipments() {
        if (!this.store._isReady) return null;
        return this.store.equipments;
    }
}
module.exports = Saratoga;