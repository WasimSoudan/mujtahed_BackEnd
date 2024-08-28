module.exports =
 route =>
 ({ pool, ...app }) => {
  // Delete Outcomings
  app.delete(route, async (req, res) => {
   const { isPositiveInteger } = res.locals.utils;

   try {
    const { id } = req.query;

    if (!isPositiveInteger(id)) return res.status(404).json({ success: false, message: 'Outcoming was not found.' });

    const { rows } = await pool.query('DELETE FROM inout."Outcomings" WHERE 1=1 AND id = $1 RETURNING *', [id]);

    res.json({ success: true, msg: 'Outcomings was deleted successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
