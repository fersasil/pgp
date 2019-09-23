exports.verifyInputs = params => {

    Object.keys(params).forEach(function (key) {
        if (params.key < 5) {
            return false;
        }

        if (key === 'email') {
            const verificador = params.key.indexOf('@');
            if (verificador === -1) {
                return false;
            } else {
                continue;
            }
        }
    });

    return true;

}



exports.formatDate = date => {
    //Transforma do formato pt-br para o formato ingles
    // date = DD/MM/YY
    // Formato desejado YYYY-MM-DD
    const fields = date.split('/');
    return `${fields[2]}-${fields[1]}-${fields[0]}`;
}