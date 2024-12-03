import {Cliente} from './q1';
import { Conta } from './q2';

class Banco {
    contas: Conta[];
    clientes: Cliente[];

    constructor() {
        this.contas = [];
        this.clientes = [];
    }

    /*inserir(conta: Conta): void {
        this.contas.push(conta);
    }*/

            inserirConta(conta: Conta): void {
              const contaExistente = this.contas.find(c => c.id === conta.id || c.numero === conta.numero);
              if (contaExistente) {
                throw new Error(`Conta já cadastrada: ${conta.numero}`);
              }
              this.contas.push(conta);
            }
          

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }

        return contaProcurada;
    }

    consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    consultarPorCpf(cpf: string): Cliente {
        let cpfProcurado!: Cliente;

        for (let cliente of this.clientes) {
            if (cliente.cpf == cpf) {
                cpfProcurado = cliente;
                break;
            }
        }

        return cpfProcurado;
    }

    excluir(numero: string): void {
        let indiceProcurado: number =
            this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }

    depositar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultar(numero);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    alterar(conta: Conta): void {
        let contaProcurada: Conta = this.consultar(conta.numero);

        if (contaProcurada) {
            contaProcurada = conta;
        }
    }

    /*inserirCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }
        */

   /* associarContaCliente(numeroConta: string, cpf: string): void {
        let cliente = this.consultarPorCpf(cpf);
    
        if (cliente) {
          // Verifica se a conta já está associada ao cliente
          if (!cliente.contas.includes(parseInt(numeroConta))) {
            cliente.contas.push(parseInt(numeroConta));
          } else {
            console.log("A conta já está associada ao cliente.");
          }
        } else {
          console.log("Cliente não encontrado.");
        }
      }*/


  listarContasCliente(cpf: string): Conta[] {
    const cliente = this.consultarPorCpf(cpf);

    if (cliente) {
      // Filtra as contas do banco pelas contas do cliente
      return this.contas.filter(conta => cliente.contas.includes(conta.id));
    } else {
      return []; // Retorna um array vazio se o cliente não for encontrado
    }
  }
  
    totalizarSaldoCliente(cpf: string): number {
      const contasCliente = this.listarContasCliente(cpf);
  
      return contasCliente.reduce((total, conta) => total + conta.saldo, 0);
    }

        inserirCliente(cliente: Cliente): void {
          // Verifica se já existe um cliente com o mesmo ID
          const clienteExistentePorId = this.clientes.find(c => c.id === cliente.id);
          if (clienteExistentePorId) {
            console.error("Cliente com o ID", cliente.id, "já existe.");
            return;
          }
      
          // Verifica se já existe um cliente com o mesmo CPF
          const clienteExistentePorCpf = this.clientes.find(c => c.cpf === cliente.cpf);
          if (clienteExistentePorCpf) {
            console.error("Cliente com o CPF", cliente.cpf, "já existe.");
            return;
          }
      
          // Adiciona o cliente à lista
          this.clientes.push(cliente);
        }
      
}



let banco: Banco = new Banco();

let C1 : Cliente = new Cliente(21,"Ana", "1234", "12/03/04", [1,2,7]);
banco.inserirConta(new Conta("1",100, 21, C1));
banco.inserirCliente(C1);

let C2 : Cliente = new Cliente(33,"Alya", "9678", "12/03/04", [8,5]);
banco.inserirConta(new Conta("2",100, 33, C2));
banco.inserirCliente(C2)

let C3: Cliente = new Cliente(22, "Bruno", "5678", "15/04/05", [3, 9]);
banco.inserirConta(new Conta("3",100, 5678, C3));
banco.inserirCliente(C3);

//console.log(banco.clientes)

//console.log(banco.consultarPorCpf("5678"))
//banco.associarContaCliente("3", "5678"); // Associa a conta "3" ao cliente com CPF "5678"

/*const contasDoCliente = banco.listarContasCliente("1234");
console.log(contasDoCliente);*/

/*const saldoTotal = banco.totalizarSaldoCliente("1234");
console.log("Saldo total do cliente:", saldoTotal);*/
/*

/*const novoCliente = new Cliente(24, "João", "56789", "20/01/1990", []);
banco.inserirCliente(novoCliente);*/

/*const novaConta = new Conta("123456", 1000, 1, cliente);
banco.inserirConta(novaConta);*/
/*banco.excluir('21');
console.log(banco.contas);
banco.excluir('23');
console.log(banco.contas);
banco.excluir('555-5');
console.log(banco.contas);
*/

/*banco.depositar('444-4', 40);
console.log(banco.consultar('444-4').consultarSaldo());

let conta4Alterada: Conta = new Conta('444-4', 10000);
banco.alterar(conta4Alterada);
console.log(banco.consultar('444-4').consultarSaldo());
*/
