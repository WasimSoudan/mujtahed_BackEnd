module.exports = val => {
 if (null == val) return false;

 return 'function' === typeof val[Symbol.iterator];
};
