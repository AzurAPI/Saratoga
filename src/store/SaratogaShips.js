/**
 * Ship related getters for Saratoga
 * @class SaratogaShips
 */
class SaratogaShips {
    /**
     * @param  {SaratogaStore} store The updater instance that generated this instance
     */
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

    /**
     * Lists all the ships that matches a specific shjp class
     * @param {string} shipClass class of the ship you want to search for (Case Sensitive)
     * @memberof SaratogaShips
     * @returns {Array<Ship> | null}
     */
    getAllByClass(shipClass) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.class === shipClass);
    }

    /**
     * Lists all the ships that matches a specific ship nationality
     * @param {string} nationality nationality of the ship you want to search for (Case Sensitive)
     * @memberof SaratogaShips
     * @returns {Array<Ship> | null}
     */
    getAllByNationality(nationality) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.nationality === nationality);
    }

    /**
     * Lists all the ships that matches a specific ship hull type
     * @param {string} hullType hullType of the ship you want to search for (Case Sensitive)
     * @memberof SaratogaShips
     * @returns {Array<Ship> | null}
     */
    getAllByHullType(hullType) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.hullType === hullType);
    }

    /**
     * Lists all the ship that matches a specific rarity
     * @param {string} rarity rarity of the ship you want to search for (Case Sensitive)
     * @memberof SaratogaShips
     * @returns {Array<Ship> | null}
     */
    getAllByRarity(rarity) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.rarity === rarity);
    }

    /**
     * Fetches a specific ship via its id
     * @param {number} id id of the ship you want to fetch
     * @memberof SaratogaShips
     * @returns {Ship | null}
     */
    getById(id) {
        if (!this.rawCache) return null;
        const ship = this.rawCache.find(d => d.id === id);
        if (!ship.length) return null;
        return ship;
    }

    /**
     * Searches for a specific ship. (EN, CN, JP, KR names are supported)
     * @param {string} name name of the ship you want to search for
     * @param {number} [limit=10] limit of the search results
     * @memberof SaratogaShips
     * @returns {Ship | null}
     */
    searchShipByName(name, limit = 10) {
        if (!this.cache) return null;
        const possibleShips = this.cache.search(name,  { limit });
        if (!possibleShips.length) return null;
        return possibleShips;
    }
}
module.exports = SaratogaShips;
