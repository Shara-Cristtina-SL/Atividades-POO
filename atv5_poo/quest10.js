var Jogador = /** @class */ (function () {
    function Jogador(forca, nivel, pontos_atuais) {
        this.forca = forca;
        this.nivel = nivel;
        this.pontos_atuais = pontos_atuais;
    }
    Jogador.prototype.calcular_ataque = function () {
        return this.forca * this.nivel;
    };
    Jogador.prototype.esta_vivo = function () {
        if (this.pontos_atuais > 0) {
            return true;
        }
        return false;
    };
    Jogador.prototype.atacar = function (atacado) {
        if (!atacado.esta_vivo()) {
            return; // Jogador já está morto
        }
        var dano = this.calcular_ataque();
        atacado.pontos_atuais -= dano;
        if (atacado.pontos_atuais <= 0) {
            // Jogador morreu
            console.log("Jogador foi morto.");
        }
    };
    Jogador.prototype.toString = function () {
        return "Força: " + this.forca + ", nível: " + this.nivel + ", pontos: " + this.pontos_atuais;
    };
    return Jogador;
}());
var J1 = new Jogador(100, 3, 550);
var J2 = new Jogador(80, 2, 400);
console.log(J1.toString());
console.log(J2.toString());
console.log(J1.calcular_ataque());
console.log(J2.calcular_ataque());
J1.atacar(J2);
console.log(J2.pontos_atuais);
console.log(J2.esta_vivo());
J1.atacar(J2);
console.log(J2.esta_vivo());
console.log(J2.toString());
J1.atacar(J2);
console.log(J2.toString()); /* Mostra o mesmo que na chamada anterior, pois não é possível
 efetuar o ataque com o jogador atacado já morto.*/
