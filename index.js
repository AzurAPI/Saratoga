/**
 * Node.js Event Emitter
 * @external EventEmitter
 * @see {@link https://nodejs.org/api/events.html}
 */

/**
 * Node.js Timeout
 * @external Timeout
 * @see {@link https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout}
 */

/**
 * Ship Data
 * @external Ship
 * @see {@link https://github.com/AzurAPI/Saratoga/wiki/More-Get-Methods#ship-getters}
 */

/**
 * Equipment Data
 * @external Equipment
 * @see {@link https://github.com/AzurAPI/Saratoga/wiki/More-Get-Methods#equipment-getters}
 */

module.exports = {
    Saratoga: require('./src/Saratoga'),
    SaratogaUtil: require('./src/util/SaratogaUtil'),
    version: require('./package.json').version
};
