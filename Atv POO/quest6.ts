class Retangulo {
    lado1: number = 2;
    lado2: number = 3;

    calcularPerimetro(): number {
        return (this.lado1*2) + (this.lado2*2)
    }
}

const meuRetangulo = new Retangulo();


const perimetroRetangulo = meuRetangulo.calcularPerimetro();
console.log("O perímetro do retângulo é:", perimetroRetangulo);