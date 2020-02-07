const SaratogaStore = require('./store/SaratogaStore');

class Saratoga {
    constructor() {
        this.store = new SaratogaStore(this);
        this.store.updater.startUpCheck();
        this.store.updateOnFirstStartUp();
    }

    get updater() {
        const { updateDataAndCache, checkForUpdate, updateLocalData, updateCache } = this.store.updater;
        return { 
            updateDataAndCache: updateDataAndCache.bind(this.store.updater), 
            checkForUpdate: checkForUpdate.bind(this.store.updater), 
            updateLocalData: updateLocalData.bind(this.store.updater), 
            updateCache: updateCache.bind(this.store.updater) 
        };
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