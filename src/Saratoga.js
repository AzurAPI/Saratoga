const SaratogaStore = require('./store/SaratogaStore');

class Saratoga {
    constructor() {
        this.store = new SaratogaStore(this);
        // the next two lines may need some adjustments as I see fit.
        this.store.intializeStore()
            .catch(console.error);
    }
    
    get updater() {
        return { 
            updateDataAndCache: this.store.updater.updateDataAndCache, 
            checkForUpdate: this.store.updater.checkForUpdate, 
            updateLocalData: this.store.updater.updateLocalData, 
            updateCache: this.store.updater.updateLocalData 
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