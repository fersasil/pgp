const qrCode = require('qrcode');
const crypto = require('crypto');
const reverseMd5 = require('reverse-md5');
const path = require("path");
const { baseDir } = require("./rootPath");
var CryptoJS = require("crypto-js");


const md5Reverse = reverseMd5({
    lettersUpper: false,
    lettersLower: false,
    numbers: true,
    special: false,
    whitespace: false,
    maxLen: 30
})

// To QRCode image base is 5
// To name of image base is 7

// ------------- Function: toStringInBase ------------- //
// Receive: number as a integer value, base as a integer value
// Returns: Returns the received number in the base as String
// Description: This function return a value encrypted
// Obs: parseInt(string, 10) => 10 is the base, makes the opposite of this function
const toStringInBase = (number, base) => {
    return number.toString(base);
}

// ------------- Function: encrypt ------------- //
// Receive: value as string
// Returns: Hashed string of the original value
// Description: This function return a value encrypted
const encrypt = value => {
    const hash = crypto.createHash('md5').update(value).digest("hex");
    return hash;
};

// ------------- Function: decrypt ------------- //
// Receive: A string of an encrypted value
// Returns: A string decrypted
// Description: This function return a value encrypted
const decrypt = value => {
    const unHash = md5Reverse(value); // unHash receive in 'str' the value decrypted and 'elapsed' as elapsed time to decrypt
    return unHash.str; // unHash now is only the 'str' decrypted
};

// ------------- Function: createImage ----------- //
// Receive: A string of an encrypted value
// Returns: A string decrypted
// Description: This function return a value encrypted
const createImage = idUser => {
	console.log(idUser);
	idUser = idUser + ".png";

	const savePath = path.join(baseDir, "/public/usersQrCode/", idUser); // Image name is idUser in base 7 encrypted in MD5;

	const hashedContent = encrypt(toStringInBase(idUser, 5));
	
	qrCode.toFile(savePath, hashedContent, {
			color: {
			light: '#0000',
			scale: 100
		}
	}, function (err) {
		if(err) throw err;
	});


};

// Improvements

// ------------- Function: getImageNameHash ------------ //
// Receive: idUser //
// Returns: idUser hashed and concatenated with ".png"
// Description: //
const getImageNameHash = idUser => {
	const imageName = encrypt(toStringInBase(idUser, 7)) + ".png";
	return imageName;
}

module.exports = {getImageNameHash, createImage, decrypt, encrypt, toStringInBase, md5Reverse};