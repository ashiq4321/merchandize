var express = require('express'); //To include the express module
var app = express(); //create a server object 
let inv = require('./inventories.js') //To include the user define module(inventories)
app.use(express.static('assests')) //To include static file

const bodyParser = require('body-parser') //To include body-parser module

app.use(bodyParser.urlencoded({
    extended: false // to esure the value can be a string or array 
}))

app.get('/ez-order', function (req, res) { //To handle get request in '/ez-order' 
    res.sendFile(__dirname + '/index.html'); // To send html file as response 
});

app.post('/ez-order', function (req, res) { //To handle post request in '/ez-order' 
    res.setHeader('Content-Type', 'text/html', ) //To send response to client  as html script
    var ChickenKabsah_quantity = 0; //intializing variable
    var Jeresh_quantity = 0; //intializing variable
    var Marqoq_quantity = 0; //intializing variable
    var Waraqenab_quantity = 0; //intializing variable
    var Humus_quantity = 0; //intializing variable
    var Babaganosh_quantity = 0; //intializing variable
    var Salat_quantity = 0; //intializing variable
    res.write('<div class="container"> Requisition Order:' + req.body.order_id + '<br><br>') //retrive value of 'order_id'

    if (req.body.Jeresh_q != '') {
        var Jeresh_quantity = parseInt(req.body.Jeresh_q) //retrive value of 'Jeresh_quantity'
        res.write("<h1> Your Jeresh quantity is:" + Jeresh_quantity + "</h1>") //stream data
    }
    if (req.body.Marqoq_q != '') {
        var Marqoq_quantity = parseInt(req.body.Marqoq_q) //retrive value of 'Marqoq_quantity'
        res.write("<h1> Your Marqoq quantity is:" + Marqoq_quantity + "</h1>") //stream data
    }
    if (req.body.ChickenKabsah_q != '') {
        var ChickenKabsah_quantity = parseInt(req.body.ChickenKabsah_q) //retrive value of 'ChickenKabsah_quantity'
        res.write("<h1> Your Chicken Kabsah quantity is:" + ChickenKabsah_quantity + "</h1>") //stream data
    }
    if (req.body.Waraqenab_q != '') {
        var Waraqenab_quantity = parseInt(req.body.Waraqenab_q) //retrive value of 'Waraqenab_quantity'
        res.write("<h1> Your Waraqenab quantity is:" + Waraqenab_quantity + "</h1>") //stream data
    }
    if (req.body.Humus_q != '') {
        var Humus_quantity = parseInt(req.body.Humus_q) //retrive value of 'Humus_quantity'
        res.write("<h1> Your Humus quantity is:" + Humus_quantity + "</h1>") //stream data
    }
    if (req.body.Babaganosh_q != '') {
        var Babaganosh_quantity = parseInt(req.body.Babaganosh_q) //retrive value of 'Babaganosh_quantity'
        res.write("<h1> Your Babaganosh quantity is:" + Babaganosh_quantity + "</h1>") //stream data
    }
    if (req.body.Salat_q != '') {
        var Salat_quantity = parseInt(req.body.Salat_q) //retrive value of 'Marqoq_quantity'
        res.write("<h1> Your Salat quantity is:" + Salat_quantity + "</h1>") //stream data
    }

    cost = Jeresh_quantity * 30 + Marqoq_quantity * 25 + ChickenKabsah_quantity * 20 + Waraqenab_quantity * 15 +
        Humus_quantity * 10 + Babaganosh_quantity * 15 + Salat_quantity * 5 // cost calculation
    res.write('Your total is $' + cost + '<BR>') //stream data
    tax = cost * 0.06 //tax calculation
    res.write('Your Tax is: $' + tax + '<br>') //stream data
    res.write('Amount Due: $' + (cost + tax).toFixed(2)) //stream data

    res.write('<form action = "http://localhost:3000/confirm_order" method = "post">') //stream data
    res.write('<input type="submit" value="Confirm Order">') //stream data
    res.write('</form>') //stream data

    res.write('<form action = "http://localhost:3000/cancel_order" method = "post">') //stream data
    res.write('<input type="submit" value="Cancel Order">') //stream data
    res.write('</form> </div>') //stream data
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