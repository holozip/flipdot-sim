/**
 * Created by gcrispin on 06/12/2015.
 *
 * Simple node server that listens for UDP and re-broadcasts over websockets
 */

var dgram = require("dgram");
var WebSocketServer = require('websocket').server;
var http = require('http');
var webSocketsServerPort = 1337;
var udpServerPort = 2323;

// function for converting the base of a value:
var ConvertBase = function (num) {
    return {
        from : function (baseFrom) {
            return {
                to : function (baseTo) {
                    return parseInt(num, baseFrom).toString(baseTo);
                }
            };
        }
    };
};

// wonky string extension for padding values:
String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
};

// clients global array:
var clients = [ ];

// Set up our UDP server and event handlers:
var udp_server = dgram.createSocket("udp4");

udp_server.on("error", function (err) {
    console.log("udp_server error:\n" + err.stack);
    udp_server.close();
});

udp_server.on("message", function (msg, rinfo) {
    console.log("udp_server got message from " + rinfo.address + ":" + rinfo.port);

    var string = "";
    for (var i=0; i < msg.length; i++) {
        string += ConvertBase(msg[i]).from(10).to(2).lpad("0", "8");
    }
    for (var i=0; i < clients.length; i++) {
        clients[i].sendUTF(JSON.stringify({ type:'message', data: string}));
    }
});

udp_server.on("listening", function () {
    var address = udp_server.address();
    console.log("udp_server listening " + address.address + ":" + address.port);
});


// Create a http server (we're not serving content, just using it for websockets)
var http_server = http.createServer(function(request, response) {
});

http_server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

// Set up our WebSocket server:
var wsServer = new WebSocketServer({
    httpServer: http_server
});

wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);

    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;

    connection.on('close', function(connection) {
        console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
        // remove user from the list of connected clients
        clients.splice(index, 1);
    });

});

udp_server.bind(udpServerPort);