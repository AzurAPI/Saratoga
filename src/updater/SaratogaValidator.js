const Fetch = require('node-fetch');
const SaratogaUtil = require('../util/SaratogaUtil');

class SaratogaValidator {
    constructor() {
        this.type = null;
        this.fetched = false;
        this.local = {};
        this.remote = {};
    }

    /*setType(name) {
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

    getCurrentVersion() {
        if (!this.fetched) return;
        const data = {
            downloaded: {},
            remote: {}
        };
        for (const { type, version } of this.parseShipAndEquipmentVersion('local')) data.downloaded[type] = version;
        for (const { type, version } of this.parseShipAndEquipmentVersion('remote')) data.remote[type] = version;
        return data;
    }*/

    async fetch() {
        if (!this.fetched) {
            this.local = JSON.parse(await SaratogaUtil.readFile(SaratogaUtil.versionFilePath()));
            this.remote = await Fetch(SaratogaUtil.latestVersionDataLink()).then(data => data.json());
            this.fetched = true;
        }
    }

    noLocalData() {
        return Object.entries(this.local).length === 0;
    }

    needsUpdate() {
        //return !this.local[this.type] || this.local[this.type]['version-number'] !== this.remote[this.type]['version-number'] || this.local[this.type]['last-data-refresh-date'] !== this.remote[this.type]['last-data-refresh-date'];
        if (this.local === this.remote) return true;
        return false;
    }

    updateVersionFile() {
        let data;
        // to ensure file integrity
        if (this.type) {
            const invertedProp = this.type === 'ships' ? 'equipments' : 'ships';
            if (this.local[invertedProp]) {
                data = { 
                    [this.type]: this.remote[this.type],
                    [invertedProp]: this.local[invertedProp]
                };
            } else {
                data = { [this.type]: this.remote[this.type] };
            }
        }
        return SaratogaUtil.writeFile(SaratogaUtil.versionFilePath(), JSON.stringify(data || this.remote));
    }
}
module.exports = SaratogaValidator;