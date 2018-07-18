var mysql = require('mysql');

const HOST = 'localhost';
const USER = 'root';
const PASSWORD = ''; //The password of the MySQL server.
const DATABASE = 'iot';

const CONNECTION_LIMIT = 100;

//SQL queries
const INSERT = 'INSERT INTO ';
const VALUE = ' VALUE ';
const SELECT_ALL = 'SELECT * FROM ';
const WHERE_ID_IS = " WHERE 'id' = ?";

//messages
const FAILED = "Connection failed!";
const SUCCESS = 'connection success! connected to: ';
const INSERTION_FAILED = 'INSERT INTO query failed!!';
const SELECT_ALL_FAILED = 'SELECT ALL query failed!!';
const LOGIN_QUERY_FAILED = 'The login query was failed!!';


const SUCCESS_CODE = 1;

/**
 * This variable creates the db pool to control the db connection objects.
 *
 * @type {Pool} the database pool.
 */
var pool = mysql.createPool({
    connectionLimit : CONNECTION_LIMIT, // default = 10
    host            : HOST,
    user            : USER,
    password        : PASSWORD,
    database        : DATABASE
});



/**
 * This function helps the server to insert the data to the MySQL DB.
 * @param table the name of the target table.
 * @param temperature the temperature value that is collected.
 * @param latitude the location information
 * @param longitude the location information
 * @param timestamp the time that the data is collected
 * @param humidity the percentage of the humidity
 * @returns {Function} the function that inserts the data into the MySQL DB.
 */
exports.insertIntoTable = function (table, temperature, latitude, longitude, timestamp, humidity) {

        var queryString = INSERT + table;
        queryString += VALUE;

        queryString += '(';

        //add the temperature value to the SQL query string.
        queryString += temperature;

        queryString += ', \"';

        //add the latitude value to the SQL query string.
        queryString += latitude;

        queryString += '\", \"';

        //add the longitude value to the SQL query string.
        queryString += longitude;

        queryString += "\", \"";

        //add the timestamp value to the SQL query string.
        queryString += timestamp;

        queryString += "\", ";

        queryString += humidity;

        queryString += ')';

        pool.getConnection(function (err, conn) {
            if (err) {
                throw err;
            } else {
                conn.query(queryString, function (err, result, fields) {
                    if (err) {
                        console.log(INSERTION_FAILED);
                        throw err;
                    } else {
                        console.log('The number of rows that are affected: ' + result.affectedRows);
                        return SUCCESS_CODE;
                    }
                });
            }
        }); //conn.connect function ends.


};


/**
 * This function activates the "SELECT * FROM table" query to get all data in the specific table of the MySQL DB.
 * @param table the target table name
 * @returns {Function} the function that activates the "SELECT * FROM table" query.
 */
exports.selectAllFromTable = function(table) {
    return function() {
        var queryString = SELECT_ALL + table;

        pool.getConnection(function (err, conn) {
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


/**
 * The aim of this function is to execute the sql select query to check if the user is registered.
 * @param id the id of the user
 * @param pw the password of the user
 * @returns {Function} the function that executes the SQL query to get the data from DB to support the log in process.
 */
exports.selectAllForLogIn = function(id, pw) {
    return function() {
        var queryString = SELECT_ALL + 'user_table'; //TODO user_table name!!
        queryString += WHERE_ID_IS;

        pool.getConnection(function (err, conn) {

            if (err) {
                console.log(LOGIN_QUERY_FAILED);
                throw err;
            } else {
                conn.query(queryString, id, function (err, result, fields) {
                    if (err) {
                        console.log(LOGIN_QUERY_FAILED);
                        throw err;
                    } else {
                        console('log in process: ', id);

                        //TODO should check whether the id and pw of the user is valid or not.

                        return SUCCESS_CODE;
                    }
                });
            }

        });
    }
};
