var express = require('express'); //To include the express module
var app = express(); //create a server object 
let inv = require('./inventories.js') //To include the user define module(inventories)

const bodyParser = require('body-parser') //To include body-parser module

app.use(bodyParser.urlencoded({
    extended: false // to esure the value can be a string or array 
}))

app.get('/ez-order', function (req, res) { //To handle get request in '/ez-order' 
    res.sendFile(__dirname + '/index.html'); // To send html file as response 
});

app.post('/ez-order', function (req, res) { //To handle post request in '/ez-order' 
    res.setHeader('Content-Type', 'text/html') //To send response to client  as html script
    var pencil_quantity = 0; //intializing variable
    var eraser_quantity = 0; //intializing variable
    res.write('Requisition Order:' + req.body.order_id + '<br><br>') //retrive value of 'order_id'

    if (req.body.pencil_q != '') {
        var pencil_quantity = parseInt(req.body.pencil_q) //retrive value of 'pencil_quantity'
    }
    if (req.body.eraser_q != '') {
        var eraser_quantity = parseInt(req.body.eraser_q) //retrive value of 'eraser_quantity'
    }
    res.write("<h1> Your pencil_quantity is:" + pencil_quantity + "</h1>") //stream data
    res.write("<h1> Your eraser_quantity is:" + eraser_quantity + "</h1>") //stream data

    if (pencil_quantity > inv['Pencil']) { //condtion to check pencil_quantity exceed
        res.write('Sorry, The pencil_quantity we can supply is ' + inv['Pencil' + '<br>'])
        pencil_quantity = inv['Pencil']
    }
    if (eraser_quantity > inv['Eraser']) { //condtion to check eraser_quantity exceed
        res.write('Sorry, The eraser_quantity we can supply is ' + inv['Eraser' + '<br>'])
        eraser_quantity = inv['Eraser']
    }

    cost = pencil_quantity * 3 + eraser_quantity * 2 // cost calculation
    res.write('Your total is' + cost + '<BR>') //stream data
    tax = cost * 0.06 //tax calculation
    res.write('Your Tax is:' + tax + '<br>') //stream data
    res.write('Amount Due:' + (cost + tax).toFixed(2)) //stream data

    res.write('<form action = "http://localhost:3000/confirm_order" method = "post">') //stream data
    res.write('<input type="submit" value="Confirm Order">') //stream data
    res.write('</form>') //stream data

    res.write('<form action = "http://localhost:3000/cancel_order" method = "post">') //stream data
    res.write('<input type="submit" value="Cancel Order">') //stream data
    res.write('</form>') //stream data
    res.end()
});

app.post('/confirm_order', (req, res) => { //To handle post request in '/confirm_order' 
    res.setHeader('Content-Type', 'text/html') //To send response to client  as html script
    res.write('Order confirmed. Thank you') //stream data
    res.end()
})

app.post('/cancel_order', (req, res) => { //To handle post request in '/cancel_order' 
    res.setHeader('Content-Type', 'text/html') //To send response to client  as html script
    res.write('Order cancelled. Please visit us again') //stream data
    res.end()
})

app.listen(3000, function () { //the app object listens on port 8080
    console.log('express server started at 3000'); //message to log when server started
});