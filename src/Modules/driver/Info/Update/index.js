module.exports =
 route =>
 ({ pool, ...app }) => {
  // Update Info
  app.put(route, async (req, res) => {
   const { isPositiveInteger, SQLfeatures } = res.locals.utils;
   try {
    const { id } = req.query;
    if (!isPositiveInteger(id)) return res.status(404).json({ success: false, msg: 'driver Info was not found.' });

    const { sets, values, filters } = SQLfeatures.update({ filters: { id }, ...req.body });

    const { rows } = await pool.query(`UPDATE driver."Info" SET ${sets} WHERE ${filters} RETURNING *`, values);

    res.json({ success: true, msg: 'Driver info was updated successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
