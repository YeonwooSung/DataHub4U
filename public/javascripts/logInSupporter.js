const ZERO = 0;
const HEX = 16;
const HEX_OFFSET = "0X";
const ADDITIONAL_ZERO = "0";

/**
 * The aim of this function is to encrypt the user password by using the XOR operation.
 *
 * @returns {string} the hex string of the XOR encryption password.
 */
function xorEncryption() {

    var id = "12345"; //TODO use the jQuery to get the id value.
    var pw = "adsfqwer123"; //TODO use the jQuery to get the pw value.

    var key = "";

    while (key.length < pw.length) {
        key += id;
    }

    var i;
    var value1;
    var value2;
    var xorVal;

    var xorHexString;

    var result = '';

    //use the for loop to encrypt password
    for (i = ZERO; i < pw.length; i++) {
        value1 = pw[i].charCodeAt(ZERO);
        value2 = key[i].charCodeAt(ZERO);

        xorVal = value1 ^ value2; //use the xor operation for the encryption.
        xorHexString = xorVal.toString(HEX);

        if (xorHexString.length < 2) {
            xorHexString += ADDITIONAL_ZERO + xorHexString;
        }

        result += HEX_OFFSET;
        result += xorHexString;
    }

    return result;
}