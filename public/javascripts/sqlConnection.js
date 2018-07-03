var mysql = require('mysql');

const HOST = '';
const USER = '';
const PASSWORD = '';

var conn = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD
});

/**
 * This function helps the server to make a connection with MySQL DB.
 * @returns {Function} that connects with the MySQL DataBase
 */
exports.connectMySQL = function() {
    return function () {
        conn.connect(function(err) {
            if(err) {
                throw err;
            } else {
                console.log('connection success! connected to: ' + HOST + "@" + USER);
            }
        });
    };
};
