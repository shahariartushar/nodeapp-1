var url = "http::/mylogger.io/log";

function log(message){
    //send request
    console.log(message);
}

module.exports.log = log;