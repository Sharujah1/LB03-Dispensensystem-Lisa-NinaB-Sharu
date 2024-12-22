/* */
const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')


form.addEventListener('submit', (e) => {
    let messages = []
    if (name.value === '' || name.value == null) {
        messages.push('Name is required')
    }

    if (password.length <= 6) {
        messages.push('Password must be longer than 6 characters')
    }

    if (password.length >= 20) {
        messages.push('Password must be shorter than 20 characters')
    }

    if (password.value === 'password') {
        messages.push('Password cannot be password')
    }

    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})















/* chatgpt */

const express = require('express');
const mysql = require('mysql');
const {stringify} = require("querystring");
const {hashPassword} = require("mysql/lib/protocol/Auth");
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