class SaratogaShips {
    constructor(store) {
        this.store = store;
    }

    get cache() {
        return this.store._shipCache;
    }

    getByEnglishName(name) {
        return this.cache.find(d => d.names.en === name);
    }
}
module.exports = SaratogaShips;