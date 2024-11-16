function eh_par(numero) {
    if (numero % 2 == 0) {
        return true;
    }
    else {
        return false;
    }
}
function main_q1() {
    var numero = 4556;
    if (eh_par(numero)) {
        console.log("O n\u00FAmero ".concat(numero, " \u00E9 par."));
    }
    else {
        console.log("O n\u00FAmero ".concat(numero, " \u00E9 \u00EDmpar."));
    }
}
main_q1();
