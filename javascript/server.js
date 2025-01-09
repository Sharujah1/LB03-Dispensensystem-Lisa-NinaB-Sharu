const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1>Personal Information Form</h1>
        <form action="/submit" method="post">
            <label for="role">Role:</label>
            <select id="role" name="role">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select><br><br>
            
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" required><br><br>
            
            <input type="submit" value="Submit">
        </form>
    `);
});

app.post('/submit', (req, res) => {
    const { role, name, email, age } = req.body;
    res.send(`Thank you for submitting your information, ${role} ${name}.`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});