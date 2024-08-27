const EMPTY_ALLOWED = true;
const NO_EMPTY_ALLOWED = false;

const { APPPORT, ...env } = require('./env');
module.exports = {
 APPPORT,
 SQLfeatures: require('./SQLfeatures'),
 env,
 pool: require('./pool'),
 getLimitClause: (limit, offset) => require('./getLimitClause')(limit, offset),
 isBool: val => require('./booleanCheck')(val),
 isObjArray: (arr, everycb) => require('./ObjectArrayCheck')(arr, everycb)(NO_EMPTY_ALLOWED),
 isEObjArray: (arr, everycb) => require('./ObjectArrayCheck')(arr, everycb)(EMPTY_ALLOWED),
 isString: val => require('./checkString')(val)(NO_EMPTY_ALLOWED),
 isEString: val => require('./checkString')(val)(EMPTY_ALLOWED),
 isItrable: val => require('./IterableCheck')(val),
 isMilitarytime: time => require('./militaryTimeCheck')(time),
 isPositiveInteger: val => require('./positiveIntegerCheck')(val),
 isPositiveNumber: val => require('./positiveNumberCheck')(val),
 isSQLDate: dateStr => require('./isSQLDate')(dateStr),
 isValidObject: obj => require('./objectCheck')(obj),
 orderBy: fieldName => require('./orderBy')(fieldName),
 pgRowMode: (query, values) => require('./rowMode')(query, values),
};
