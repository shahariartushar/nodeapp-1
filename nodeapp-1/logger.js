const EventEmitter = require('events');

//console.log(__filename);
//console.log(__dirname);

var url = "http::/mylogger.io/log";
class Logger extends EventEmitter{
    log(message){
        //send request
        console.log(message);
        //raise an event
        this.emit("Login", {id: 123, url: 'http::/'})
    }
}


module.exports = Logger;