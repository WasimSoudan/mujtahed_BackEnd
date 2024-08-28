module.exports =
 route =>
 ({ pool, ...app }) => {
  // Delete Container_Sizes
  app.delete(route, async (req, res) => {
   const { isPositiveInteger } = res.locals.utils;

   try {
    const { id } = req.query;

    if (!isPositiveInteger(id))
     return res.status(404).json({ success: false, message: 'Container_Sizes was not found.' });

    const { rows } = await pool.query('DELETE FROM container."Container_Sizes" WHERE 1=1 AND id = $1 RETURNING *', [
     id,
    ]);

    res.json({ Success: true, msg: 'Container size was deleted successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
