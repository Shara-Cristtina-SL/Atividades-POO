var Hora = /** @class */ (function () {
    function Hora() {
    }
    /*constructor(horas:string, minutos: string, sengundos: string){
        this._horas = horas;
        this._minutos = minutos;
        this._segundos = sengundos;
    }*/
    Hora.prototype.ler_horas = function (hora) {
        this._horas = hora;
    };
    Hora.prototype.let_minutos = function (minuto) {
        this._minutos = minuto;
    };
    Hora.prototype.ler_segundos = function (segundo) {
        this._segundos = segundo;
    };
    Object.defineProperty(Hora.prototype, "hora_completa", {
        get: function () {
            var hora = "".concat(this._horas, ": ").concat(this._minutos, ": ").concat(this._segundos);
            return hora;
        },
        enumerable: false,
        configurable: true
    });
    return Hora;
}());
var H1 = new Hora();
H1.ler_horas("15");
H1.let_minutos("03");
H1.ler_segundos("19");
console.log(H1.hora_completa);
