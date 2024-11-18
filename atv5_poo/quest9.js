var Conta = /** @class */ (function () {
    function Conta(numero, saldoInicial) {
        this.numero = numero;
        this.saldo = saldoInicial;
    }
    Conta.prototype.sacar = function (valor) {
        if (this.saldo > valor) {
            this.saldo = this.saldo - valor;
            return true;
        }
        return false;
    };
    Conta.prototype.depositar = function (valor) {
        this.saldo = this.saldo + valor;
    };
    Conta.prototype.consultarSaldo = function () {
        return this.saldo;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    };
    return Conta;
}());
var c1 = new Conta("1", 100);
var c2 = new Conta("2", 100);
var c3;
console.log(c1.sacar(20));
console.log(c1.consultarSaldo());
console.log(c1.sacar(100));
console.log(c1.consultarSaldo());
console.log(c1.transferir(c2, 20));
console.log(c1.consultarSaldo());
console.log(c2.transferir(c1, 150));
console.log(c2.consultarSaldo());
