const knex = require('knex');
const config = require('../knexfile'); // pad afhankelijk van je mapstructuur

const db = knex(config.development);

module.exports = db;