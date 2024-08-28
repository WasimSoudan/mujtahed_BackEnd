module.exports = app => {
 const route = '/REST/outcomings';

 require('./Delete')(route)(app);
 require('./Create')(route)(app);
 require('./Update')(route)(app);
 require('./Read')(route)(app);
};
