module.exports = app => {
 ['Phone', 'Info'].forEach(d => require('./driver/' + d)(app));
};
