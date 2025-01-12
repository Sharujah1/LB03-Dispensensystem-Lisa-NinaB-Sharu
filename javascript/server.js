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




/***************** Änderungen ab hier lol *******************/

// Fetch all rows from the dispensation table for a specific person
app.get('/dispensen/user/:id', (req, res) => {
    const person_id = req.params.id

    const query = 'SELECT * FROM dispensation where person_id = ?';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data from the database.');
            return;
        }
        res.json(results);
    });
});


// von Schulunterlagen

// Method to get data from the user table --> aber ich will alle Daten von einer Person anzeigen?
app.get('/user/:id', (req, res) => {
    const person_id = req.params.id;
    const query = 'SELECT * FROM users WHERE person_id = ?'; // SQL query to select all rows from user table

    db.query(query, [person_id], (err, results) => {
        if (err) {
            console.error(`[ERROR] Failed to retrieve user with ID ${person_id}: ${err.message}`);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again later.'
            });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: `User with ID ${person_id} not found`
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: results[0] // Es wird nur ein Benutzer zurückgegeben
        });
    });
});

// Retrieve a single user by person_id

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    // SQL query to fetch user by id
    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).send('Server error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(results[0]);
        }
    });
});

// User can update their information

app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    const { phone_number, password, last_name, first_name } = req.body; // Hole die Felder aus dem Request Body

    // Überprüfen, ob mindestens ein Feld übergeben wurde
    if (!phone_number && !password && !last_name && !first_name) {
        return res.status(400).send('At least one field (phone_number, password, last_name, or first_name) must be provided for update.');
    }

    // Dynamisches Erstellen der Update-Query
    const updates = [];
    const values = [];

    if (phone_number) {
        updates.push('phone_number = ?');
        values.push(phone_number);
    }
    if (password) {
        updates.push('password = ?');
        values.push(password);
    }
    if (last_name) {
        updates.push('last_name = ?');
        values.push(last_name);
    }
    if (first_name) {
        updates.push('first_name = ?');
        values.push(first_name);
    }

    // Füge die person_id als letztes hinzu
    values.push(person_id);

    const updateQuery = `UPDATE users SET ${updates.join(', ')} WHERE person_id = ?`;

    // Führe die Query aus
    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating user');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(`User with ID ${person_id} updated successfully`);
        }
    });
});


// add new user
app.post('/user', (req, res) => {
    const { person_id,
        first_name,
        last_name,
        birth_date,
        phone_number,
        email_address,
        password } = req.query; // Get username and email from query parameters
    // Ensure that both fields are provided
    if (!person_id || !first_name || !last_name || !birth_date || !phone_number || !email_address || !password) {
        return res.status(400).send('All fields are required.');
    }
    // Construct the insert query
    const insertQuery = 'INSERT INTO users (person_id, first_name, last_name, birth_date, phone_number, email_address, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
        person_id,
        first_name,
        last_name,
        birth_date,
        phone_number,
        email_address,
        password
    ]; // Use provided fields for insertion
    db.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Error inserting user');
        }
        // Respond with the ID of the newly created user
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});
