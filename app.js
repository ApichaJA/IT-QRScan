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

async function user_info() {
    try {
        const result = await client.query("select * from it_user");
        return result.rows;
    } catch (e) {
        return [];
    }
}

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));


app.set('view engine', 'ejs');

app.get('/test', async(req, res) => {
    const rows = await user_info();
    res.send(JSON.stringify(rows));
});

app.get('/', function(req, res) {
    if (typeof req.cookies.urCookie == "undefined") {
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
    res.cookie('urCookie', 'Japanapi62070216');
    res.end('Create Cookie');
})

app.get('/deleteCk', function(req, res) {
    res.clearCookie('urCookie');
    res.end('Del Cookie');

})
client.connect()
    .finally(() => console.log("Connected"))

app.listen(8080);