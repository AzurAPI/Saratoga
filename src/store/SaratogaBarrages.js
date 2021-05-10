class SaratogaBarrages {
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
     * Fetches a specific barrage via its id
     * @param {string} id id of the barrage you want to fetch
     * @memberof SaratogaBarrages
     * @returns {Barrage | null}
     */
    id(id) {
        if (!this.rawCache) return null;
        const barrage = this.rawCache.find(d => d.id === id);
        if (!barrage.length) return null;
        return barrage;
    }

    /**
     * Searches for a specific barrage
     * @param {string} name name of the barrage you want to search for
     * @param {number} [limit=10] limit of the search results
     * @memberof SaratogaBarrages
     * @returns {Barrage | null}
     */
    name(name, limit = 10) {
        if (!this.cache) return null;
        const possibleBarrages = this.cache.search(name, { limit });
        if (!possibleBarrages.length) return null;
        return possibleBarrages;
    }

    /**
     * Searches for a specific barrage based on usable ship
     * @param {string} ship name of the ship that you want to search a barrage for
     * @memberof SaratogaBarrages
     * @returns {Barrage | null}
     */
    ships(ship) {
        if (!this.rawCache) return null;
        const barrage = this.rawCache.find(d => d.ships.includes(ship));
        if (!barrage.length) return null;
        return barrage;
    }
    
    /**
     * Searches for a specific barrage based on hull
     * @param {string} hull name of the hull that you want to search a barrage for
     * @memberof SaratogaBarrages
     * @returns {Barrage | null}
     */
    hull(hull) {
        if (!this.rawCache) return null;
        const barrage = this.rawCache.find(d => d.hull === hull);
        if (!barrage.length) return null;
        return barrage;
    }

    /**
     * Get an unfiltered barrage list
     */
    all() {
        if (!this.rawCache) return null;
        return this.rawCache;
    }

    /**
     * Custom filter for barrage data
     * @param {requestCallback} callback the callback that handles the response
     */
    filter(callback) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(callback);
    }
    /**
     * Custom search for data in Fuse instance
     * @param {any} options Fuse search options
     */
    search(options) {
        if (!this.rawCache) return null;
        return this.cache.search(options);
    }
}

module.exports = SaratogaBarrages;