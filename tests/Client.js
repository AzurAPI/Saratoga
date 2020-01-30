const { Saratoga } = require('../index');

const shipgirls = new Saratoga();

// depending on your internet, this may take some time, hence 5 seconds may not be enough.
setTimeout(() => {
    console.log('== Ship ==> ', shipgirls.ships.getByEnglishName('Saratoga'));
    console.log('== Equipment ==> ', shipgirls.equipments.getByEnglishName('四联装130mm副炮Mle1932'));
}, 5000);
