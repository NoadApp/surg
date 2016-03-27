const surg = require('../');
const fs = require('fs');

const config = fs.readFileSync('./surge.conf', 'utf-8');

const config_parse = surg(config);

console.log(config_parse);
