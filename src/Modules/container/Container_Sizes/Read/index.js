module.exports =
 route =>
 ({ pool, ...app }) => {
  // Read Container_Sizes
  app.get(route, async (req, res) => {
   const { isPositiveInteger, getLimitClause, orderBy } = res.locals.utils;
   try {
    const { id, limit, offset } = req.query;

    const SQLquery = 'SELECT * FROM container."Container_Sizes" WHERE 1=1 ';

    const { rows } = isPositiveInteger(id)
     ? await pool.query(SQLquery + 'AND id = $1', [id])
     : await pool.query(SQLquery + orderBy('id') + ' ' + getLimitClause(limit, offset));

    res.json({
     success: true,
     no_of_records: rows.length,
     msg: `Container size${1 === rows.length ? ' was' : 's were'} retrieved successfully.`,
     data: rows,
    });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };