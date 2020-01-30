class SaratogaEquipments {
    constructor(store) {
        this.store = store;
    }

    get cache() {
        return this.store._equipCache;
    }

    getByEnglishName(name) {
        return this.cache.find(d => d.names.en === name);
    }
}
module.exports = SaratogaEquipments;