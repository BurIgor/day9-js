var express = require('express');
var ws = require('ws');
var queue = [];
const WORKING_TIME = 12000;
const MESS_INTERVAL = 4000;
var app = express();
app.get('/', function (req, res) {
   res.sendFile(__dirname + '/client.html');
})
app.listen(3000, function () {
   console.log('Example of managing client connections.')
})


var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510});
wss.on('connection', function (ws) {
  queue.push(ws);
  ws.on('message', function (message) {
    console.log('received: %s', message);
    sendToClient(message);    
  });

  setTimeout(function () {
  		let worktime = setInterval(function () {
  			sendToClient("you're working");
  		}, MESS_INTERVAL);
  		if (queue.length > 1) {
  			sendToClient('your working time is gone');
  			queue.shift();
  			clearInterval(worktime);
  			sendToClient('next connection..............');
  		}
  	}, (queue.length - 1) * WORKING_TIME);

  let sendToClient = function (mess) {
  	queue[0].send(mess);
  	console.log('send message: ' + mess)
  } 
})
