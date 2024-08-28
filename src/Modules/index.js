module.exports = app => {
    ['Phone', 'Info', 'Vehicles', 'Driver_Phones'].forEach(d => require('./driver/' + d)(app));
    ['Container_Sizes'].forEach(d => require('./container/' + d)(app));
    ['Agents', 'Destination_To'].forEach(d => require('./shifting/' + d)(app));
    ['Incomings', 'Outcomings'].forEach(d => require('./inout/' + d)(app));
};
