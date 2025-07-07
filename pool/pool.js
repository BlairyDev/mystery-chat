const { Pool } = require("pg");
require('dotenv').config({ path: './config.env'});

module.exports = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});