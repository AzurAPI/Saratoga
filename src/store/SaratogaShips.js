class SaratogaShips {
    constructor(store) {
        this.store = store;
    }

    get cache() {
        return this.store._shipCache;
    }

    getAllByClass(shipClass) {
        return this.cache.filter(d => d.class === shipClass);
    }

    getAllByNationality(nationality) {
        return this.cache.filter(d => d.nationality === nationality);
    }

    getAllByHullType(hullType) {
        return this.cache.filter(d => d.hullType === hullType);
    }

    getAllByRarity(rarity) {
        return this.cache.filter(d => d.rarity === rarity);
    }

    getById(id) {
        return this.cache.find(d => d.id === id);
    }

    getByEnglishName(name) {
        return this.cache.find(d => d.names.en === name);
    }

    getByChineseName(name) {
        return this.cache.find(d => d.names.cn === name);
    }

    getByJapaneseName(name) {
        return this.cache.find(d => d.names.jp === name);
    }

    getByKoreanName(name) {
        return this.cache.find(d => d.names.kr === name);
    }
}
module.exports = SaratogaShips;