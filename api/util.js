//for the basic authentication
var basicAuth = require('basic-auth');

//use the sql queries to check if the user is registered.
var sqlConnection = require('./sqlConnection'); //TODO to check if the id and password are in the user table

/**
 * This function creates the log in session.
 * @param userName the name of the user
 * @param authLevel the authentication level
 */
function LogIn(userName, authLevel) {
    this.userName = userName;
    this.authLever = authLevel;
}

/**
 * The function for the log in session.
 * @returns {LogIn}
 */
exports.getLogIn = function(id, pw) {
    var logInResult = sqlConnection.selectAllForLogIn(id, pw);

    var authLevel;

    if (logInResult === 1) {
        authLevel = 1;
        return new LogIn(user.userName, authLevel);
    }

    return null;
};

/**
 * Removes the sensitive and important data to user.
 * @param user the user information
 */
exports.getUserJson = function (user) {
    return JSON.stringify(user, function(key, value) {

        //check if the key is the sensitive and important thing to the user.
        if (key === 'userid' || key === 'password') {
            return undefined;
        }
        return value;
    });

};


/**
 * This function returns the function that does the basic authentication.
 * @returns {Function} the function that does the basic authentication.
 */
exports.basicAuth = function() {

    //returns the function
    return function (req, res, next) {
        var user = basicAuth(req);

        //check if the user passes the basic authentication.
        if (!user) {
            //process the invalid request.
            invalidEntry(res);

        } else {
            //TODO finish the authentication step.
        }

        //after finishing the authentication, continue the next step.
        next();
    };


    /**
     * This function processes the invalid entry.
     * @param res the http response
     * @returns {*} send the http response with the status code 401.
     */
    function invalidEntry(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }
};
