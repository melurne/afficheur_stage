const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'grr_v31'
});

const sqlQuery = "SELECT from_unixtime(grr__entry.start_time, '%H:%i'), from_unixtime(grr__entry.end_time, '%H:%i'), grr__entry.name, grr__entry.room_id FROM grr__entry, grr__room WHERE
(grr__entry.room_id=grr__room.id) AND
(grr__entry.moderate='0') AND
(grr__entry.courrier='1') AND
(grr__entry.end_time > $timestamp) AND
(grr__entry.start_time < $timestamp+$finjournee)
ORDER BY grr__entry.start_time";

const app = express();

app.get('/events', function (req, res) {
  connection.getConnection(function (err, connection) {

  connection.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;

    res.send(results)
  });
  });
});

app.listen(3000, () => {
  console.log('Go to localhost:3000/events');
});
