const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
 
// Middleware
app.use(bodyParser.json());
 
// Database connection configuration
const db = mysql.createConnection({
 
    host: 'localhost',
    user: 'server',
    password: '1234',
    database: 'dispensen'
});
 
 
 
// Connect to the database
db.connect((err) => {
 
    if (err) {
 
        console.error('Error connecting to the database:', err);
 
        return;
 
    }
 
    console.log('Connected to the database.');
 
});
 
 
 
// Start the server
app.listen(port, () => {
 
    console.log(`Server is running on http://localhost:${port}`);
 
});
 
 

 
 
// GET: Es können Dispensen pro Person und mit allen Details ausgegeben werden.

app.get('/dispensen/user/:id', (req, res) => {
 
    const person_id = req.params.id
 
    const query = 'SELECT * FROM dispensation where person_id = ?';
 
    db.query(query, [person_id], (err, results) => {
        if (err) {
 
            console.error('Error fetching data:', err);
 
            res.status(500).send('Error fetching data from the database.');
 
            return;
 
        }
 
        res.json(results);
 
    });
 
});
 
 
 
// POST: Es können weitere Dispensen angelegt werden.
 
app.post('/dispensen', (req, res) => {
 
    const { person_id, status_id, date_from, date_til, subject, reason, comments } = req.body;
 
    // Construct the insert query
 
    const insertQuery = 'INSERT INTO dispensation (person_id, status_id, date_from, date_til, subject, reason, comments) VALUES (?, ?, ?, ?, ?, ?, ?)';
 
    const values = [person_id, status_id, date_from, date_til, subject, reason, comments]; // Use provided fields for insertion
 
    db.query(insertQuery, values, (err, result) => {
 
        if (err) {
 
            console.error('Error inserting Dispens', err);
 
            return res.status(500).send('Error inserting Dispens');
 
            return;
 
        }
 
       // Respond with the ID of the newly created user
 
        res.status(201).send(`Dispens added`);
 
    });
 
});
 
 
 
// PUT: Dispensen, die in der Warteschlange stehen, können noch bearbeitet werden.
 
// Dispens abrufen
 
app.put('/dispensen/:id', async (req, res) => {
 
    const dispensen_id = req.params.id;
 
    const getQuery = 'SELECT * FROM dispensation WHERE dispens_id = ?';
 
    let dispens = new Promise((resolve, reject) => {
 
        db.query(getQuery, [dispensen_id], (err, results) => {
 
            if (err) {
 
                console.error('Error executing query:', err);
 
                reject(err); /** Reject the promise with the error */
 
                return;
 
            }
 
            resolve(results); /** Resolve the promise with the results */
 
        });
 
    });
 
 
 
 
 
    // Body Daten abrufen oder bestehende Daten verwenden
 
    const person_id = req.body.person_id || dispens.person_id;
 
    const status_id = req.body.status_id || dispens.status_id;
 
    const date_from = req.body.date_from || dispens.date_from;
 
    const date_til = req.body.date_til || dispens.date_til;
 
    const subject = req.body.subject || dispens.subject;
 
    const reason = req.body.reason || dispens.reason;
 
    const comments = req.body.comments || dispens.comments;
 
 
 
// neue Daten in die Datenbank einfügen
 
const updateQuery = 'UPDATE dispensation SET person_id = ?, status_id = ?, date_from = ?, date_til = ?, subject = ?, reason = ?, comments = ? WHERE dispens_id = ?';
 
    const values = [person_id, status_id, date_from, date_til, subject, reason, comments, dispensen_id];
 
    db.query(updateQuery, values, (err, result) => {
 
        if (err) {
 
            res.status(500).send('Error updating user');
 
        } else if (result.affectedRows === 0) {
 
            res.status(404).send('Dispens not found');
 
        } else {
 
            res.send(`Dispens with id ${dispensen_id} updated successfully`);
 
        }
 
    });
 
 
 
});
 
 
 
// DELETE: Aktuell anstehende Dispensen können gelöscht werden. (Vergangene können nicht gelöscht werden.)
 
app.delete('/dispensen/:id', (req, res) => {
 
    const dispens_id = req.params.id;
 
    const deleteQuery = 'DELETE FROM dispensation WHERE dispens_id = ?';
 
    db.query(deleteQuery, [dispens_id], (err, result) => {
 
        if (err) {
 
            res.status(500).send('Error deleting dispens');
 
        } else if (result.affectedRows === 0) {
 
            res.status(404).send('Dispens not found');
 
        } else {
 
            res.send(`Dispens with ID ${dispens_id} deleted successfully`);
 
        }
 
    });
 
});
 
