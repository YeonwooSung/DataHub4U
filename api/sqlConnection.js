var mysql = require('mysql');

const HOST = '';
const USER = '';
const PASSWORD = '';

//SQL queries
const INSERT = 'INSERT INTO ';
const VALUE = ' VALUES ';

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
    return function() {
        conn.connect(function(err) {
            if(err) {
                throw err;
            } else {
                console.log('connection success! connected to: ' + HOST + "@" + USER);
            }
        });
    };
};

exports.insertIntoTable = function (table, values) {
    return function() {
        //TODO query string should be something like this: "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"
        queryString = INSERT + table;
    };
};
