var express = require('express');
var cookie = require('cookie-parser');
const { Client } = require('pg');

var app = express();

app.use(cookie());

const client = new Client({
    user: "Japanapi",
    password: "Japan62070216",
    host: "localhost",
    post: 5432,
    database: "it_scanner"
})

client.connect()
    .then(() => console.log("Connected"))
    .then(() => client.query("select * from it_user"))
    .then(results => console.table(results.rows))
    .catch(e => console.log(e))
    .finally(() => client.end())

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));


app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (req.cookies.myCookie == "") {
        res.render('home', { checkStatus: "SignIn" });
    } else {
        res.render('home', { checkStatus: "CheckIn" });
    }
});

app.get('/room/:room', function(req, res) {
    res.render('home', { room: req.params.room });
});

app.get('/makeqr', function(req, res) {
    res.render('makeqr');
});


//Set Cookie
app.get('/createCk', function(req, res) {
    res.cookie('myCookie', 'Japanapi62070216');
    res.end('Create Cookie');
})

app.get('/deleteCk', function(req, res) {
    res.clearCookie('myCookie');
    res.end('Del Cookie');
})

app.listen(8080);