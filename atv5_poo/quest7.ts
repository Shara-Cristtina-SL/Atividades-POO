class Triagulo {
    lado1 : number;
    lado2 : number;
    lado3 : number;

    constructor(l1 : number, l2 : number, l3 : number){
        this.lado1 = l1;
        this.lado2 = l2;
        this.lado3 = l3;
    }

    // |b-c| < a < b+c
    Eh_triangulo(){
        if((this.lado2 - this.lado3) < 0){
            if(-(this.lado2-this.lado3) < this.lado1 && this.lado1 < (this.lado2 + this.lado3)){
                return true;
            }else{ 
                return false;
            }
        }else{
            if((this.lado2-this.lado3) < this.lado1 && this.lado1 < (this.lado2 + this.lado3)){
                return true;
            }else{
                return false;
            }
        }
    }

    eh_equilatero(){
        if(!this.Eh_triangulo()){
            return false
        }
        if(this.lado1 == this.lado2 && this.lado2 == this.lado3){
            return true;
        }else{
            return false;
        }
    }
    eh_isoceles(){
        if(!this.Eh_triangulo()){
            return false;
        }
        if((this.lado1 == this.lado2 || this.lado2 == this.lado3 || this.lado1 == this.lado3)){
            return true;
        }else{
            return false;
        }
    }

    eh_escaleno(){
        if(!this.Eh_triangulo()){
            return false;
        }
        if(this.lado1 != this.lado2 && this.lado2 != this.lado3 && this.lado1!= this.lado3){
            return true
        }else{
            return false
        }
    }
}

let T1 : Triagulo = new Triagulo(5,7,9);
let T2 : Triagulo = new Triagulo(2,3,6);
let T3 : Triagulo = new Triagulo(2,2,2);
let T4 : Triagulo = new Triagulo(2,2,3);

console.log(T1.Eh_triangulo());
console.log(T2.Eh_triangulo());
console.log(" ")
console.log(T1.eh_escaleno());
console.log(T2.eh_escaleno());
console.log(T3.eh_equilatero());
console.log(T4.eh_isoceles());
console.log(T1.eh_isoceles())
