const encryption = require('crypto');

exports.encodePassword = function (pw) {
    return encryption.createHash('sha512').update(pw).digest('base64');
};
