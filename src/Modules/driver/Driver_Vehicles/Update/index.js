module.exports =
 route =>
 ({ pool, ...app }) => {
  // Update Driver_Vehicles
  app.put(route, async (req, res) => {
   const { isPositiveInteger, SQLfeatures } = res.locals.utils;
   try {
    const { id } = req.query;
    if (!isPositiveInteger(id)) return res.status(404).json({ success: false, msg: 'Driver vehicle was not found.' });

    const { sets, values, filters } = SQLfeatures.update({ filters: { id }, ...req.body });

    const { rows } = await pool.query(
     `UPDATE driver."Driver_Vehicles" SET ${sets} WHERE ${filters} RETURNING *`,
     values
    );

    res.json({ success: true, msg: 'Driver vehicle was updated successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
