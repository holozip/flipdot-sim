/**
 * Created by gcrispin and yommy on 06/12/2015.
 */

var columns;
var rows;
var bits = [];
var size;
var stroke_weight;

window.WebSocket = window.WebSocket || window.MozWebSocket;
var connection = new WebSocket('ws://localhost:1337');

connection.onopen = function () {
    console.log("Connected to websocket");
};

connection.onerror = function (error) {
    console.log("Websocket error:" + error);
};

connection.onmessage = function (message) {
    try {
        var json = JSON.parse(message.data);
    } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
    }
    bits = json.data.split("");
};

function setup() {
    rows = 16;
    columns = 120;
    size = 8;
    stroke_weight = 0.3;
    // canvas size:
    width = columns * (size + 1);
    height = rows * (size + 1);
    createCanvas(width, height);

    for (var i = 0; i < rows*columns; i++)
        bits[i] = 1;
}

function draw() {
    background(255);
    cnt = 0;
    for ( var y = 0; y < rows;y++) {
        for ( var x = 0; x < columns;x++) {
            if ((bits[cnt] == 1)) fill(0);
            else fill(255);
            strokeWeight(stroke_weight);
            stroke(240,240,240);
            rect(x*(size + 1), y*(size + 1), size, size);
            cnt++;
        }
    }
}