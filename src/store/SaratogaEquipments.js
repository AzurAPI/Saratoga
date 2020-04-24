/**
 * Equipment related getters for Saratoga
 * @class SaratogaEquipments
 */
class SaratogaEquipments {
    /**
     * @param  {SaratogaStore} store The updater instance that generated this instance
     */
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

    /**
     * Lists the equipments by category
     * @param {string} category name of the category you want to search for
     * @memberof SaratogaEquipments
     * @returns {Array<Equipment> | null}
     */
    getAllByCategory(category) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.category === category);
    }

    /**
     * Lists the equipments by nationality
     * @param {string} nationality naitionality name of the equipments you want to search for
     * @memberof SaratogaEquipments
     * @returns {Array<Equipment> | null}
     */
    getAllByNationality(nationality) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.nationality === nationality);
    }

    /**
     * Searches for a specific equipment. (EN, CN, JP, KR names are supported)
     * @param {string} name name of the equipment you want to search for
     * @param {number} [limit=10] limit of the search results
     * @memberof SaratogaEquipments
     * @returns {Equipment | null}
     */
    searchByEquipmentName(name, limit = 10) {
        if (!this.cache) return null;
        const possibleEquipments = this.cache.search(name, { limit });
        if (!possibleEquipments.length) return null;
        return possibleEquipments;
    }
}
module.exports = SaratogaEquipments;
