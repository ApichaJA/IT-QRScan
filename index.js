const { Client } = require('pg')
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