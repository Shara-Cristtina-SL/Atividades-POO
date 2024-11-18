var Equipamento = /** @class */ (function () {
    function Equipamento(ligado) {
        if (ligado === void 0) { ligado = false; }
        this.ligado = ligado;
    }
    Equipamento.prototype.Liga = function () {
        if (!this.ligado) {
            this.ligado = true;
        }
    };
    Equipamento.prototype.Desliga = function () {
        if (this.ligado) {
            this.ligado = false;
        }
    };
    Equipamento.prototype.inverte = function () {
        if (this.ligado == true) {
            this.ligado = false;
        }
        else {
            this.ligado = true;
        }
    };
    Equipamento.prototype.esta_ligado = function () {
        return this.ligado;
    };
    return Equipamento;
}());
var E1 = new Equipamento;
console.log(E1.esta_ligado()); //false
E1.Liga();
console.log(E1.esta_ligado()); //true
E1.Desliga();
console.log(E1.esta_ligado()); //false
E1.inverte();
console.log(E1.esta_ligado()); //true
