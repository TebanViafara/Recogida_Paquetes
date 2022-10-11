const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());
app.use(cors())

// MySql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'insta_ya'
});

app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

// Login
app.post('/login', (req, res) => {

    const { user, password } = req.body;

    const sql = `SELECT * FROM users WHERE user = '${user}' AND password = '${password}'`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json([]);
        }
    });
});

// User register
app.post('/users/add', (req, res) => {
    const sql = 'INSERT INTO users SET ?';

    const userObj = {
        name: req.body.name,
        user: req.body.user,
        password: req.body.password,
        email: req.body.email,
        dni: req.body.dni,
    };

    connection.query(sql, userObj, error => {
        if (error) throw error;
        res.send({ 'status': 1, 'message': 'User created!' });
    });
});

// List Shippings
app.get('/shippings', (req, res) => {

    const sql = 'SELECT * FROM shippings';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json([]);
        }
    });
});

// List specific Shippings
app.get('/shippings/:id', (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM shippings WHERE id = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.json([]);
        }
    });
});

// Shipping store
app.post('/shippings/add', (req, res) => {
    const sql = 'INSERT INTO shippings SET ?';

    const shippingObj = {
        dni: req.body.dni,
        full_name: req.body.full_name,
        date: req.body.date,
        time_zone: req.body.time_zone,
        width: req.body.width,
        length: req.body.length,
        height: req.body.height,
        size: req.body.size,
        origin_address: req.body.origin_address,
        origin_city: req.body.origin_city,
        full_name_receiver: req.body.full_name_receiver,
        dni_receiver: req.body.dni_receiver,
        destination_address: req.body.destination_address,
        destination_city: req.body.destination_city,
        status: 'Guardado',
    };

    connection.query(sql, shippingObj, error => {
        if (error) throw error;
        res.send('Shipping created!');
    });
});

app.put('/shippings/update/:id', (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE shippings SET ? WHERE id = ${id}`;

    const shippingObj = {
        date: req.body.date,
        time_zone: req.body.time_zone,
        width: req.body.width,
        length: req.body.length,
        height: req.body.height,
        size: req.body.size,
        origin_address: req.body.origin_address,
        origin_city: req.body.origin_city,
        full_name_receiver: req.body.full_name_receiver,
        dni_receiver: req.body.dni_receiver,
        destination_address: req.body.destination_address,
        destination_city: req.body.destination_city,
        status: req.body.status,
    };

    connection.query(sql, shippingObj, error => {
        if (error) throw error;
        res.send('Shipping updated!');
    });
});

// Check connect
connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));