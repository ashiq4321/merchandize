var http = require('http'); //To include the HTTP module
var fs = require('fs'); //To include the File System module

var server = http.createServer(function (req, res) { //create a server object 
    if (req.url == '/ez-order') { //url defined
        fs.createReadStream('index.html').pipe(res); //To open the file as a readable stream (createReadStream) and pipes the read stream to the response object (which goes to the client)
    } else { //to handle other request
        res.write('invalid request! try with a valid url!'); //write a response to the client
        res.end(); //end the response
    }

});

server.listen(3000); //the server object listens on port 8080
console.log('server started at 3000!'); //message to log when server started