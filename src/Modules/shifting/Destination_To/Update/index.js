module.exports =
 route =>
 ({ pool, ...app }) => {
  // Update Destination_To
  app.put(route, async (req, res) => {
   const { isPositiveInteger, SQLfeatures } = res.locals.utils;
   try {
    const { id } = req.query;
    if (!isPositiveInteger(id)) return res.status(404).json({ success: false, msg: 'Destination To was not found.' });

    const { sets, values, filters } = SQLfeatures.update({ filters: { id }, ...req.body });

    const { rows } = await pool.query(
     `UPDATE shifting."Destination_To" SET ${sets} WHERE ${filters} RETURNING *`,
     values
    );

    res.json({ success: true, msg: 'Destination was updated successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
