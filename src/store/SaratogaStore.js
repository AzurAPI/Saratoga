const SaratogaUtil = require('../util/SaratogaUtil');

class SaratogaStore {
    constructor(saratoga) {
        this.saratoga = saratoga;
        this.checked = false;
    }

    dataStartUpCheck() {
        if (this.checked) return;
    }
}
module.exports = SaratogaStore;