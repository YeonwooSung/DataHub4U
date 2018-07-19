const SUBSTRING_LENGTH = 4;

/**
 * The aim of this function is to decrypt the sent encrypted password.
 *
 * @param id the user id
 * @param pw the user password
 */
exports.xorDecryption =  function (id, pw) {
    var key = '';

    while (key.length < pw.length) {
        key += id;
    }

    var start = 0;
    var end = 3;

    var str;
    var limit = pw.length;

    var value1;
    var value2;
    var index = 0;
    var result = '';

    while (end < limit) {
        str = pw.substring(start, end);
        value1 = parseInt(str);

        value2 = key[index].charCodeAt(0);

        var temp = value1 ^ value2;
        result += String.fromCharCode(temp);

        start += SUBSTRING_LENGTH;
        end += SUBSTRING_LENGTH;
    }

    return result;
};
