module.exports = app => {
 const route = '/REST/container_sizes';

 require('./Delete')(route)(app);
 require('./Create')(route)(app);
 require('./Update')(route)(app);
 require('./Read')(route)(app);
};
