const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const credentials = {
  host: "localhost",
  port: "3308",
  user: "root",
  password: "root",
  database: "grr_v31"
};

const db = mysql.createPool(credentials);

const timestamp = Math.round((new Date()).getTime()/1000) + 7200;
const sqlQuery = "SELECT from_unixtime(grr__entry.start_time, '%H:%i') debut, from_unixtime(grr__entry.end_time, '%H:%i') fin, grr__entry.name intitule, grr__entry.room_id FROM grr__entry WHERE (grr__entry.moderate='0') AND (grr__entry.courrier='1') AND (grr__entry.end_time >" + timestamp.toString() + ") ORDER BY grr__entry.start_time";

var room = -1;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.get('/events', (req, res) => {
  db.query(sqlQuery, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/api/request', (req,res) => {
  room = req.body.room_id;
  console.log(req.body);
  res.status(200).send();
  app.get('/request', (req, res) => {
    res.send({room_id: room});
  });

});


app.listen(3001, () => {
  console.log("running on port 3001");

})
