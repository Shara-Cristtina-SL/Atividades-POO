/*import {Cliente} from '../Atv6_poo/q1.ts';
import { Conta } from '../Atv6_poo/q1.ts';

class Banco {
    contas: string[];
    clientes: Cliente[];
    private contasCompletas: Map<string, Conta> = new Map();

    constructor() {
        this.contas = [];
        this.clientes = [];
    }

    /*inserir(conta: Conta): void {
        this.contas.push(conta);
    }*/

        /*    inserirConta(numero: string, conta: Conta): void {
                let contaExistente = false;
                for(let i = 0; i < this.contas.length; i++){
                    if(this.contas[i] == numero){
                        console.log(`Conta já cadastrada: ${numero}`)
                        contaExistente = true;
                    }
                }
              if (contaExistente!) {
                this.contas.push(numero);
                this.contasCompletas.set(numero, conta);
              }
            }

            consultar(numero: string): string {
              let contaProcurada!: string;
      
              for (let conta of this.contas) {
                  if (conta == numero) {
                      contaProcurada = conta;
                      break;
                  }
              }
      
              return contaProcurada;
          }

    consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i] == numero) {
                indiceProcurado = i
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
    buscarContaCompleta(numeroConta: string): Conta | undefined{
        return this.contasCompletas.get(numeroConta);
    }

    depositar(numero: string, valor: number): void {
        const contaProcurada = this.consultar(numero);
    if (contaProcurada) {
        // Supondo que você tenha uma função para buscar a conta completa pelo número
        const contaCompleta = this.buscarContaCompleta(contaProcurada);
        if (contaCompleta) {
            contaCompleta.depositar(valor);
        } else {
            console.log("Conta não encontrada");
        }
    } else {
        console.log("Conta não encontrada");
    }
}

    alterar(conta: string): void {
      let indice = this.consultarPorIndice(conta);
      if (indice != -1) {
          this.contas[indice] = conta;
      }
  }
   clienteEsta(cliente: Cliente): boolean{
    let esta = false;
    for(let i = 0; i < this.contas.length; i++){
        if(cliente == this.clientes[i]){
            esta = true;
        }
    }
    return esta
   }
associarContaCliente(numeroConta: string, cpf: string): void {
    const cliente = this.consultarPorCpf(cpf);
  
    if (cliente) {
      // Verifica se a conta existe no banco
      const conta = this.consultar(numeroConta);
      if (conta) {
        // Verifica se a conta já está associada ao cliente
        for(let i = 0; i < this.contas.length; i++){
            if(cliente.contas[i] == numeroConta){
                console.log("A conta já está associada ao cliente.")
                return
            }
        } 
          cliente.contas.push(numeroConta); // Armazena o número da conta, não a instância
          console.log("Conta associada ao cliente com sucesso.");
        
      } else {
        console.log("Conta não encontrada.");
      }
    } else {
      console.log("Cliente não encontrado.");
    }
  }

  transferirParaMultiplasContas(contaOrigem: string, contasDestino: Conta[], valor: number): void {
    const contaOrigemObj = this.buscarContaCompleta(contaOrigem);

    if (contaOrigemObj) {
        for (const contaDestino of contasDestino) {
            contaOrigemObj.transferir(contaDestino, valor);
        }
    } else {
        console.log("Conta origem não encontrada.");
    }

    // Método para contar a quantidade de contas
    contarContas(): number {
        return this.contas.length;
    }

    // Método para calcular o total depositado
    calcularTotalDepositado(): number {
        let total = 0;
        for (const numeroConta of this.contas) {
            const conta = this.buscarContaCompleta(numeroConta);
            if (conta) {
                total += conta.saldo;
            }
        }
        return total;
    }

    // Método para calcular a média dos saldos
    calcularMediaSaldos(): number {
        const totalContas = this.contarContas();
        const totalDepositado = this.calcularTotalDepositado();
        return totalContas > 0 ? totalDepositado / totalContas : 0;
    }
  }
}*/

/*const banco = new Banco();

const quantidadeDeContas = banco.contarContas();
console.log("Quantidade de contas:", quantidadeDeContas);

const totalDepositado = banco.calcularTotalDepositado();
console.log("Total depositado:", totalDepositado);

const mediaSaldos = banco.calcularMediaSaldos();
console.log("Média dos saldos:", mediaSaldos);*/
