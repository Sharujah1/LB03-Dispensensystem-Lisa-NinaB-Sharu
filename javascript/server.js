//chatgpt
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


// Endpoint to fetch data from the database
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


// moodle

// Method to get data from the user table
app.get('/user', (req, res) => {
    const query = 'SELECT * FROM users'; // SQL query to select all rows from user table
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results); // Send the results as JSON
    });
});

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

app.delete('/user/:id', (req, res) => {
    const userId = req.params.id;
    const deleteQuery = 'DELETE FROM users WHERE user_id = ?';
    db.query(deleteQuery, [userId], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting user');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(`User with ID ${userId} deleted successfully`);
        }
    });
});

app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.query; // Get username and email from query parameters
    // Ensure that at least one field is provided
    if (!username && !email) {
        return res.status(400).send('At least one field (username or email) must be provided for update.');
    }
    // Construct the update query
    const updateQuery = 'UPDATE users SET username = ?, email = ? WHERE user_id = ?';
    const values = [username || null, email || null, userId]; // Use null for any field not provided
    db.query(updateQuery, values, (err, result) => {
        if (err) {
            res.status(500).send('Error updating user');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.send(`User with ID ${userId} updated successfully`);
        }
    });
});

// insert a row
app.post('/user', (req, res) => {
    const { username, email } = req.query; // Get username and email from query parameters
    // Ensure that both fields are provided
    if (!username || !email) {
        return res.status(400).send('Username and email are required for insertion.');
    }
    // Construct the insert query
    const insertQuery = 'INSERT INTO users (username, email) VALUES (?, ?)';
    const values = [username, email]; // Use provided fields for insertion
    db.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Error inserting user');
        }
        // Respond with the ID of the newly created user
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});