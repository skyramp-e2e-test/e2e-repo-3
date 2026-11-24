'use strict';

const { createApp } = require('./app');

const port = Number(process.env.PORT) || 3100;
const itemsUrl = process.env.ITEMS_URL || 'http://localhost:3000/api/items';

createApp({ itemsUrl }).listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
