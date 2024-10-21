class Circulo {
    raio: number = 3;

    calcularArea(): number {
        return 3.14*(this.raio)**2
    }
    calcularPerimetro(): number {
        return 2*3.14*this.raio
    }
}

const meuCirculo = new Circulo();


const perimetro = meuCirculo.calcularPerimetro();
const area = meuCirculo.calcularArea();

console.log("O perímetro do cículo é:", perimetro,
"\n A área do círculo é: ", area);