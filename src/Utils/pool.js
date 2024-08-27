const pg = require('pg');
const {
 POOL: { PG },
} = require('./env');

pg.types.setTypeParser(1082, stringValue => stringValue); //1082 for date type

module.exports = new pg.Pool({
 user: PG.USER_NANE,
 password: PG.USER_PASSWORD,
 host: PG.HOST,
 database: PG.DBNAME,
 port: PG.PORT,
});
