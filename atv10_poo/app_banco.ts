import * as prompt from 'prompt-sync';
const input = prompt();
//import { readFileSync, writeFileSync,appendFile, existsSync} from 'node:fs';
import * as fs from 'fs';
import { Cliente, Banco, Poupanca, ContaImposto } from "./banco";
import { getNumberInRange } from './util';
import { error } from 'console';

class BancoApp {
    private banco: Banco;

    constructor() {
        this.banco = new Banco();
    }

    public run(): void {

        let opcao: string = '';
        do {
            console.clear();
            console.log('\nBem vindo (a)! \nDigite uma opção:');
            console.log('Contas:\n');
            console.log(this.menu('1'));
            console.log('Clientes:\n');
            console.log(this.menu('2'));

            opcao = String(getNumberInRange(Number(input("Opção: ")), 0, 17));
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
                    this.RenderJuros();
                    break;
                case "11":
                    this.salvarContas();
                    break;
                case '12':
                    //incompleto
                    //this.cadastrarContasDeArquivo();
                    break;
                case '13':
                    this.cadastrarCliente();
                    break;
                case "14":
                    this.consultarCliente();
                    break;
                case "15":
                    this.atribuirTitularidade();
                    break;
                case "16":
                    this.totalizarSaldoCliente();
                    break;
                case "17":
                    this.trocarTitularidade();
                    break;
                case "18":
                    this.listarContasSemCliente();
                    this.atribuirTitularidade();
                    break;
                case "19":
                    this.excluirCliente();
                    break;
                case "0":
                    break;
                default:
                    console.log("Opção inválida.")
            }
            if (opcao != "0") {
                input("Operação finalizada. Digite <enter>");
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
            10- Render juros da poupança
            11- Criar arquivo txt para salvar contas ao fim do processo 

            12- Cadastrar contas em arquivo txt //Incompleto
            `
        } else if (opcoes == '2') {
            return `
            13-   Inserir Cliente
            14-  Consultar
            15-  Atribuir titularidade de conta
            16-  Saldo total.
            17-  Trocar titularidade
            18-  Listar contas sem cliente e atribuir titulariadade
            19-  Excluir cliente
             0-  Sair`
        }
        return "";
    }

    private cadastrarConta(): void {
        console.log("\nCadastrar conta:");
        let numero: string = input('Digite o número da conta: ');
        let tipo: number | undefined = getNumberInRange(Number(input("Digite 1 Para conta regular, 2 para poupança, 3 com imposto e 4 para corrente: ")), 1, 4);
        let saldoInicial: number = validaValor(Number(input('Saldo inicial:  ')))
        if (tipo == 1) {
            this.banco.inserirConta(numero, 'conta', saldoInicial);
        } else if (tipo == 2) {
            let taxaDeJuros: number = Number(input("Taxa de juros: "));
            this.banco.inserirConta(numero, "poupanca", saldoInicial, taxaDeJuros);
        } else if(tipo==3) {
            let taxaDeImposto: number = Number(input("Taxa de imposto: "));
            this.banco.inserirConta(numero, "contaImposto", saldoInicial, taxaDeImposto);
        }else{
            let limiteChequeEsp: number= Number(input("Valor limite do cheque especial: "));
            let taxaManutencao: number= Number(input("Taxa de manutenção: "))
            this.banco.inserirConta(numero,"contaCorrente",saldoInicial,undefined,limiteChequeEsp, taxaManutencao)
        }
    }

    private sacar(): void {
        console.log("\nSaque:");
        let numero: string = input('Digite o número da conta: ');
        let valor: number = validaValor(parseFloat(input('Digite o valor do saque: ')));
        if (this.banco.sacar(numero, valor)) {
            console.log("Saque realizado.");
            this.exibirExtrato(numero);
        } else {
            console.log("Falha ao realizar saque!")
        }
    }

    private depositar(): void {
        console.log("\nDepósito:");
        let numero: string = input('Digite o número da conta: ');
        let valor: number = validaValor(parseFloat(input('Digite o valor do depósito: ')));
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
        if (conta) {
            this.exibirExtrato(numero);
        } else {
            console.log("Conta não encontrada.");
        }
    }

    private exibirExtrato(numero: string): void {
        const conta = this.banco.consultar(numero);
        if (this.banco.contaEsta(conta)) {
            const cliente = conta.cliente;
            console.log("\n=== Extrato da Conta ===");
            console.log(`ID: ${conta.id}`);
            if (conta instanceof Poupanca) {
                console.log("Tipo: Poupança");
                console.log(`Taxa de juros: ${conta.taxaDejuros}%`)
            } else if (conta instanceof ContaImposto) {
                console.log("Tipo: Imposto");
                console.log(`Taxa de imposto: ${conta.taxaDejuros}%`)
            }
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
        let numero: string = input("Digite o numero da conta de origem: ");
        let contas: string = input("Digite os números das contas separando por vígula, sem espaços:  ")
        let valor: number = Number(input("Digite o valor a ser transferido para as contas: "));
        contas_lista = contas.split(",");
        this.banco.transferirParaMultiplasContas(numero, contas_lista, valor);
    }

    private transferirParaMultiplasContasLimite(): void {
        let contas_lista: string[] = []
        let numero: string = input("Digite o numero da conta de origem: ");
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
        let id: number = 0;
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

    private trocarTitularidade(): void {
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

    private RenderJuros(): void {
        let numero: string = input("Digite o número da conta: ");
        this.banco.renderJuros(numero);;

    }

    private salvarContas(): void {
        let arquivo = input('Digite o nome do arquivo com a extensão .txt: ')
        let linha: string = ``
        if (fs.existsSync(arquivo) == false) {

            fs.writeFileSync(arquivo, linha)
        }
        for (let conta of this.banco.contas) {
            if (conta instanceof Poupanca) {
                linha+=`CP;${conta.numero};${conta.saldo.toFixed(2)};${conta.taxaDejuros}%`;
                if (conta.cliente) {
                    linha+=`;${conta.cliente.nome}\n`;
                } else {
                    linha+=`\n`;
                }

            } else if (conta instanceof ContaImposto) {
                linha+= `CI;${conta.numero};${conta.saldo.toFixed(2)};${conta.taxaDejuros}%`
                if (conta.cliente) {
                    linha += `;${conta.cliente.nome}\n`
                } else {
                    linha +=`\n`
                }

            } else {
                linha += `C;${conta.numero};${conta.saldo.toFixed(2)}`
                if (conta.cliente) {
                    linha += `;${conta.cliente.nome}\n`
                } else {
                    linha+= `\n`
                }
            }
        }
        fs.appendFile(arquivo, linha, (err) => {
            if (err) {
                console.error(err);
            }})
    }
    
/*Incompleto
    cadastrarContasDeArquivo(): void{
        let arquivo = input('Digite o nome do arquivo com a extensão .txt: ');
        const conteudoArquivo = fs.readFileSync(arquivo, 'utf8');
        const contas1 = conteudoArquivo.split('\n');
        let tipo: "conta"| 'poupanca' | 'contaImposto'= 'conta';
        let numero: string= "";
        let saldo: number = 0;
        let taxa: number = 0;
        let nome: string = "";

        for(let conta of contas1){
            for(let i = 0; i < conta.length; i++ ){
                if(conta[0]== `CP`){
                    tipo = "poupanca";
                }else if(conta[0]== `CI`){
                    tipo = "contaImposto";
                }
                numero = conta[2];
                saldo = Number(conta[4]);

                if(conta[6]){
                    if(conta[6][-1]=='%'){
                        taxa = Number(conta[6]);
                    }else{
                        nome = conta[6];
                    }
                }
                if(conta[7]){
                    nome = conta[7];
                }
            }
            this.banco.inserirConta(numero,tipo,saldo,taxa)
            console.log(this.banco.contas)
        }
    }*/
    
}

function validaValor(valor: number): number{
    if (valor === undefined) {
        throw new Error("Valor não pode ser undefined!");
      }
    
      if (valor <= 0 || (typeof valor) != 'number' ) {
        throw new Error("Valor inválido: deve ser maior que zero.");
      }
    
    try {
        return valor
    } catch (erro) {
        if(erro instanceof Error){
            console.error("Ocorreu um erro:", erro.message);
        }else{
            console.error("Ocorreu um erro desconhecido:", erro);
        }
         
    }
    throw error
}
    const bancoApp = new BancoApp();
bancoApp.run();