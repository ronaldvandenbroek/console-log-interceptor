var http = require("http"),
    url = require("url")
port = process.argv[2] || 8888;

http.createServer(function (request, response) {

    var uri = url.parse(request.url).pathname;
    console.log(uri);
    response.writeHead(200);
    response.end();
    return;
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");