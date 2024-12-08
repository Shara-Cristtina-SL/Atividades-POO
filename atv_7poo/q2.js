var Postagem = /** @class */ (function () {
    function Postagem(id, texto, quantidadeCurtidas) {
        this.id = id;
        this.texto = texto;
        this.quantidadeCurtidas = quantidadeCurtidas;
    }
    Postagem.prototype.curtir = function () {
        this.quantidadeCurtidas++;
    };
    Postagem.prototype.toString = function () {
        return "\n        Postagem ".concat(this.id, ": ").concat(this.texto, "\n        ").concat(this.quantidadeCurtidas, " curtidas");
    };
    return Postagem;
}());
var Microblog = /** @class */ (function () {
    function Microblog() {
        this.postagens = [];
        this.maisCurtidas = [];
    }
    Microblog.prototype.incluirPostagem = function (adicionada) {
        this.postagens.push(adicionada);
    };
    Microblog.prototype.consultarPorid = function (numero) {
        var idProcurado = -1;
        for (var i = 0; i < this.postagens.length; i++) {
            if (this.postagens[i].id == numero) {
                idProcurado = i;
                break;
            }
        }
        return idProcurado;
    };
    Microblog.prototype.excluirPorid = function (numero) {
        var idProcurado = this.consultarPorid(numero);
        if (idProcurado != -1) {
            for (var i = idProcurado; i < this.postagens.length - 1; i++) {
                this.postagens[i] = this.postagens[i + 1];
            }
            this.postagens.pop();
        }
    };
    Microblog.prototype.buscarMaisCurtida = function () {
        var P0 = new Postagem(0, "Sem curtidas.", 0);
        var maisCurtida = P0;
        var contador_iguais = 0;
        for (var i = 0; i < this.postagens.length; i++) {
            if (this.postagens[i].quantidadeCurtidas > maisCurtida.quantidadeCurtidas) {
                maisCurtida = this.postagens[i];
            }
        }
        for (var i = 0; i < this.postagens.length; i++) {
            if (this.postagens[i].quantidadeCurtidas == maisCurtida.quantidadeCurtidas) {
                contador_iguais++;
                this.maisCurtidas.push(this.postagens[i]);
            }
        }
        this.maisCurtidas = this.postagens.filter(function (post) { return post.quantidadeCurtidas === maisCurtida.quantidadeCurtidas; });
        if (contador_iguais == 1) {
            return maisCurtida;
        }
        return "As postagengens mais curtidas s\u00E3o:\n        ".concat(this.maisCurtidas);
    };
    Microblog.prototype.curtirPorid = function (numero) {
        var idProcurado = this.consultarPorid(numero);
        if (idProcurado !== -1) {
            this.postagens[idProcurado].curtir(); // Chama o método curtir() da postagem encontrada
            this.buscarMaisCurtida();
        }
    };
    Microblog.prototype.toString = function () {
        var texto = "Postagens do blog: ";
        for (var i = 0; i < this.postagens.length; i++) {
            texto += this.postagens[i];
            texto += "; ";
        }
        return texto;
    };
    return Microblog;
}());
var P1 = new Postagem(1, "Bom dia!", 0);
var P2 = new Postagem(2, "Boa tarde!", 0);
var P3 = new Postagem(3, "Boa noite!", 0);
var M1 = new Microblog;
console.log(P1.toString());
P1.curtir();
P3.curtir();
P1.curtir();
P2.curtir();
console.log(P1.toString());
M1.incluirPostagem(P1);
M1.incluirPostagem(P2);
M1.incluirPostagem(P3);
M1.curtirPorid(1);
M1.curtirPorid(3);
console.log(M1.postagens);
M1.excluirPorid(2);
console.log(M1.postagens);
M1.incluirPostagem(P2);
console.log(M1.postagens);
console.log(M1.buscarMaisCurtida());
console.log(M1.toString());
