const SaratogaStore = require('./store/SaratogaStore');

class Saratoga {
    constructor() {
        this.store = new SaratogaStore(this);
        // the next two lines may need some adjustments as I see fit.
        this.store.intializeStore()
            .catch(console.error);
    }

    get updater() {
        const { updateDataAndCache, checkForUpdate, updateLocalData, updateCache } = this.store.updater;
        return { updateDataAndCache, checkForUpdate, updateLocalData, updateCache };
    }

    get ready() {
        return this.store.ready && this.store.updater.dataDirReady;
    }

    get ships() {
        if (!this.ready) return null;
        return this.store.ships;
    }

    get equipments() {  
        if (!this.ready) return null;
        return this.store.equipments;
    }
}
module.exports = Saratoga;