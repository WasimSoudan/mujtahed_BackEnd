module.exports = app => {
 ['Phone', 'Info', 'Vehicles'].forEach(d => require('./driver/' + d)(app));
};
