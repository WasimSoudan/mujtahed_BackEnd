const {
 isPositiveInteger,
 env: {
  POOL: { PG },
 },
} = require('.');

module.exports = (limit, offset) => {
 let limitClause = 'LIMIT ';

 if (isPositiveInteger(limit)) limitClause += limit;
 else if (parseInt(limit) === parseInt(PG.NO_LIMIT_FLAG)) limitClause += 'ALL';
 else limitClause += PG.DEFAULT_ROWS_LIMIT;

 if (isPositiveInteger(offset)) limitClause += ' OFFSET ' + offset;

 return limitClause;
};
