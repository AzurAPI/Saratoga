# Saratoga
<p align="center">
  <img src="https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/074/Hibiscusscented_Idol/image.png">
</p>

The ShipGirl Project. Saratoga. ``(c) Azurlane for Saratoga.``

An Azur Lane Library which is open source, which is inspired by [AzurApi-JS](https://github.com/AzurAPI/azurapi-js)

## Features

✅ Azur Lane ship & equipment local api.

✅ Really simple database.

✅ Hot reloading.

✅ Easy to use.

✅ It's a waifu.

## Installation

> npm i saratoga

> npm i AzurAPI/Saratoga

## Documentation

Docma Docs soon:tm:

[Read our Wiki](https://github.com/Deivu/Saratoga/wiki)

## Basic Example Usage
```js
const { Saratoga } = require('saratoga');

const saratoga = new Saratoga();

saratoga.on('ready', () => console.log(saratoga.ships.searchShipByName('saratoga')));
saratoga.on('debug', console.log);
saratoga.on('error', console.error);
```

## Maintainer
- [@Saya#0113](https://github.com/Deivu)
