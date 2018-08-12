const scrypt = require('scrypt');

exports.encodePassword = function (pw) {
    let parameters = scrypt.params(0.2); //the maximum time of encryption = 0.1

    let key = new Buffer(pw); //key defaults to buffer in config, so input must be a buffer

    try {
        return scrypt.kdfSync(key, parameters).toString("base64");
    } catch(err) {
        return undefined;
    }
};
