class Retangulo {
    lado1: number = 0;
    lado2: number = 0;

    calcularArea(): number {
        return this.lado1 * this.lado2;
    }

    calcularPerimetro(): number {
        return 2 * (this.lado1 + this.lado2);
    }

    ehQuadrado(): boolean {
        if(this.lado1 == this.lado2){
            return true
        }else{
            return false
        }
    }
}

let retangulo: Retangulo = new Retangulo();
retangulo.lado1 = 2;
retangulo.lado2 = 2;

console.log("Área: " + retangulo.calcularArea());
console.log("Perímetro: " + retangulo.calcularPerimetro());

if(retangulo.ehQuadrado()){
    console.log("O retângulo é quadrado.")
}


