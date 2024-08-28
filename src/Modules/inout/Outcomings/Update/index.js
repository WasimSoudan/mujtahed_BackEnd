module.exports =
 route =>
 ({ pool, ...app }) => {
  // Update Outcoming
  app.put(route, async (req, res) => {
   const { isPositiveInteger, SQLfeatures } = res.locals.utils;
   try {
    const { id } = req.query;
    if (!isPositiveInteger(id)) return res.status(404).json({ Success: false, msg: 'Outcoming was not found.' });

    const { sets, values, filters } = SQLfeatures.update({ filters: { id }, ...req.body });

    const { rows } = await pool.query(`UPDATE inout."Outcomings" SET ${sets} WHERE ${filters} RETURNING *`, values);

    res.json({ success: true, msg: 'Outcoming was updated successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
