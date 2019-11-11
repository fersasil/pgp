const pool = require('../helpers/dbConnect');
const dbHelper = require('../helpers/dbHelperAuxUsers');
const dbFunc = new dbHelper('User');

// ------------ Function: verifyInputs ----------------- //
exports.verifyInputs = params => {
    const keys = Object.keys(params);
    for (let i in keys) {
        const key = keys[i];

        if (params[key] < 5) {
            return false;
        }

        if (key === 'email') {
            const verificador = params[key].indexOf('@');
            if (verificador === -1) {
                return false;
            }
        }
    };

    return true;
}

// ---------------- Function: validEmail ---------------- //
// Receive: email (string)
// Returns: False if email is invalid, or True if is válid.
// Description:
exports.validEmail = email => {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email)
        return false;

    if (!email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;
    return true;
}

// ---------------- Function: validPassword ---------------- //
// Receive: password (string).
// Returns: False if password is invalid, or True if is válid.
// Description: Verify if password has least as 5 characters.
exports.validPassword = password => {
    if (password.length < 5)
        return false;
    return true;
}

//// ==================== MAYBE LATER ====================== //
// ---------------- Function: passwordForce ---------------- //
// Receive: password (string).
// Returns: The force of password as integer
// Description: 

// ---------------- Function: verifyCpf ---------------- //
// Receive: cpf (string)
// Returns: True if can be created, false if have some problem
// Description: Calls validCPF to verify if cpf is valid
exports.verifyCpf = cpf =>{
    // Verify if cpf is valid
    if (!this.validCpf(cpf))
        return false;
    // Verify if have this cpf in database
    if (dbFunc.findUserByCpf(cpf))
        return false;
    return true;
}

// ---------------- Function: validCpf ---------------- //
// Receive: cpf (string)
// Returns: False if cpf is invalid, or True if is válid.
// Description:
exports.validCpf = cpf => {
    var Sum;
    var Rest;
    Sum = 0;

    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++)
        Sum = Sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);

    Rest = (Sum * 10) % 11;

    if ((Rest == 10) || (Rest == 11))  Rest = 0;

    if (Rest != parseInt(strCPF.substring(9, 10)) ) return false;

    Sum = 0;
    for (i = 1; i <= 10; i++)
        Sum = Sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);

    Rest = (Sum * 10) % 11;

    if ((Rest == 10) || (Rest == 11))  Rest = 0;

    if (Rest != parseInt(strCPF.substring(10, 11) ) ) return false;

    return true;
}

// ---------------- Function: verifyNickname ---------------- //
// Receive: nickname
// Returns: True if nickname is valid and isn't in use, otherwise False.
// Description:
exports.verifyNickname = nickname => {
    // Verify if nickname is in use
    if(dbFunc.findUserByNickname(nickname))
        return false;
    // Verify if nickname contain only Latin Alphabetical Letters without accentuation
    if(/[^a-zA-Z]/.test(word))
        return false;
    return true;
}

// ---------------- Function: formatDateToPT ---------------- //
// Receive: date(string)
// Returns: date(string)
// Description: Makes "conversion" of the date format YYYY/MM/DD to DD/MM/YYYY
exports.formatDateToPT = date => {
    const fields = date.split('/');
    return `${fields[2]}/${fields[1]}/${fields[0]}`;
}

// ---------------- Function: formatDateToEN ---------------- //
// Receive: date(string)
// Returns: date(string)
// Description: Makes "conversion" of the date format DD/MM/YYYY to YYYY/MM/DD
exports.formatDateToEn = date => {
    const fields = date.split('/');
    return `${fields[2]}-${fields[1]}-${fields[0]}`;
}