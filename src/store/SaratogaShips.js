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
     * Search from all ships
     * @param {number | string} id 
     * @memberof SaratogaShips
     * @returns {Ship | null}
     */
    get(id) {
        const data = this.rawCache;
        if (!data) return null;
        const ships = data.filter(ship => {
          if (ship.id === id) return true;
          for (const key of Object.keys(ship.names)) {
            if (ship.names[key].includes(id)) return true;
          }
          return false;
        });
    
        if (!ships.length) throw new UnknownShipError(id);
        return ships[0];
      }

    /**
     * Fetches a specific ship via its id
     * @param {number} id id of the ship you want to fetch
     * @memberof SaratogaShips
     * @returns {Ship | null}
     */
    id(id) {
        if (!this.rawCache) return null;
        const ship = this.rawCache.find(d => d.id === id);
        if (!ship.length) return null;
        return ship;
    }

    /**
     * Searches for a specific ship. (EN, CN, JP, KR names are supported)
     * @param {string} name name of the ship you want to search for
     * @param {string} language optional language to search by
     * @param {number} [limit=10] limit of the search results
     * @memberof SaratogaShips
     * @returns {Ship | null}
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
                case 'kr':
                    lang = this.cache.names.kr;
                    break;
            }
            return lang.find(d => d.includes(name));
        }
        if (!this.cache) return null;
        const possibleShips = this.cache.search(name,  { limit });
        if (!possibleShips.length) return null;
        return possibleShips;
    }
    /**
     * Custom filter for ship data
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

class ShipExtAll extends SaratogaShips {
    constructor() {
        super();
    }

    /**
     * Get an unfiltered ship list
     */
    get() {
        if (!this.rawCache) return null;
        return this.rawCache;
    }

    /**
     * Filter ships via language
     * @param {string} language 
     */
    name(language) {
        if (!this.rawCache) return null;
        let lang;
        switch(language) {
        case 'en':
            lang = this.rawCache.names.en;
            break;
        case 'cn':
            lang = this.rawCache.names.cn;
            break;
        case 'jp':
            lang = this.rawCache.names.jp;
            break;
        case 'kr':
            lang = this.rawCache.names.kr;
            break;
        case 'code':
            lang = this.rawCache.names.code;
        }
        return lang;
    }

    /**
     * Filter ships via id
     */
    id() {
        if (!this.rawCache) return null;
        return this.rawCache.id;
    }
}

class ShipExtFilter extends SaratogaShips {
    constructor() {
        super();
    }
    /**
     * Lists all the ships that matches a specific shjp class
     * @param {string} shipClass class of the ship you want to search for (Case Sensitive)
     * @memberof SaratogaShips
     * @returns {Array<Ship> | null}
     */
    class(shipClass) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.class === shipClass);
    }

    /**
     * Lists all the ships that matches a specific ship nationality
     * @param {string} nationality nationality of the ship you want to search for (Case Sensitive)
     * @memberof SaratogaShips
     * @returns {Array<Ship> | null}
     */
    nationality(nationality) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.nationality === nationality);
    }

    /**
     * Lists all the ships that matches a specific ship hull type
     * @param {string} hullType hullType of the ship you want to search for (Case Sensitive)
     * @memberof SaratogaShips
     * @returns {Array<Ship> | null}
     */
    type(hullType) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.hullType === hullType);
    }

    /**
     * Lists all the ship that matches a specific rarity
     * @param {string} rarity rarity of the ship you want to search for (Case Sensitive)
     * @memberof SaratogaShips
     * @returns {Array<Ship> | null}
     */
    rarity(rarity) {
        if (!this.rawCache) return null;
        return this.rawCache.filter(d => d.rarity === rarity);
    }
}

module.exports = SaratogaShips, ShipExtAll, ShipExtFilter;
