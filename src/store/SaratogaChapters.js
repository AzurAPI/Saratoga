// TODO
class SaratogaChapters {
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
}