var express = require('express');
const { Client } = require('pg');

var app = express();

const client = new Client({
    user: "Japanapi",
    password: "Japan62070216",
    host: "localhost",
    post: 5432,
    database: "it_scanner"
})

start();
async function start() {

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

    app.get('/', async(req, res) => {
        const rows = await user_info();
        res.send(JSON.stringify(rows));
    });

    client.connect()
    app.listen(8080);
}