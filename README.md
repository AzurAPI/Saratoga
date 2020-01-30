# Saratoga
<p align="center">
  <img src="https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/074/Hibiscusscented_Idol/image.png">
</p>

The ShipGirl Project. Saratoga. ``(c) Azurlane for Saratoga.``

An Azur Lane Library which is open source, which is inspired by [AzurApi-JS](https://github.com/AzurAPI/azurapi-js)

## Features

✅ No complicated Database inside.

✅ Hot reloading.

✅ Easy to use.

✅ It's a waifu.

## Installation

> npm i saratoga

> npm i Deivu/Saratoga

## Documentation

[Read our Wiki](https://github.com/Deivu/Saratoga/wiki)

## Basic Example Usage
```js
const { Saratoga } = require('saratoga');

const saratoga = new Saratoga();

console.log('Will get the ship after 10 seconds we initialize Saratoga');

function getShip() {
  if (saratoga.ready) console.log(saratoga.ships.getByEnglishName('Saratoga'));
}

setTimeout(() => getShip(), 10000);
```

## TO DOs
- Think about implementation for initialization (probs I will let it user invoked or depends)