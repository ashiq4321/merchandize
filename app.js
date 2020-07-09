var express = require('express');
var app = express();
var ejs = require('ejs');
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));


app.get('/', function (req, res) {
    res.send('Welcome Online Shoping!!!');
});

app.get('/ez-order', function (req, res) {
    res.render('index');
});


app.listen(3000, function () {
    console.log('express server started at 3000');
});