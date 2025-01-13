class Veiculo {
    placa: String;
    ano: number;
}

class Carro extends Veiculo {
    modelo: String;
}

class CarroEletrico extends Carro{
    autonomiaBateria: number;
}