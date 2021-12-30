//const logger = require('./logger.js');
//const path = require('path');
//const os = require('os');
//const fs = require('fs');
//const EventEmitter = require('events');
const http = require('http');


//logger.log("message");





//path modudle

//var pathObj = path.parse(__filename);
//console.log(pathObj);




//os module

//var totalMemory = os.totalmem();
//var freeMemory = os.freemem();
//console.log(`Total Memory ${totalMemory}`);
//console.log(`Free Memory ${freeMemory}`);




//fs module

//var files = fs.readdirSync('./');
//console.log(files);

//fs.readdir('./', function(err, files){
//    if(err) console.log("Error", err);
//    else console.log("Result", files);
//});




//event module

//const emitter = new EventEmitter();
//register a listener
//emitter.on("MessageLogged", function(eventArg){
//    console.log("Listener Called", eventArg);
//});
//rasie an event
//emitter.emit("MessageLogged", {id: 1, url: 'http::/'});

//const Logger = require('./logger');
//const logger = new Logger;

//exercise: raise and register login
//logger.on("Login", (arg) => {
//    console.log("Login Listener Called", arg);
//});

//logger.log("Message");




//http module

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write("Hello World");
        res.end();
    }

    if(req.url === '/numbers'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

//server.on('connection', (Socket) =>{
//    console.log("New Connection...");
//});

server.listen(3000);

console.log("Listening on port 3000");

















