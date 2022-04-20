const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const path = require('path');
const fs = require('fs');
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, './client')));
createWatcher();

function createWatcher() {
    const absolute = './client';
    fs.watch(absolute, function(eventType, filename) {
        if (filename) {
            io.sockets.emit('reload');
        }
    });
}

server.listen(8086, function() {
    console.log(`The server is running on port 8086.`);
});