module.exports =
 route =>
 ({ pool, ...app }) => {
  // Delete Get_Outs
  app.delete(route, async (req, res) => {
   const { isPositiveInteger } = res.locals.utils;

   try {
    const { id } = req.query;

    if (!isPositiveInteger(id)) return res.status(404).json({ success: false, message: 'Get_Out was not found.' });

    const { rows } = await pool.query('DELETE FROM inout."Get_Outs" WHERE 1=1 AND id = $1 RETURNING *', [id]);

    res.json({ success: true, msg: 'Get Out was deleted successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
