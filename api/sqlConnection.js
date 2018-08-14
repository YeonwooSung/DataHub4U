const mysql = require('mysql');

//messages
const FAILED = "Connection failed!";
const FAILED_GET_DEVICE_NUM = " failed to get device number!";
const FAILED_GET_DATA = "Failed to get data: ";
const INSERTION_FAILED = 'INSERT INTO query failed!!';


/**
 * This variable creates the db pool to control the db connection objects.
 *
 * @type {Pool} the database pool.
 */
let pool = mysql.createPool({
    connectionLimit : 1000, // default = 10
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'iot'
});


/**
 * This function helps the server to insert the data to the MySQL DB.
 * @param deviceNum the device number of the device that sent data.
 * @param temperature the temperature value that is collected.
 * @param latitude the location information
 * @param longitude the location information
 * @param timestamp the time that the data is collected
 * @param humidity the percentage of the humidity
 * @returns {Function} the function that inserts the data into the MySQL DB.
 */
exports.insertCollectedData = function (deviceNum, temperature, latitude, longitude, timestamp, humidity) {
    console.log('connections: ', pool._allConnections.length);

    let queryString = `INSERT INTO ${deviceNum} VALUE (${temperature}, "${latitude}", "${longitude}", "${timestamp}", ${humidity})`;

    pool.getConnection(function (err, conn) {
        if (err) {
            throw err;
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    console.log(INSERTION_FAILED);
                    throw err;
                } else {
                    console.log(`The number of rows that are affected by insertion: ${result.affectedRows}`);
                    insertNewTemperature(deviceNum, temperature);
                }
            });

            conn.release();
        }
    }); //conn.connect function ends.

};

/**
 * This function supports the user to change the device name.
 *
 * @param deviceName new device name
 * @param deviceNum target device's device number
 * @param currentName current name of the device.
 * @param res response to the client.
 */
exports.updateDeviceName = function(deviceName, deviceNum, currentName, res) {
    let queryString = `UPDATE Device SET deviceName="${deviceName}" WHERE deviceNum="${deviceNum}" AND deviceName="${currentName}"`;

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(FAILED);
            res.status(500).send(FAILED);
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    let str = `Failed to update the device name of device ${deviceNum}!!\n`;
                    console.log(str);
                    res.status(500).send(str);
                } else {
                    console.log(`updateDeviceNum: the number of affected rows = ${result.affectedRows}`);
                    console.log(`Update the deviceName to ${deviceName} successfully!\n`);
                    res.status(200).send('ok');
                }
            });

            conn.release();
        }
    });
};

/**
 * This function uses the UPDATE query to update the temperature.
 * @param deviceNum the device number of the target device.
 * @param temp the new temperature
 */
function insertNewTemperature(deviceNum, temp) {
    console.log(`update the device ${deviceNum}'s most recent temperature value: ${temp}`);
    let queryString = `UPDATE Device SET temperature=${temp} WHERE deviceNum="${deviceNum}"`;

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

            conn.release();
        }
    });
}


/**
 * Insert the user information to the database to register new user.
 *
 * @param userName the user name
 * @param id the user's id
 * @param password the user's password
 * @param res the response object that sends the response to the client
 */
function registerNewUser(userName, id, password, res) {
    let queryString = `INSERT INTO User VALUE ("${id}", "${password}", "${userName}")`;

    pool.getConnection(function (err, conn) {
        if (err) {
            sendErrorMessage(res, err);
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    sendErrorMessage(res, err);
                } else {
                    console.log('The number of affected rows: ' + result.affectedRows);
                    res.render('login', { title: 'Log In' });
                }
            });
            conn.release();
        }
    });
}

/**
 * Check if the given id is already in use.
 * @param userName the user's name
 * @param id the id of the user
 * @param password the user's password
 * @param res the response object that sends the response to the client
 */
exports.checkIfRegisteredAlready = (userName, id, password, res) => {
    let queryString = `SELECT * from User where id="${id}"`;

    pool.getConnection(function (err, conn) {
        if (err) {
            sendErrorMessage(res, err);
        } else {
            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    sendErrorMessage(res, err);
                } else {
                    if (result) {
                        const alertID = { id: id };
                        res.render('register', {title: 'Register', alert: alertID});
                    } else {
                        registerNewUser(userName, id, password, res);
                    }
                }
            });
            conn.release();
        }
    });
};

/**
 * This function sends the error message to the client.
 * @param res the response object that sends the error message to the client
 * @param err the error that is occurred
 */
function sendErrorMessage(res, err) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    err.status = 500;
    res.status(err.status);
    res.render('error');
}


/**
 * This function checks if the given password is valid and stored in the MariaDB.
 *
 * @param id the user id.
 * @param pw the user password.
 * @param res the response object that sends the response to the client
 */
exports.doTheLogInProcess = function (id, pw, res) {
    let queryString = `SELECT password FROM User WHERE id="${id}"`;

    pool.getConnection(function(err, conn) {
        if (err) {
            console.log('server error!');
            let val = { message: 'server error!' };
            res.render('login', { title: 'Log In', val: val });
        } else {
            conn.query(queryString, function(err, result, fields) {
                if (err) {
                    console.log('server error!');
                    let val = { message: 'server error!' };
                    res.render('login', { title: 'Log In', val: val });
                } else {
                    if (result[0]) {
                        if (result[0].password === pw) {
                            res.render('index', { title: 'Data Thing' });
                        } else {
                            console.log('wrong password!');
                            let val = { message: 'wrong password!' };
                            res.render('login', { title: 'Log In', val: val });
                        }
                    } else {
                        console.log('wrong id!');
                        let val = { message: 'wrong id!' };
                        res.render('login', { title: 'Log In', val: val });
                    }
                }
            });
            conn.release();
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
    let queryString = `SELECT * FROM Device WHERE id="${id}"`;

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(FAILED);
            sendErrorMessage(res, err);
        } else {

            conn.query(queryString, function(err, result, fields) {
                if (err) {
                    console.log(id + FAILED_GET_DEVICE_NUM);
                    sendErrorMessage(res, err);
                } else {
                    res.render('users', { title: 'user', user: id, data: result });
                }
            });

            conn.release();
        }
    });
};


/**
 * This function gets the data of the particular device from the database.
 *
 * @param user the user name
 * @param deviceNum the device number of the target device.
 * @param res the instance that sends the response to the client.
 */
exports.getData = function (user, deviceNum, res) {
    let queryString = `SELECT * FROM ${deviceNum} order by timestamp desc limit 288`;

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(FAILED);
            sendErrorMessage(res, err);
        } else {

            conn.query(queryString, function (err, result, fields) {
                if (err) {
                    console.log(FAILED_GET_DATA, deviceNum);
                    sendErrorMessage(res, err);
                } else {
                    res.render('data', { title: 'data visualization', user: user, deviceNum: deviceNum, data: result });
                }
            });

            conn.release();
        }
    });
};
