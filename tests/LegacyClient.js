const { Saratoga } = require('../index');

const saratoga = new Saratoga();

saratoga.on('ready', () => {
    console.log('== Ships ==> ', saratoga.legacyShips.searchShipByName('saratoga'));
    console.log('== Equipments ==> ', saratoga.legacyEquipments.searchByEquipmentName('130mm 1932'));
});
saratoga.on('debug', console.log);
saratoga.on('error', console.error);
