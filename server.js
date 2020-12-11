var module = require('./dbmodule');
var url = require('url');
var querystring1 = require('querystring');
var http = require('http');


http.createServer(function(request, response) {
var data1 = '';
if (request.url === '/favicon.ico') {
response.writeHead(200, { 'Content-Type': 'image/x-icon' });
response.end();
} 
else
 {
request.on('data', function(chunk) {
            data1 += chunk;
        });

request.on('end', function() {
var name = querystring1.parse(data1)["username"];
console.log(name);
var email = querystring1.parse(data1)["email"];
console.log(email);
var number = querystring1.parse(data1)["phoneno"];
console.log(number);
var city = querystring1.parse(data1)["city"];
console.log(city);
var worklocation = querystring1.parse(data1)["worklocation"];
console.log(city);
if (request.url === '/login') {
module.authenticateUser(name, email,number,city,worklocation, response);
            } else if (request.url === '/save') {
module.saveUser(name, email,number,city,worklocation, response);
            } else if (request.url === '/update'){
                module.update(name, email,number,city,worklocation, response);}
             else if (request.url === '/del')
            {
                module.del(name, response);
            }
            
            else {
console.log("invalid url");
            }
            //console.log(name+" "+email+" "+number+" "+city+" "+worklocation);
            //module.authenticateUser(name,email,number,city,worklocation,response); 
            //module.saveUser(name,email,number,city,worklocation);
            //module.update(name,email,number,city,worklocation);
        });
    }
}).listen(3000);
console.log("Server started");
