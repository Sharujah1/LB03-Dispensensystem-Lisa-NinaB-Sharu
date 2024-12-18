const express = require('express');
const mysql = require('mysql');
const {stringify} = require("querystring");
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dispenssystem'
});

app.post('/antrag', (req, res) => {
    const {lernende_id, lehrende_id, datum, grund} = req.body;
    const query = 'INSERT INTO Dispensationsantraege (lernende_id, lehrende_id, datum, grund, status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [lernende_id, lehrende_id, datum, grund, 'Pending'], (err, result) => {
        if (err) throw err;
        res.send('Antrag erfolgreich eingereicht');
    });
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});