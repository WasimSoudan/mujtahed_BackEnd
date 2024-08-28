module.exports = app => {
 ['Phone', 'Info', 'Vehicles', 'Driver_Phones'].forEach(d => require('./driver/' + d)(app));
 ['Container_Sizes'].forEach(d => require('./container/' + d)(app));
 ['Agents'].forEach(d => require('./shifting/' + d)(app));
};
