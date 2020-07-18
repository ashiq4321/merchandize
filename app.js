var express = require('express'); //To include the express module
var app = express(); //create a server object 
var fs = require('fs');
app.use(express.static('assests')) //To include static file
const bodyParser = require('body-parser') //To include body-parser module


let inv = fs.readFileSync('inventories.json') //To include the user define module(inventories)
inv = JSON.parse(inv);


var id = 0;
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
    res.write('<body style="background-color: coral"><div  align="center"> Requisition Order:' + req.body.order_id + '<br><br>') //retrive value of 'order_id'

    id = req.body.order_id;

    if (req.body.Jeresh_q != '') {
        var Jeresh_quantity = parseInt(req.body.Jeresh_q) //retrive value of 'Jeresh_quantity'
        res.write("<h1> Your Jeresh quantity is:" + Jeresh_quantity + "</h1>") //stream data
        if (Jeresh_quantity > inv.Jeresh) { //inventory quantity check
            Jeresh_quantity = inv.Jeresh
            res.write('Sorry, The quantity we can supply is ' + inv.Jeresh)
        } else {
            inv['Jeresh'] = inv.Jeresh - Jeresh_quantity;
        }
    }
    if (req.body.Marqoq_q != '') {
        var Marqoq_quantity = parseInt(req.body.Marqoq_q) //retrive value of 'Marqoq_quantity'
        res.write("<h1> Your Marqoq quantity is:" + Marqoq_quantity + "</h1>") //stream data
        if (Marqoq_quantity > inv.Marqoq) { //inventory quantity check
            Marqoq_quantity = inv.Marqoq
            res.write('Sorry, The quantity we can supply is ' + inv.Marqoq)
        } else {
            inv['Marqoq'] = inv.Marqoq - Marqoq_quantity;
        }
    }
    if (req.body.ChickenKabsah_q != '') {
        var ChickenKabsah_quantity = parseInt(req.body.ChickenKabsah_q) //retrive value of 'ChickenKabsah_quantity'
        res.write("<h1> Your Chicken Kabsah quantity is:" + ChickenKabsah_quantity + "</h1>") //stream data
        if (ChickenKabsah_quantity > inv.Chicken_Kabsah) { //inventory quantity check
            res.write('Sorry, The quantity we can supply is ' + inv.Chicken_Kabsah)
            ChickenKabsah_quantity = inv.Chicken_Kabsah
        } else {
            inv['Chicken_Kabsah'] = inv.Chicken_Kabsah - ChickenKabsah_quantity;
        }
    }
    if (req.body.Waraqenab_q != '') {
        var Waraqenab_quantity = parseInt(req.body.Waraqenab_q) //retrive value of 'Waraqenab_quantity'
        res.write("<h1> Your Waraqenab quantity is:" + Waraqenab_quantity + "</h1>") //stream data
        if (Waraqenab_quantity > inv.Waraq_enab) { //inventory quantity check
            res.write('Sorry, The quantity we can supply is ' + inv.Waraq_enab)
            Waraqenab_quantity = inv.Waraq_enab
        } else {
            inv['Waraq_enab'] = inv.Waraq_enab - Waraqenab_quantity;
        }
    }
    if (req.body.Humus_q != '') {
        var Humus_quantity = parseInt(req.body.Humus_q) //retrive value of 'Humus_quantity'
        res.write("<h1> Your Humus quantity is:" + Humus_quantity + "</h1>") //stream data
        if (Humus_quantity > inv.Humus) { //inventory quantity check
            res.write('Sorry, The quantity we can supply is ' + inv.Humus)
            Humus_quantity = inv.Humus
        } else {
            inv['Humus'] = inv.Humus - Humus_quantity;
        }
    }
    if (req.body.Babaganosh_q != '') {
        var Babaganosh_quantity = parseInt(req.body.Babaganosh_q) //retrive value of 'Babaganosh_quantity'
        res.write("<h1> Your Babaganosh quantity is:" + Babaganosh_quantity + "</h1>") //stream data
        if (Babaganosh_quantity > inv.Baba_ganosh) { //inventory quantity check
            res.write('Sorry, The quantity we can supply is ' + inv.Baba_ganosh)
            Babaganosh_quantity = inv.Baba_ganosh
        } else {
            inv['Baba_ganosh'] = inv.Baba_ganosh - Babaganosh_quantity;
        }
    }
    if (req.body.Salat_q != '') {
        var Salat_quantity = parseInt(req.body.Salat_q) //retrive value of 'Marqoq_quantity'
        res.write("<h1> Your Salat quantity is:" + Salat_quantity + "</h1>") //stream data
        if (Salat_quantity > inv.Salat) { //inventory quantity check
            res.write('Sorry, The quantity we can supply is ' + inv.Salat)
            Salat_quantity = inv.Salat
        } else {
            inv['Salat'] = inv.Salat - Salat_quantity;
        }
    }


    cost = Jeresh_quantity * 30 + Marqoq_quantity * 25 + ChickenKabsah_quantity * 50 + Waraqenab_quantity * 15 +
        Humus_quantity * 10 + Babaganosh_quantity * 15 + Salat_quantity * 5 // cost calculation
    res.write('<br><h2>Your total is $' + cost + ' </h2><br>') //stream data
    tax = cost * 0.06 //tax calculation
    res.write(' <h2>Your Tax is: $' + tax + ' </h2><br>') //stream data
    res.write('<h2>Amount Due: $' + (cost + tax).toFixed(2) + '/<h2>') //stream data

    res.write('<form action = "http://localhost:3000/confirm_order" method = "post">') //stream data
    res.write('<input type="submit" value="Confirm Order">') //stream data
    res.write('</form>') //stream data

    res.write('<form action = "http://localhost:3000/cancel_order" method = "post">') //stream data
    res.write('<input type="submit" value="Cancel Order">') //stream data
    res.write('</form> </div> </body>') //stream data
    res.end()
});

app.post('/confirm_order', (req, res) => { //To handle post request in '/confirm_order' 
    inv = JSON.stringify(inv);
    fs.writeFile('inventories.json', inv, (err) => {
        console.log(err);
    })
    res.setHeader('Content-Type', 'text/html') //To send response to client  as html script
    res.write('<body style="background-color: coral"><div  style="width:1000px; margin:20% auto;"> <h1>Order ' + id + ' confirmed. Thank you </h1> </div></body>') //stream data
    res.end()
})

app.post('/cancel_order', (req, res) => { //To handle post request in '/cancel_order' 
    res.setHeader('Content-Type', 'text/html') //To send response to client  as html script

    res.write(' <body style="background-color: coral"><div  style="width:1000px; margin:20% auto;" > <h1>Order cancelled. Please visit us again</h1> </div></body>') //stream data
    res.end()
})

app.listen(3000, function () { //the app object listens on port 8080
    console.log('express server started at 3000'); //message to log when server started
});