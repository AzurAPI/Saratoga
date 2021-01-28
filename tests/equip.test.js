const { Saratoga } = require('../index');

const saratoga = new Saratoga();

test('Search Equipment By Name', async () => {
    saratoga.on('ready', () => {
        expect(saratoga.equipments.name('130mm 1932')[0].item.wikiUrl).toBe('https://azurlane.koumakan.jp/Single_130mm_(B13_Pattern_1936)');
    });
});