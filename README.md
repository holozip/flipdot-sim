# Flipdot Simulator

This project provides emulation for FlipDot matrix display panels in a browser.

It comprises of client side javascript that runs in the browser, and a node server.

Examples of scripts that can be run against the FlipDot emulator can be found here:
https://github.com/openlab-aux/flipdots/tree/master/scripts


## Server
The server side javascript runs in nodejs and is responsible for taking packets of bits via UDP, and rebroadcasting them over a websocket to the client.

Assuming you have nodejs and npm already installed the following will start the server component:

    npm install
    node server/server.js

The default ports can be modified by changing these variable declarations:

    var webSocketsServerPort = 1337;
    var udpServerPort = 2323;


## Client
The client javascript is self contained in flippy.js.

The client binds to a websocket on the server, and updates the flipdot board every time a message is recieved.
Dependencies can be fetched with bower:

    bower install
    
A basic web page that loads flippy as follows:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Flipdot Simulator</title>
        <script src="bower_components/jquery/dist/jquery.js"></script>
        <script src="bower_components/p5.js/lib/p5.js"></script>
        <script src="js/flippy.js"></script>
    </head>
    <body>
    
    <script>
    
    </script>
    </body>
    </html>