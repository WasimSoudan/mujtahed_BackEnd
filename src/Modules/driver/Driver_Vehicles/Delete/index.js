module.exports =
 route =>
 ({ pool, ...app }) => {
  // Delete Driver_Vehicles
  app.delete(route, async (req, res) => {
   const { isPositiveInteger } = res.locals.utils;

   try {
    const { id } = req.query;

    if (!isPositiveInteger(id))
     return res.status(404).json({ success: false, message: 'Driver vehicle was not found.' });

    const { rows } = await pool.query('DELETE FROM driver."Driver_Vehicles" WHERE 1=1 AND id = $1 RETURNING *', [id]);

    res.json({ success: true, msg: 'Driver vehicle was deleted successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
