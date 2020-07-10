var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    if (req.url == '/ez-order') {
        fs.createReadStream('index.html').pipe(res);
    } else {
        res.write('invalid request! try with a valid url!');
        res.end();
    }

});

server.listen(3000);
console.log('server started at 3000!');