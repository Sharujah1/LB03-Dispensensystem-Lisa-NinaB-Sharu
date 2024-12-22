/* */

function myFunction() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("numb").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (isNaN(x) || x < 1 || x > 10) {
        text = "Input not valid";
    } else {
        text = "Input OK";
    }
    document.getElementById("demo").innerHTML = text;
}






















/* chatgpt */

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