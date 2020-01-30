const Fetch = require('node-fetch');
const SaratogaUtil = require('../util/SaratogaUtil');

class SaratogaValidator {
    constructor() {
        this.type = null;
        this.fetched = false;
        this.local = {};
        this.remote = {};
    }

    setType(name) {
        this.type = name;
        return this;
    }

    parseVersion(prop, type) {
        let version = this[prop][type];
        version =  version && version['version-number'] ? version['version-number'] : 'Unknown';
        return { type, version };
    }

    parseShipAndEquipmentVersion(prop) {
        return ['ships', 'equipments'].map(type => this.parseVersion(prop, type));
    }

    async fetch() {
        if (!this.fetched) {
            this.local = await SaratogaUtil.readFile(SaratogaUtil.versionFilePath());
            this.remote = await Fetch(SaratogaUtil.latestVersionDataLink()).then(data => data.json());
            this.fetched = true;
        }
        for (const { type, version } of this.parseShipAndEquipmentVersion('local')) console.log(`Current downloaded ${type} version: ${version}`);
        for (const { type, version } of this.parseShipAndEquipmentVersion('remote')) console.log(`Current remote ${type} version: ${version}`);
    }

    noLocalData() {
        return Object.entries(this.local).length === 0;
    }

    needsUpdate() {
        return !this.local[this.type] || this.local[this.type]['version-number'] !== this.remote[this.type]['version-number'] || this.local[this.type]['last-data-refresh-date'] !== this.remote[this.type]['last-data-refresh-date'];
    }
}
module.exports = SaratogaValidator;