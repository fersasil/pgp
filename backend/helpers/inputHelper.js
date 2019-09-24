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