const USER="MichaelHP";
const PASS="michael123"

//mongodb://localhost/home
var url="mongodb://"+USER+":"+PASS+"@ds129776.mlab.com:29776/home"
module.exports = {
    'user':USER,
    'pass':PASS,
    'url' : url 

};