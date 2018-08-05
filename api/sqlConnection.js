var mysql = require('mysql');

const HOST = 'localhost';
const USER = 'root';
const PASSWORD = ''; //The password of the MySQL server.
const DATABASE = 'iot';

const CONNECTION_LIMIT = 1000;

//SQL queries
const INSERT = 'INSERT INTO ';
const VALUE = ' VALUE ';
const SELECT_ALL = 'SELECT * FROM ';
const SELECT_ID_FROM = "SELECT id FROM User WHERE password=\"";
const SELECT_PW_FROM = "SELECT password FROM User WHERE id=\"";
const SELECT_DEVICE = "SELECT * FROM Device WHERE id=\"";
const UPDATE_DEVICE = "UPDATE Device SET temperature = ";
const WHERE_DEV_NUM_IS = " WHERE deviceNum = ";

//messages
const FAILED = "Connection failed!";
const FAILED_GET_DEVICE_NUM = " failed to get device number!";
const FAILED_GET_DATA = "Failed to get data: ";
const INSERTION_FAILED = 'INSERT INTO query failed!!';
const LOGIN_QUERY_FAILED = 'The login query was failed!!';


//status code
const FAILED_STATUS = 500;


/**
 * This variable creates the db pool to control the db connection objects.
 *
 * @type {Pool} the database pool.
 */
let pool = mysql.createPool({
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
exports.insertCollectedData = function (table, temperature, latitude, longitude, timestamp, humidity) {
        console.log('insertIntoTable: ', timestamp);

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
                        console.log('The number of rows that are affected by insertion: ' + result.affectedRows);
                        insertNewTemperature(deviceNum, temperature);
                    }
                });
            }
        }); //conn.connect function ends.

};


/**
 * This function uses the UPDATE query to update the temperature.
 * @param deviceNum the device number of the target device.
 * @param temp the new temperature
 */
function insertNewTemperature(deviceNum, temp) {
    var queryString = UPDATE_DEVICE + temp;
    queryString += WHERE_DEV_NUM_IS;
    queryString += deviceNum;

    pool.getConnection(function (err, conn) {
        if (err) {
            throw err;
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    console.log('The number of rows that are affected by updating: ' + result.affectedRows);
                }
            });
        }
    });
}


/**
 * This function checks if the given id and password is stored in the MariaDB by comparing the id.
 *
 * @param id the user id.
 * @param pw the user password.
 */
exports.getIdFromDB = function(id, pw) {
    var queryString = SELECT_ID_FROM + pw + "\"";

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(FAILED);

            return -1;
        } else {

            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    console.log(LOGIN_QUERY_FAILED);
                    return -1;
                } else {

                    var value = result[0].id;

                    if (value === id) {
                        return 1;
                    } else {
                        return 0;
                    }

                }
            });
        }
    });
};


/**
 * This function checks if the given password is valid and stored in the MariaDB.
 *
 * @param id the user id.
 * @param pw the user password.
 */
exports.getPasswordFromDB = function (id, pw) {
    var queryString = SELECT_PW_FROM + id + "\"";

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log(FAILED);

            return ERROR_CODE;
        } else {

            conn.query(queryString, function(err, result, fields) {
                if (err) {
                    console.log(FAILED);

                    return ERROR_CODE;
                } else {

                    var value = result[0].password;

                    if (value === pw) {
                        return SUCCESS_CODE;
                    } else {
                        return FAILURE_CODE;
                    }
                }
            });
        }
    });
};


/**
 * This function gets the array of tuples that contain DeviceNum and DeviceName.
 *
 * @param id the id of the user
 * @return the array of tuple (deviceNum, deviceName)
 */
exports.getDeviceNumbers = function (id, res) {
    var queryString = SELECT_DEVICE + id + "\"";

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(FAILED);
            res.status(FAILED_STATUS).send(FAILED);
        } else {

            conn.query(queryString, function(err, result, fields) {
                if (err) {
                    console.log(id + FAILED_GET_DEVICE_NUM);
                    res.status(FAILED_STATUS).send(id + FAILED_GET_DEVICE_NUM);
                } else {
                    res.render('users', { title: 'user', user: id, data: result });
                }
            });

        }
    });
};


/**
 * This function gets the data of the particular device from the database.
 *
 * @param deviceNum the device number of the target device.
 * @param the instance that sends the response to the client.
 */
exports.getData = function (user, deviceNum, res) {
    var queryString = SELECT_ALL + deviceNum;

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(FAILED);
            res.status(FAILED_STATUS).send(FAILED);
        } else {

            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    console.log(FAILED_GET_DATA, deviceNum);
                    res.status(FAILED_STATUS).send(FAILED);
                } else {
                    res.render('data', { title: 'data visualization', user: user, deviceNum: deviceNum, data: result });
                }
            });

        }
    });
};
