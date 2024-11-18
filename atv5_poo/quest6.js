var Saudacao = /** @class */ (function () {
    function Saudacao(texto, destinatario) {
        this.texto = texto;
        this.destinatario = destinatario;
    }
    Saudacao.prototype.obterSaudacao = function () {
        return this.texto + this.destinatario;
    };
    return Saudacao;
}());
var S1 = new Saudacao("Olá,", " Ana!");
var S2 = new Saudacao("Oi,", " professor!");
console.log(S1.obterSaudacao());
console.log(S2.obterSaudacao());
