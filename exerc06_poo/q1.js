var Calculadora = /** @class */ (function () {
    function Calculadora(operando1, operando2, resultado) {
        this._operando1 = operando1;
        this._operando2 = operando2;
        //this._resultado = resultado;
    }
    Calculadora.prototype.somar = function (valor1, valor2) {
        this._operando1 = valor1;
        this._operando2 = valor2;
        this._resultado = this._operando1 + this._operando2;
    };
    Calculadora.prototype.subtrair = function (valor1, valor2) {
        this._operando1 = valor1;
        this._operando2 = valor2;
        this._resultado = this._operando1 - this._operando2;
    };
    Object.defineProperty(Calculadora.prototype, "resultado", {
        get: function () {
            return this._resultado;
        },
        enumerable: false,
        configurable: true
    });
    return Calculadora;
}());
var C = new Calculadora(0, 0, 0);
C.somar(1, 3);
console.log(C.resultado);
C.subtrair(100, 50);
console.log(C.resultado);
