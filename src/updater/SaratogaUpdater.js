const SaratogaUtil = require('../util/SaratogaUtil');
const SaratogaValidator = require('./SaratogaValidator');

class SaratogaUpdater {
    constructor(store, saratoga) {
        this.saratoga = saratoga;
        this.store = store;
        this.checked = false;

        this.startUpCheck();
    }

    startUpCheck() {
        if (this.checked) return;
        const props = ['versionFilePath', 'shipFilePath', 'equipFilePath'];
        for (const prop of props) {
            if (!SaratogaUtil.existSync(SaratogaUtil[prop]())) SaratogaUtil.writeFileSync(SaratogaUtil[prop](), JSON.stringify({}));
        }
        this.checked = true;
    }

    async update() {
        const dataValidator = new SaratogaValidator();
        await dataValidator.fetch();
        if (dataValidator.noLocalData()) {
            // handle clear, reload cache for ships & equips here
        } else {
            if (dataValidator.setType('ships').needsUpdate()) {
                // handle clear, reload cache for ships here
            }
            if (dataValidator.setType('equipments').needsUpdate()) {
                // handle clear, reload cache for equip here
            }
        }
    }
}
module.exports = SaratogaUpdater;