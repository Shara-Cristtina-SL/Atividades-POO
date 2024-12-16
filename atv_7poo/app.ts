import * as prompt from 'prompt-sync';
const input = prompt();
import { Cliente, Conta, Banco } from "./banco";
let banco: Banco = new Banco();

function main(): void {
    let opcao: String = '';
    do {
        console.log('\nBem vindo\nDigite uma opção:');
        console.log('Contas:\n')
        console.log(menu('1'));
        console.log('Clientes:\n');
        console.log(menu('2'));

        opcao = input("Opção: ");
        switch (opcao) {
            case "1":
                cadastrarConta();
                break;
            case "2":
                consultarConta();
                break;
            case "3":
                sacar();
                break;
            case "4":
                depositar();
                break;
            case "5":
                excluirConta();
                break;
            case "6":
                transferir();
                break;
            case "7":
                transferirParaMultiplasContas();
                break;
            case "8":
                totalizacoes();
                break;
            case "9":
                cadastrarCliente();
                break;
            case "10":
                consultarCliente();
                break;
            case "11":
                associarContaCliente();
                break;
            case "12":
                cadastrarCliente();
                break;
            case "13":
                totalizarSaldoCliente();
                

        }
        input("Operação finalizada. Digite <enter>");
    } while (opcao != "0");
    console.log("Aplicação encerrada");
    console.log(banco.contas)
}

function menu(opcoes: string) {
    if (opcoes == '1') {
        return `
        1- Inserir conta
        2- Consultar
        3- Sacar
        4- Depositar
        5- Excluir
        6- Transferir
        7- Transferir p/ multiplas contas
        8- Totalizações`
    } else if (opcoes == '2') {
        return `
        9-  Inserir Cliente
        10-  Consultar
        11-  Associar
        12-  Cadastrar cliente
        13- Saldo total.
        0- Sair`
    }
}
function cadastrarConta(): void {
    console.log("\nCadastrar conta:");
    let numero: string = input('Digite o número da conta: ');
    let saldo: number = parseFloat(input('Digite o saldo inicial da conta: '));
    let conta: Conta = new Conta(numero, saldo); 
    banco.inserirConta(conta.numero);
    console.log("Conta cadastrada com sucesso!");
}

function sacar(): void {
    console.log("\nSaque:");
    let numero: string = input('Digite o número da conta: ');
    let valor: number = parseFloat(input('Digite o valor do saque: '));
    banco.sacar(numero, valor);
    console.log("Saque realizado.");
    exibirExtrato(numero);
}

function depositar(): void {
    console.log("\nDepósito:");
    let numero: string = input('Digite o número da conta: ');
    let valor: number = parseFloat(input('Digite o valor do depósito: '));
    banco.depositar(numero, valor);
    console.log("Depósito realizado.");
    exibirExtrato(numero);
}

function transferir(): void {
    console.log("\nTransferência:");
    let numeroOrigem: string = input('Digite o número da conta de origem: ');
    let numeroDestino: string = input('Digite o número da conta de destino: ');
    let valor: number = parseFloat(input('Digite o valor da transferência: '));
    banco.transferir(numeroOrigem, numeroDestino, valor);
    console.log("Transferência realizada.");
    console.log("\nExtrato da conta de origem:");
    exibirExtrato(numeroOrigem);
    console.log("\nExtrato da conta de destino:");
    exibirExtrato(numeroDestino);
}

function consultarConta(): void {
    console.log("\nConsultar conta:");
    let numero: string = input('Digite o número da conta: ');
    exibirExtrato(numero);
}


function exibirExtrato(numero: string): void {
    const conta = banco.consultar(numero);
    if (banco.contaEsta(conta)) {
        const cliente = conta.cliente;
        console.log("\n=== Extrato da Conta ===");
        console.log(`ID: ${conta.id}`);
        console.log(`Número da conta: ${conta.numero}`);
        console.log(`Saldo: ${conta.saldo}`);
        if (banco.clienteEstaCadastrado(cliente)) {
            console.log("\n=== Dados do Cliente ===");
            console.log(`ID: ${cliente.id}`);
            console.log(`Nome: ${cliente.nome}`);
            console.log(`CPF: ${cliente.cpf}`);

            console.log("Contas associadas:");
            cliente.contas.forEach((c) =>
                console.log(`- Conta: ${c.numero}, Saldo: ${c.saldo}`)
            );

        } else {
            console.log("Cliente: Não associado.");
        }
        console.log("=========================\n");
    } else {
        console.log("Conta não encontrada para exibir extrato.");
    }
}


function excluirConta(): void {
    console.log("\nExcluir conta:");
    let numero: string = input('Digite o número da conta: ');
    banco.excluirConta(numero);
    console.log("Conta excluída com sucesso!");
}

function transferirParaMultiplasContas(): void {
    let contas_lista: string[] = []
    let numero:string = input("Digite o numero da conta de origem: ");
    let contas: string = input("Digite os números das contas separando por vígula, sem espaços.")
    let valor: number = Number(input("Digite o valor a ser transferido para as contas: "));
    contas_lista = contas.split(",");
    banco.transferirParaMultiplasContas(numero, contas_lista, valor);
}

function totalizacoes(): void {
    console.log("\nTotalizações:");
    console.log(`Quantidade de contas: ${banco.contarContas()}`);
    console.log(`Total depositado no banco: ${banco.calcularTotalDepositado()}`);
    console.log(`Média de saldo das contas: ${banco.calcularMediaSaldos()}`);
}

function cadastrarCliente(): void {
    let id:number = 0;
    console.log("\nCadastrar cliente:");
    let nome: string = input('Digite o nome do cliente: ');
    let cpf: string = input('Digite o CPF do cliente: ');
    let dataNascimento: Date = new Date(input('Digite a data de nascimento (AAAA-MM-DD): '));
    let cliente: Cliente = new Cliente(id, nome, cpf, dataNascimento);
    banco.inserirCliente(cliente);
    console.log("Cliente cadastrado com sucesso!");
}

function consultarCliente(): void {
    console.log("\nConsultar cliente:");
    let cpf: string = input('Digite o CPF do cliente: ');
    let cliente = banco.consultarPorCpf(cpf);
    if (cliente) {
        console.log(`Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
    } else {
        console.log("Cliente não encontrado.");
    }
}

function associarContaCliente(): void {
    console.log("\nAssociar conta a cliente:");
    let numeroConta: string = input('Digite o número da conta: ');
    let cpfCliente: string = input('Digite o CPF do cliente: ');
    banco.associarContaCliente(numeroConta, cpfCliente);
    console.log("Conta associada ao cliente com sucesso!");
}

function totalizarSaldoCliente(): void {
    console.log("\Totalizar saldo por cliente:");
    let cpfCliente: string = input('Digite o CPF do cliente: ');
    let total = banco.totalizarSaldoCliente(cpfCliente);
    console.log("Total: " + total);
}


main()

