var express = require('express');
var app = express();

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));


app.set('view engine', 'ejs');

app.get('/:room', function(req, res) {
    var data = { user: "Apicha" };
    res.render('home', { room: req.params.room, data: data });
});
app.listen(8080);