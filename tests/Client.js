const { Saratoga } = require('../index');

const shipgirls = new Saratoga();
// depending on your internet, this may take some time, hence 5 seconds may not be enough.
setTimeout(() => {
    console.log(shipgirls.ships.getByEnglishName('Saratoga'));
}, 5000);