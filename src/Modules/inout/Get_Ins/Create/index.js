module.exports =
 route =>
 ({ pool, ...app }) => {
  // Create Incoming
  app.post(route, async (req, res) => {
   try {
    const {
     env: {
      EMAIL: { BASEURL, transport },
     },
    } = res.locals.utils;

    // return res.json({ BASEURL, transport });

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const enc_values = values.map((_, i) => `$${++i}`);

    const { rows } = await pool.query(
     `INSERT INTO inout."Get_Ins"(${fields}) VALUES(${enc_values}) RETURNING *`,
     values
    );
    const { id } = rows[0];

    const allData = await pool.query(`SELECT * FROM "inout"."V_Get_Ins" WHERE id =$1 `, [id]).then(({ rows }) => {
     return rows[0];
    });

    console.log(allData);

    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

    const htmlBody = `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table Example</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Created At</th>
                <th>Container Number</th>
                <th>Line Name</th>
                <th>Email</th>
                <th>Size Name</th>
                <th>Driver ID</th>
                <th>Driver Name</th>
                <th>Vehicle ID</th>
                <th>Modal</th>
                <th>Vehicle Number</th>
                <th>Amount</th>
                <th>Note</th>
            </tr>
        </thead>
        <tbody>
            <!-- Example row -->
            <tr>
                <td>${allData.id}</td>
                <td>${allData.created_at}</td>
                <td>${allData.container_number}</td>
                <td>${allData.line_name}</td>
                <td>${allData.email}</td>
                <td>${allData.size_name}</td>
                <td>${allData.driver_id}</td>
                <td>${allData.driver_name}</td>
                <td>${allData.vehicle_id}</td>
                <td>${allData.modal}</td>
                <td>${allData.vehicle_number}</td>
                <td>${allData.amount}</td>
                <td>${allData.note}</td>
            </tr>
            <!-- More rows can be added here -->
        </tbody>
    </table>
</body>
</html>
     
     
     `;

    const options = {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({
      emails: [
       {
        subject: 'Authantication code',
        message: htmlBody,
        to: allData.email,
       },
      ],
      transportersinfo: transport(0),
     }),
    };
    const { success, message } = await fetch(BASEURL + '/sendmail', options).then(resp => resp.json());

    res.json({ success: true, message: 'Get In was created successfully.', data: rows });
   } catch ({ message }) {
    res.json({ success: false, message });
   }
  });
 };
