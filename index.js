var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.post('/user', function (req, res) {

    var names = req.body.names;
    var lastnames = req.body.lastnames;
    var country = req.body.country;
    var city = req.body.city;
    var email = req.body.email;
    var interests = req.body.interests;

    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }
        // SQL Query > Insert Data
        client.query('INSERT INTO user(names, lastnames, country, city, email, interests) values($1, $2, $3, $4, $5, $6)', [names, lastnames, country, city, email, interests]);
        // SQL Query > Select Data

        res.send('Usuario Agregado!')

    });


});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});