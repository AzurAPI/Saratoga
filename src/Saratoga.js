const SaratogaStore = require('./store/SaratogaStore');

class Saratoga {
    constructor() {
        this.store = new SaratogaStore(this);
        // the next two lines may need some adjustments as I see fit.
        this.store.intializeStore()
            .catch(console.error);
    }

    get ready() {
        return this.store._isReady;
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