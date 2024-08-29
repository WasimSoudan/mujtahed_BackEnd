module.exports = app => {
 ['Phone', 'Info', 'Vehicles', 'Driver_Phones'].forEach(d => require('./driver/' + d)(app));
 ['Container_Sizes'].forEach(d => require('./container/' + d)(app));
 ['Agents', 'Destination_To', 'Shiftings'].forEach(d => require('./shifting/' + d)(app));
 ['Incomings', 'Get_Outs', 'Shipping_Lines'].forEach(d => require('./inout/' + d)(app));
};
