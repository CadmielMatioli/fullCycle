const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: 'myuser',
  password: 'mypassword',
  database: 'mydatabase',
});

db.connect();

db.query(`
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) throw err;
});

app.get('/', (req, res) => {
  let r = (Math.random() + 1).toString(36).substring(7);
  const name = `John Doe ${r}`;
  db.query('INSERT INTO people (name) VALUES (?)', [name], (err, result) => {
    if (err) throw err;
  });
  db.query('SELECT * FROM people', (err, rows) => {
    if (err) throw err;
    let tableHtml = '<h1>Full Cycle Rocks!</h1><p>Lista de nomes cadastrada no banco de dados: </p><table border="1"><tr><th>ID</th><th>Name</th></tr>';
    rows.forEach(row => {
      tableHtml += `<tr><td>${row.id}</td><td>${row.name}</td></tr>`;
    });

    tableHtml += '</table>';

    res.send(tableHtml);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://0.0.0.0:${port}`);
});
