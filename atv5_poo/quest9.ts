class Conta {
    numero: String;
    saldo: number;
    
    constructor(numero: String, saldoInicial: number) {
        this.numero = numero;
        this.saldo = saldoInicial;
    }
    sacar(valor: number){
        if(this.saldo > valor){
            this.saldo = this.saldo - valor;
            return true;
        }
        return false;
    }
    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }
    consultarSaldo(): number {
        return this.saldo;
    }
    transferir(contaDestino: Conta, valor: number){
        if(this.sacar(valor)){
            contaDestino.depositar(valor);
            return true
        }
        return false
    }
}

let c1: Conta = new Conta("1",100);
let c2: Conta = new Conta("2",100);
let c3: Conta;

console.log(c1.sacar(20)); // true
console.log(c1.consultarSaldo()); //80
console.log(c1.sacar(100)); //false
console.log(c1.consultarSaldo()); //80
console.log(c1.transferir(c2, 20)); //true
console.log(c1.consultarSaldo()); //60
console.log(c2.transferir(c1,150)); //false
console.log(c2.consultarSaldo()); //120