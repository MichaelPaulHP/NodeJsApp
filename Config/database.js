const USER="MichaelHP";
const PASS="michael123"
//mongodb://username:password@ds151461.mlab.com:51461/node-login
//mongodb://<dbuser>:<dbpassword>@ds129776.mlab.com:29776/home
//mongodb://localhost/home
var url="mongodb://"+USER+":"+PASS+"@ds129776.mlab.com:29776/home"
module.exports = {
    'user':USER,
    'pass':PASS,
    'url' : url 

};