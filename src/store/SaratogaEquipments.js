class SaratogaEquipments {
    constructor(store) {
        Object.defineProperty(this, '_store', { value: store, writable: false });
    }

    get cache() {
        if (!this._store._equipCache) return null;
        return this._store._equipCache;
    }

    get rawCache() {
        if (!this.cache) return null;
        return this.cache.list;
    }

    getAllByCategory(category) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.category === category);
    }

    getAllByNationality(nationality) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.nationality === nationality);
    }

    searchByEquipmentName(name) {
        if (!this.cache) return null;
        const possibleEquipments = this.cache.search(name, { limit: 10 });
        if (!possibleEquipments.length) return null;
        return possibleEquipments;
    }
}
module.exports = SaratogaEquipments;
