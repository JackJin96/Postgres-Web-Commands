const { Client } = require('pg');
const config = require('../config');

const client = new Client({
    connectionString: config.db.postgresUrl,
});
client.connect();
// client.end();

module.exports = {
    client
}