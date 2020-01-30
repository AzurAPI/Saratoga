class SaratogaEquipments {
    constructor(store) {
        this.store = store;
    }

    get cache() {
        return this.store._equipCache;
    }

    getAllByCategory(category) {
        return this.cache.filter(d => d.category === category);
    }

    getAllByNationality(nationality) {
        return this.cache.filter(d => d.nationality === nationality);
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
module.exports = SaratogaEquipments;