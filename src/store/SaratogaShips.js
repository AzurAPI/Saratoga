class SaratogaShips {
    constructor(store) {
        Object.defineProperty(this, '_store', { value: store, writable: false });
    }

    get cache() {
        if (!this._store._shipCache) return null;
        return this._store._shipCache;
    }

    get rawCache() {
        if (!this.cache) return null;
        return this.cache.list;
    }

    getAllByClass(shipClass) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.class === shipClass);
    }

    getAllByNationality(nationality) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.nationality === nationality);
    }

    getAllByHullType(hullType) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.hullType === hullType);
    }

    getAllByRarity(rarity) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.rarity === rarity);
    }

    getById(id) {
        if (!this.rawCache) return null;
        return this.rawCache.find(d => d.id === id);
    }

    searchShipByName(name) {
        if (!this.cache) return null;
        const possibleShips = this.cache.search(name,  { limit: 10 });
        if (!possibleShips.length) return null;
        return possibleShips;
    }
}
module.exports = SaratogaShips;
