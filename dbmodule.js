var databaseUrl = "localhost/mydb1";
var mongojs = require("./node_modules/mongojs");
var db = mongojs(databaseUrl);
db.collection("student");
console.log("Connected");

exports.authenticateUser = function(username, email,number,city,worklocation, response) {
console.log(username);
console.log(email);
console.log(number);
console.log(city);
console.log(worklocation);
db.student.find({ "username": username, "email": email, "phoneno":number, "city":city, "worklocation":worklocation },
function(err, users) {
            //console.log(users);
            //console.log(err);
if (err || !users) {
response.write("..Not authorized user" || err);
response.end();
            } else if (users.length == 0) {
response.write("Not authorized user");
response.end();
            } else {
response.write("Authorized user")
response.end();
            }

        });
}

exports.saveUser = function(username, email,number,city,worklocation, response) {
console.log('Saving user to mongo');
db.student.insert({ "username": username, "email": email, "phoneno":number, "city":city,"worklocation":worklocation },

function(err, saved) {
if (err || !saved)
console.log(err);
else
console.log("User saved");
            //dbo.close;
        });
}
exports.update = function(username, email, phoneno,city,worklocation, response) {
    console.log('Update');
    console.log('username');
    console.log('email');
    console.log('phoneno');
    console.log('city');
    console.log('worklocaton');
    db.student.updateOne({ "username": username, $set:{"email": email } ,"phoneno": phoneno,"city": city,"worklocation":worklocation},{upsert: true},
    function(err, users) {
                //console.log(users);
    if (err || !users) {
    response.write("..Not updated user" || err);
    response.end();
                } else if (users.length == 0) {
    response.write("Not updated user");
    response.end();
                } else {
    response.write(username + " record is updated");
    response.end();   
                }
    });
}
exports.del = function(username, response) 
{
    console.log('delete');
    console.log(username);
    //console.log(roll);
    //console.log(avg);
    db.student.remove( { "username": username },
    function(err, users) {
             //console.log(users);
    if (err || !users)
    {
      response.write("..Not deleted user" || err);
      response.end();
    }
    else if (users.length == 0)
    {
        response.write("Not deleted user");
        response.end();
    }
        });
}