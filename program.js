//require all the necessary modules
var express = require('express');
var app = express();
var ip = require('ip');
var accepts = require('accepts');
var os = require('os');
//When there is a get request, this function will run
app.get('/', function(req, res) {
  //run the accepts function for the request and assign it to the variable accept so that we can use that later to find out the language of the client's browser
  var accept = accepts(req);
  //declare the variable name
  var name;
  //assign name depending on what the OS type of the request is
  if (os.type(req) === 'Darwin') {
    name = 'Macintosh';
  } else if (os.type(req) === 'Windows_NT') {
    name = 'Windows NT';
  } else {
    name = os.type(req);
  }
  //create the object that will be sent as JSON
  var obj = {
    //use the ip module to get the ip address
    ipaddress: ip.address(),
    //get the first language in the array returned by the languages method
    language: accept.languages()[0],
    //concatenate name with the version of the OS and its architecture
    software: name + ' ' + os.release(req) + '; ' + os.arch()
  }
  //send obj as the response
  res.send(obj)
})
//create the server on port 3000 with a callback function so we know when the server is running
app.listen(process.env.PORT || 3000, function() {
  console.log('Congregation is running');
});
