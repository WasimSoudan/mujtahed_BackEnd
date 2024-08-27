const {
 isString,
 env: {
  POOL: { PG },
 },
} = require('.');

module.exports = fieldName => {
 const upperOrder = PG.DEFAULTORDER;
 return 'ORDER BY ' + (isString(fieldName) ? fieldName : 1) + ' ' + (/^DESC$/.test(upperOrder) ? upperOrder : '');
};
