function tratamento(nome, pronome) {
    if (pronome === void 0) { pronome = "Sr"; }
    console.log("".concat(pronome, ".").concat(nome));
}
function main_q2() {
    var nome = "Ely";
    var nome2 = "Ana";
    var pronome = "Sra";
    tratamento(nome);
    tratamento(nome2, pronome);
}
main_q2();
