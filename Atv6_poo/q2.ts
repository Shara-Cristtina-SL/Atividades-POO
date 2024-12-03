import { Cliente } from "./q1";

//let C1 : Cliente = new Cliente(21,"Ana", "1234", "12/03/04", [1,2,7]);

export class Conta {
    numero: string;
    saldo: number;
    id: number;
    cliente: Cliente;
    
    constructor(numero: string, saldoInicial: number, id: number, cliente: Cliente) {
        this.numero = numero;
        this.saldo = saldoInicial;
        this.id = id;
        this.cliente = cliente;
    }
    sacar(valor: number): boolean{
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
    transferir(contaDestino: Conta, valor: number): boolean{
        if(this.sacar(valor)){
            contaDestino.depositar(valor);
            return true
        }
        return false
    }
}

//let C2 : Cliente = new Cliente(33,"Alya", "9678", "12/03/04", [8,5]);
//let c1: Conta = new Conta("1",100, 21, C1);
//let c2: Conta = new Conta("2",100, 33, C2);


//console.log(c1.id);
//console.log(c2.id)
//console.log(c1.cliente)
//console.log(c2.cliente);
