// Importing dependencies
const	qrCode = require('qrcode');
const	crypto = require('crypto');
const   reverseMd5 = require('reverse-md5');

var md5Reverse = reverseMd5({
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
	let hash = crypto.createHash('md5').update(value).digest("hex");
	return hash;
};

// ------------- Function: decrypt ------------- //
// Receive: A string of an encrypted value
// Returns: A string decrypted
// Description: This function return a value encrypted
const decrypt = value => {
	let unHash = md5Reverse(value); 	// unHash receive in 'str' the value decrypted and 'elapsed' as elapsed time to decrypt
	unHash = unHash.str; 			// unHash now is only the 'str' decrypted
	return unHash;
};

// ------------- Function: createImage ----------- //
// Receive: A string of an encrypted value
// Returns: A string decrypted
// Description: This function return a value encrypted
const createImage = idUser => {
	imageName = "../public/usersQrCode/" + encrypt(toStringInBase(idUser, 7))+".png"; // Image name is idUser in base 7 encrypted in MD5;
	hash = encrypt(toStringInBase(idUser, 5));
	qrCode.toFile(imageName, hash, {
		color: {
		//dark: '#00F',  // Blue dots
		light: '#0000', // Transparent background
		scale: 100
		}
	}, function (err) {
		if (err) throw err
//		console.log('done')
	})
};

// Improvements

// ------------- Function: getImageNameHash ------------ //
// Receive: idUser //
// Returns: idUser hashed and concatenated with ".png"
// Description: //
const getImageNameHash = idUser => {
	imageName = encrypt(toStringInBase(idUser, 7)) + ".png";
	return imageName;
}

//idUser = 100
//console.log(idUser, toStringInBase(idUser, 5), encrypt(toStringInBase(idUser, 5)), decrypt(encrypt(toStringInBase(idUser, 5))), parseInt(decrypt(encrypt(toStringInBase(idUser, 5))),5))
//createImage(idUser);