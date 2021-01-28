const { Saratoga } = require('../index');

const saratoga = new Saratoga();

test('Search Ship By Name', async () => {
    saratoga.on('ready', () => {
        expect(saratoga.ships.name('saratoga')[0].item.id).toBe('074');
    });
});


