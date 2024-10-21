class Situacao_financeira {
    valorCreditos: number = 1500;
    valorDebitos: number = 630;

    calcularSaldo(): number {
        return this.valorCreditos - this.valorDebitos
    }
}

const meuSaldo = new Situacao_financeira();

const saldo = meuSaldo.calcularSaldo();

console.log("O saldo da conta é:", saldo);