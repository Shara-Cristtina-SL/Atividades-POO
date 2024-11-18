var Triagulo = /** @class */ (function () {
    function Triagulo(l1, l2, l3) {
        this.lado1 = l1;
        this.lado2 = l2;
        this.lado3 = l3;
    }
    // |b-c| < a < b+c
    Triagulo.prototype.Eh_triangulo = function () {
        if ((this.lado2 - this.lado3) < 0) {
            if (-(this.lado2 - this.lado3) < this.lado1 && this.lado1 < (this.lado2 + this.lado3)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if ((this.lado2 - this.lado3) < this.lado1 && this.lado1 < (this.lado2 + this.lado3)) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    Triagulo.prototype.eh_equilatero = function () {
        if (!this.Eh_triangulo()) {
            return false;
        }
        if (this.lado1 == this.lado2 && this.lado2 == this.lado3) {
            return true;
        }
        else {
            return false;
        }
    };
    Triagulo.prototype.eh_isoceles = function () {
        if (!this.Eh_triangulo()) {
            return false;
        }
        if ((this.lado1 == this.lado2 || this.lado2 == this.lado3 || this.lado1 == this.lado3)) {
            return true;
        }
        else {
            return false;
        }
    };
    Triagulo.prototype.eh_escaleno = function () {
        if (!this.Eh_triangulo()) {
            return false;
        }
        if (this.lado1 != this.lado2 && this.lado2 != this.lado3 && this.lado1 != this.lado3) {
            return true;
        }
        else {
            return false;
        }
    };
    return Triagulo;
}());
var T1 = new Triagulo(5, 7, 9);
var T2 = new Triagulo(2, 3, 6);
var T3 = new Triagulo(2, 2, 2);
var T4 = new Triagulo(2, 2, 3);
console.log(T1.Eh_triangulo());
console.log(T2.Eh_triangulo());
console.log(" ");
console.log(T1.eh_escaleno());
console.log(T2.eh_escaleno());
console.log(T3.eh_equilatero());
console.log(T4.eh_isoceles());
console.log(T1.eh_isoceles());
