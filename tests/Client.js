const { Saratoga } = require('../index');

const saratoga = new Saratoga();

saratoga.on('ready', () => {
    console.log('== Ships ==> ', saratoga.ships.searchShipByName('saratoga'));
    console.log('== Equipments ==> ', saratoga.equipments.searchByEquipmentName('130mm 1932'));
});
saratoga.on('debug', console.log);
saratoga.on('error', console.error);
