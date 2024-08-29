module.exports = app => {
 const route = '/REST/get_outs';

 require('./Delete')(route)(app);
 require('./Create')(route)(app);
 require('./Update')(route)(app);
 require('./Read')(route)(app);
};
