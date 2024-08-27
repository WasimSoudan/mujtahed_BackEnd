const express = require('express');
const app = express();
const cors = require('cors');

const { APPPORT, pool, ...utils } = require('./Utils');

// middleware
app.post('*', express.json({ limit: '200mb' }));
app.put('*', express.json({ limit: '200mb' }));

app.use([
 cors(),
 (_, res, next) => {
  res.locals.utils = utils;
  res.set('Access-Control-Allow-Origin', '*');
  next();
 },
]);
// DB connection
app.pool = pool;

// routs
require('./Modules')(app);

app.listen(APPPORT, () => {
 console.clear();
 console.log('Server started on port %s', APPPORT);

 let routes = [];
 app._router.stack.forEach(r => {
  if (r?.route?.path && '*' !== r.route.path) {
   routes.push({
    path: r.route.path.substring(5),
    method: Object.keys(r.route.methods).join(',').toUpperCase(),
   });
  }
 });

 console.log('Number of routes: %i', routes.length);

 routes = routes.reduce(
  (acc, { path }) => ({
   ...acc,
   [path]: Array.from(
    new Set(
     routes.reduce((acc, { method, path: rf_path }) => {
      if (rf_path === path) acc.push(method);
      return acc;
     }, [])
    )
   ),
  }),
  {}
 );

 console.table(
  Object.keys(routes)
   .sort((a, b) => b - a)
   .reduce((acc, k) => ({ ...acc, [++Object.keys(acc).length]: { path: k, method: routes[k].sort().join(', ') } }), {})
 );
});
