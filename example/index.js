const surg = require('../');
const fs = require('fs');

const config = fs.readFileSync('./surge.conf', 'utf-8');

const config_parse = surg.parse(config);

console.log(config_parse);
