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

// ---------------- Function: validCPF ---------------- //
// Receive: cpf
// Returns: False if cpf is invalid, or False if is válid.
// Description:
exports.validCPF = cpf => {
    var Soma;
    var Resto;
    Soma = 0;

    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;

    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;

    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;

    return true;
}

// ---------------- Function: verifyNickname ---------------- //
// Receive: nickname
// Returns:
// Description:
exports.verifyNickname = nickname => {

}

exports.formatDateToPT = date => {
    //Transforma do formato pt-br para o formato ingles
    // date = DD/MM/YY
    // Formato desejado YYYY-MM-DD
    const fields = date.split('/');
    return `${fields[2]}/${fields[1]}/${fields[0]}`;
}

exports.formatDateToEn = date => {
    //Transforma do formato pt-br para o formato ingles
    // date = DD/MM/YY
    // Formato desejado YYYY-MM-DD
    const fields = date.split('/');
    return `${fields[2]}-${fields[1]}-${fields[0]}`;
}