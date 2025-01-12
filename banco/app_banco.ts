import * as prompt from 'prompt-sync';
const input = prompt();
import { Cliente, Banco } from "./banco";

class BancoApp {
    private banco: Banco;

    constructor() {
        this.banco = new Banco();
    }

    public run(): void {
        let opcao: string = '';
        do {
            console.log('\nBem vindo\nDigite uma opção:');
            console.log('Contas:\n');
            console.log(this.menu('1'));
            console.log('Clientes:\n');
            console.log(this.menu('2'));

            opcao = input("Opção: ");
            switch (opcao) {
                case "1":
                    this.cadastrarConta();
                    break;
                case "2":
                    this.consultarConta();
                    break;
                case "3":
                    this.sacar();
                    break;
                case "4":
                    this.depositar();
                    break;
                case "5":
                    this.excluirConta();
                    break;
                case "6":
                    this.transferir();
                    break;
                case "7":
                    this.transferirParaMultiplasContas();
                    break;
                case "8":
                    this.transferirParaMultiplasContasLimite();
                    break;
                case "9":
                    this.totalizacoes();
                    break;
                case "10":
                    this.cadastrarCliente();
                    break;
                case "11":
                    this.consultarCliente();
                    break;
                 case "12":
                    this.atribuirTitularidade();
                    break;
                case "13":
                    this.totalizarSaldoCliente();
                    break;
                case "14":
                     this.trocarTitularidade();
                     break;
                 case "15":
                     this.listarContasSemCliente();
                     this.atribuirTitularidade();
                     break;
                 case "16":
                    this.excluirCliente();
                    break;
                case "0":
                    break;
                default:
                    console.log("Opção inválida.")
            }
            if(opcao != "0"){
                input("Operação finalizada. Digite <enter>");
                console.clear()
            }
        } while (opcao != "0");
        console.log("Aplicação encerrada");
    }

    private menu(opcoes: string): string {
        if (opcoes == '1') {
            return `
            1- Inserir conta
            2- Consultar
            3- Sacar
            4- Depositar
            5- Excluir
            6- Transferir
            7- Transferir p/ multiplas contas (até onde saldo permitir)
            8- Transferir p/ multiplas contas (se saldo for suficiente)
            9- Totalizações
            `
        } else if (opcoes == '2') {
            return `
            10-   Inserir Cliente
            11-  Consultar
            12-  Atribuir titularidade de conta
            13-  Saldo total.
            14-  Trocar titularidade
            15-  Listar contas sem cliente e atribuir titulariadade
            16-  Excluir cliente
             0-  Sair`
        }
        return "";
    }

    private cadastrarConta(): void {
        console.log("\nCadastrar conta:");
        let numero: string = input('Digite o número da conta: ');
        this.banco.inserirConta(numero);
        console.log("Conta cadastrada com sucesso!");
    }

    private sacar(): void {
        console.log("\nSaque:");
        let numero: string = input('Digite o número da conta: ');
        let valor: number = parseFloat(input('Digite o valor do saque: '));
        this.banco.sacar(numero, valor);
        console.log("Saque realizado.");
        this.exibirExtrato(numero);
    }

    private depositar(): void {
        console.log("\nDepósito:");
        let numero: string = input('Digite o número da conta: ');
        let valor: number = parseFloat(input('Digite o valor do depósito: '));
        this.banco.depositar(numero, valor);
        console.log("Depósito realizado.");
        this.exibirExtrato(numero);
    }

    private transferir(): void {
        console.log("\nTransferência:");
        let numeroOrigem: string = input('Digite o número da conta de origem: ');
        let numeroDestino: string = input('Digite o número da conta de destino: ');
        let valor: number = parseFloat(input('Digite o valor da transferência: '));
        this.banco.transferir(numeroOrigem, numeroDestino, valor);
        console.log("Transferência realizada.");
        console.log("\nExtrato da conta de origem:");
        this.exibirExtrato(numeroOrigem);
        console.log("\nExtrato da conta de destino:");
        this.exibirExtrato(numeroDestino);
    }

    private consultarConta(): void {
        console.log("\nConsultar conta:");
        let numero: string = input('Digite o número da conta: ');
        const conta = this.banco.consultar(numero);
         if(conta){
             this.exibirExtrato(numero);
         }else{
           console.log("Conta não encontrada.");
         }
    }

    private exibirExtrato(numero: string): void {
        const conta = this.banco.consultar(numero);
         if (this.banco.contaEsta(conta)) {
            const cliente = conta.cliente;
            console.log("\n=== Extrato da Conta ===");
            console.log(`ID: ${conta.id}`);
            console.log(`Número da conta: ${conta.numero}`);
            console.log(`Saldo: R$ ${conta.saldo.toFixed(2)}`);
             if (cliente && this.banco.clienteEstaCadastrado(cliente)) {
                console.log("\n=== Dados do Cliente ===");
                console.log(`ID: ${cliente.id}`);
                console.log(`Nome: ${cliente.nome}`);
                console.log(`CPF: ${cliente.cpf}`);

                console.log("Contas associadas:");
                cliente.contas.forEach((c) =>
                    console.log(`- Conta: ${c.numero}, Saldo: R$ ${c.saldo.toFixed(2)}`)
                );

            } else {
                console.log("Cliente: Não associado.");
            }
            console.log("=========================\n");
        } else {
            console.log("Conta não encontrada para exibir extrato.");
        }
    }


    private excluirConta(): void {
        console.log("\nExcluir conta:");
        let numero: string = input('Digite o número da conta: ');
        this.banco.excluirConta(numero);
        console.log("Conta excluída com sucesso!");
    }

    private transferirParaMultiplasContas(): void {
        let contas_lista: string[] = []
        let numero:string = input("Digite o numero da conta de origem: ");
        let contas: string = input("Digite os números das contas separando por vígula, sem espaços:  ")
        let valor: number = Number(input("Digite o valor a ser transferido para as contas: "));
        contas_lista = contas.split(",");
        this.banco.transferirParaMultiplasContas(numero, contas_lista, valor);
    }

    private transferirParaMultiplasContasLimite(): void {
        let contas_lista: string[] = []
        let numero:string = input("Digite o numero da conta de origem: ");
        let contas: string = input("Digite os números das contas separando por vígula, sem espaços:  ")
        let valor: number = Number(input("Digite o valor a ser transferido para as contas: "));
        contas_lista = contas.split(",");
        this.banco.transferirParaMultiplasContasLimite(numero, contas_lista, valor);
    }

    private totalizacoes(): void {
        console.log("\nTotalizações:");
        console.log(`Quantidade de contas: ${this.banco.contarContas()}`);
        console.log(`Total depositado no banco: R$ ${this.banco.calcularTotalDepositado().toFixed(2)}`);
        console.log(`Média de saldo das contas: ${this.banco.calcularMediaSaldos()}`);
    }

    private cadastrarCliente(): void {
        let id:number = 0;
        console.log("\nCadastrar cliente:");
        let nome: string = input('Digite o nome do cliente: ');
        let cpf: string = input('Digite o CPF do cliente: ');
        let dataNascimento: Date = new Date(input('Digite a data de nascimento (AAAA-MM-DD): '));
        let cliente: Cliente = new Cliente(id, nome, cpf, dataNascimento);
        this.banco.inserirCliente(cliente);
        console.log("Cliente cadastrado com sucesso!");
    }

    private consultarCliente(): void {
        console.log("\nConsultar cliente:");
        let cpf: string = input('Digite o CPF do cliente: ');
        let cliente = this.banco.consultarPorCpf(cpf);
        if (cliente) {
            console.log(`Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
        } else {
            console.log("Cliente não encontrado.");
        }
    }

      /*private associarContaCliente(): void {
        console.log("\nAssociar conta a cliente:");
        let numeroConta: string = input('Digite o número da conta: ');
        let cpfCliente: string = input('Digite o CPF do cliente: ');
        this.banco.associarContaCliente(numeroConta, cpfCliente);
         }*/

   private totalizarSaldoCliente(): void {
        console.log("\Totalizar saldo por cliente:");
        let cpfCliente: string = input('Digite o CPF do cliente: ');
        let total = this.banco.totalizarSaldoCliente(cpfCliente);
        console.log("Total: " + total);
    }

    private trocarTitularidade(): void{
       console.log("\nTrocar Titularidade:");
       let cpfAtual: string = input('Digite o CPF do cliente atual: ');
       let novoCpf: string = input('Digite o CPF do novo cliente: ');
       let numeroConta: string = input('Digite o número da conta: ');
       this.banco.trocarTitularidade(cpfAtual, novoCpf, numeroConta);
    }

    private listarContasSemCliente(): void {
        const contasSemCliente = this.banco.listarContasSemCliente();
        console.log("\nContas sem cliente:");
        contasSemCliente.forEach(conta => console.log(`- Número da conta: ${conta.numero}`));
    }

    private atribuirTitularidade(): void {
       console.log("\nAtribuir titularidade a conta sem cliente:");
       let numeroConta: string = input('Digite o número da conta: ');
       let cpfCliente: string = input('Digite o CPF do cliente: ');
       this.banco.atribuirTitularidade(numeroConta, cpfCliente);
    }
    private excluirCliente(): void {
        console.log("\nExcluir cliente:");
        let cpf: string = input('Digite o CPF do cliente a ser excluído: ');
        this.banco.excluirCliente(cpf);
    }
}

const bancoApp = new BancoApp();
bancoApp.run();