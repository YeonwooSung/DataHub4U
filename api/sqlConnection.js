var mysql = require('mysql');

const HOST = 'localhost';
const USER = 'root';
const PASSWORD = ''; //The password of the MySQL server.
const DATABASE = 'iot';

//SQL queries
const INSERT = 'INSERT INTO ';
const VALUE = ' VALUES ';
const SELECT_ALL = 'SELECT * FROM ';
const FIELD = ' ( temperature, latitude, longitude ) ';

//messages
const FAILED = "Connection failed!";
const SUCCESS = 'connection success! connected to: ';
const INSERTION_FAILED = 'INSERT INTO query failed!!';
const SELECT_ALL_FAILED = 'SELECT ALL query failed!!';


/**
 * This variable will be used for the database connection.
 * @type {Connection} DB connection
 */
var conn = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});


/**
 * This instance will be used for connecting the router instance and the MySQL database.
 * @type {Connection} the connection object
 */
exports.connection = mysql.createConnection(conn);


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
                console.log(SUCCESS + HOST + "@" + USER);
            }
        });
    };
};

/**
 * This function helps the server to insert the data to the MySQL DB.
 * @param table the name of the target table.
 * @param values the values that the user wants to store in.
 * @returns {Function} the function that inserts the data into the MySQL DB.
 */
exports.insertIntoTable = function (table, temperature, latitude, longitude) {
    return function() {

        var queryString = INSERT + table;
        queryString += FIELD;
        queryString += VALUE;

        queryString += '(';

        //add the temperature value to the SQL query string.
        queryString += temperature;

        queryString += ', ';

        //add the latitude value to the SQL query string.
        queryString += latitude;

        queryString += ', ';

        //add the longitude value to the SQL query string.
        queryString += longitude;

        queryString += ')';

        conn.connect(function(err) {
            if (err) {
                throw err;
            } else {
                conn.query(queryString, function (err, result) {
                    if (err) {
                        console.log(INSERTION_FAILED);
                        throw err;
                    } else {
                        console.log('The number of rows that are affected: ' + result.affectedRows);
                    }
                });
            }
        }); //conn.connect function ends.

    }; //return statement ends

};


/**
 * This function activates the "SELECT * FROM table" query to get all data in the specific table of the MySQL DB.
 * @param table the target table name
 * @returns {Function} the function that activates the "SELECT * FROM table" query.
 */
exports.selectAllFromTable = function(table) {
    return function() {
        var queryString = SELECT_ALL + table;

        conn.connect(function(err) {
            if (err) {

                console.log(FAILED);
                throw err;

            } else {
                conn.query(queryString, function(err, result, fields) {
                    if (err) {
                        console.log(SELECT_ALL_FAILED);
                        throw err;
                    } else {
                        console.log(result);
                    }
                });
            }

        }); //conn.connect function ends

    }; //return statement ends
};
