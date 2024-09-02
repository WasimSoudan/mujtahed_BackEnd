module.exports =
 route =>
 ({ pool, ...app }) => {
  // Create Info
  app.post(route, async (req, res) => {
   let client = null;
   let begun = false;
   try {
    const { SQLfeatures } = res.locals.utils;
    const { vehicles, ...info } = req.body;
    const dispData = {};

    const sorter = field => (a, b) => parseInt(b[field], 10) - parseInt(a[field], 10);

    client = await pool.connect();
    await client.query('BEGIN').then(() => (begun = true));

    const fields = Object.keys(info);
    const values = Object.values(info);
    const enc_values = values.map((_, i) => `$${++i}`);

    dispData.Info = await client
     .query(`INSERT INTO driver."Info"(${fields}) VALUES(${enc_values}) RETURNING *`, values)
     .then(({ rows }) => rows[0]);

    if (vehicles.length > 0) {
     const {
      rows: Prows,
      fields: Pfields,
      values: Pvalues,
     } = SQLfeatures.bulkInsert(vehicles, { driver_id: dispData.Info.id });

     dispData.properties = await client
      .query(`INSERT INTO driver."Driver_Vehicles"(${Pfields}) VALUES${Prows} RETURNING *`, Pvalues)
      .then(({ rows }) => rows.sort(sorter('vehicle_id')));
    }

    await client.query('COMMIT').then(() => (begun = false));

    res.json({ success: true, message: 'Driver info was created successfully.', data: dispData });
   } catch ({ message }) {
    res.json({ success: false, message });
   } finally {
    if (null != client) {
     if (true === begun) {
      try {
       await client.query('ROLLBACK');
      } catch ({ message }) {
       throw Error(message);
      }
     }
     client.release();
    }
   }
  });
 };
