"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberInRange = getNumberInRange;
function getNumberInRange(numero, min, max) {
    var num = numero;
    if (num < min || num > max) {
        console.log("Opçâo inválida!");
        getNumberInRange(numero, min, max);
    }
    else {
        return num;
    }
}
