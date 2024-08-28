module.exports =
 route =>
 ({ pool, ...app }) => {
  // Create Outcoming
  app.post(route, async (req, res) => {
   try {
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const enc_values = values.map((_, i) => `$${++i}`);

    const { rows } = await pool.query(
     `INSERT INTO inout."Outcomings"(${fields}) VALUES(${enc_values}) RETURNING *`,
     values
    );

    res.json({ success: true, message: 'Outcoming was created successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
