const SaratogaUtil = require('../util/SaratogaUtil');

class SaratogaUpdater {
    constructor(store, saratoga) {
        this.saratoga = saratoga;
        this.store = store;
        this.checked = false;

        this._startUpCheck();
    }

    _startUpCheck() {
        if (this.checked) return;
        const props = ['versionFilePath', 'shipFilePath', 'equipFilePath'];
        for (const prop of props) {
            if (!SaratogaUtil.existSync(SaratogaUtil[prop]())) SaratogaUtil.writeFileSync(SaratogaUtil[prop](), JSON.stringify({}));
        }
        this.checked = true;
    }
}
module.exports = SaratogaUpdater;