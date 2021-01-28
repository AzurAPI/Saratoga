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
    category(category) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.category === category);
    }

    /**
     * Lists the equipments by nationality
     * @param {string} nationality naitionality name of the equipments you want to search for
     * @memberof SaratogaEquipments
     * @returns {Array<Equipment> | null}
     */
    nationality(nationality) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.nationality === nationality);
    }

    /**
     * Searches for a specific equipment. (EN, CN, JP, KR names are supported)
     * @param {string} name name of the equipment you want to search for
     * @param {string} language optional language to search by
     * @param {number} [limit=10] limit of the search results
     * @memberof SaratogaEquipments
     * @returns {Equipment | null}
     */
    name(name, language, limit = 10) {
        if (language) {
            if (!this.rawCache) return null;
            let lang;
            switch(language) {
                case 'en':
                    lang = this.cache.names.en;
                    break;
                case 'cn':
                    lang = this.cache.names.cn;
                    break;
                case 'jp':
                    lang = this.cache.names.jp;
                    break;
            }
            return lang.find(d => d.includes(name));
        }
        if (!this.cache) return null;
        const possibleEquipments = this.cache.search(name, { limit });
        if (!possibleEquipments.length) return null;
        return possibleEquipments;
    }

    /**
     * Get an unfiltered equipment list
     */
    all() {
        if (!this.rawCache) return null;
        return this.rawCache;
    }

    /**
     * Custom filter for equipment data
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
module.exports = SaratogaEquipments;