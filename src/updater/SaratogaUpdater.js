const Fetch = require('node-fetch');
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

    // used to check for update w/o writing
    async checkForUpdate() {
        const dataValidator = new SaratogaValidator();
        await dataValidator.fetch(false);
        const shipUpdateAvailable = dataValidator.setType('ships').needsUpdate();
        const equipmentUpdateAvailable = dataValidator.setType('equipments').needsUpdate();
        return { shipUpdateAvailable, equipmentUpdateAvailable };
    }

    async updateData() {
        const dataValidator = new SaratogaValidator();
        await dataValidator.fetch();
        if (dataValidator.noLocalData()) {
            // handle clear, update, reload cache for ships, equips & version file here
            await dataValidator.updateVersionFile();
        } else {
            if (dataValidator.setType('ships').needsUpdate()) {
                // clear and update local file here
                await dataValidator.updateVersionFile();
            }
            // then reload ship cache here
            if (dataValidator.setType('equipments').needsUpdate()) {
                // clear and update local file here
                await dataValidator.updateVersionFile();
            }
            // then reload equipment cache here
        }
    }
}
module.exports = SaratogaUpdater;