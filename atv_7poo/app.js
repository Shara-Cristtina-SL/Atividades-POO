"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt = require("prompt-sync");
var input = prompt();
var banco_1 = require("./banco");
var banco = new banco_1.Banco();
function main() {
    var opcao = '';
    do {
        console.log('\nBem vindo\nDigite uma opção:');
        console.log('Contas:\n');
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
        }
        input("Operação finalizada. Digite <enter>");
    } while (opcao != "0");
    console.log("Aplicação encerrada");
    console.log(banco.contas);
}
function menu(opcoes) {
    if (opcoes == '1') {
        return "\n        1- Inserir conta\n        2- Consultar\n        3- Sacar\n        4- Depositar\n        5- Excluir\n        6- Transferir\n        7- Transferir p/ multiplas contas\n        8- Totaliza\u00E7\u00F5es";
    }
    else if (opcoes == '2') {
        return "\n        9-  Inserir Cliente\n        10-  Consultar\n        11-  Associar\n        12- Cadastrar cliente\n        0- Sair";
    }
}
function cadastrarConta() {
    console.log("\nCadastrar conta:");
    var numero = input('Digite o número da conta: ');
    var saldo = parseFloat(input('Digite o saldo inicial da conta: '));
    var conta = new banco_1.Conta(numero, saldo);
    banco.inserirConta(conta.numero);
    console.log("Conta cadastrada com sucesso!");
}
function sacar() {
    console.log("\nSaque:");
    var numero = input('Digite o número da conta: ');
    var valor = parseFloat(input('Digite o valor do saque: '));
    banco.sacar(numero, valor);
    console.log("Saque realizado.");
    exibirExtrato(numero);
}
function depositar() {
    console.log("\nDepósito:");
    var numero = input('Digite o número da conta: ');
    var valor = parseFloat(input('Digite o valor do depósito: '));
    banco.depositar(numero, valor);
    console.log("Depósito realizado.");
    exibirExtrato(numero);
}
function transferir() {
    console.log("\nTransferência:");
    var numeroOrigem = input('Digite o número da conta de origem: ');
    var numeroDestino = input('Digite o número da conta de destino: ');
    var valor = parseFloat(input('Digite o valor da transferência: '));
    banco.transferir(numeroOrigem, numeroDestino, valor);
    console.log("Transferência realizada.");
    console.log("\nExtrato da conta de origem:");
    exibirExtrato(numeroOrigem);
    console.log("\nExtrato da conta de destino:");
    exibirExtrato(numeroDestino);
}
function consultarConta() {
    console.log("\nConsultar conta:");
    var numero = input('Digite o número da conta: ');
    exibirExtrato(numero);
}
function exibirExtrato(numero) {
    var conta = banco.consultar(numero);
    if (banco.contaEsta(conta)) {
        var cliente = conta.cliente;
        console.log("\n=== Extrato da Conta ===");
        console.log("ID: ".concat(conta.id));
        console.log("N\u00FAmero da conta: ".concat(conta.numero));
        console.log("Saldo: ".concat(conta.saldo));
        if (banco.clienteEstaCadastrado(cliente)) {
            console.log("\n=== Dados do Cliente ===");
            console.log("ID: ".concat(cliente.id));
            console.log("Nome: ".concat(cliente.nome));
            console.log("CPF: ".concat(cliente.cpf));
            console.log("Contas associadas:");
            cliente.contas.forEach(function (c) {
                return console.log("- Conta: ".concat(c.numero, ", Saldo: ").concat(c.saldo));
            });
        }
        else {
            console.log("Cliente: Não associado.");
        }
        console.log("=========================\n");
    }
    else {
        console.log("Conta não encontrada para exibir extrato.");
    }
}
function excluirConta() {
    console.log("\nExcluir conta:");
    var numero = input('Digite o número da conta: ');
    banco.excluirConta(numero);
    console.log("Conta excluída com sucesso!");
}
function transferirParaMultiplasContas() {
    var contas_lista = [];
    var numero = input("Digite o numero da conta de origem: ");
    var contas = input("Digite os números das contas separando por vígula, sem espaços.");
    var valor = Number(input("Digite o valor a ser transferido para as contas: "));
    contas_lista = contas.split(",");
    banco.transferirParaMultiplasContas(numero, contas_lista, valor);
}
function totalizacoes() {
    console.log("\nTotalizações:");
    console.log("Quantidade de contas: ".concat(banco.contarContas()));
    console.log("Total depositado no banco: ".concat(banco.calcularTotalDepositado()));
    console.log("M\u00E9dia de saldo das contas: ".concat(banco.calcularMediaSaldos()));
}
function cadastrarCliente() {
    var id = 0;
    console.log("\nCadastrar cliente:");
    var nome = input('Digite o nome do cliente: ');
    var cpf = input('Digite o CPF do cliente: ');
    var dataNascimento = new Date(input('Digite a data de nascimento (AAAA-MM-DD): '));
    var cliente = new banco_1.Cliente(id, nome, cpf, dataNascimento);
    banco.inserirCliente(cliente);
    console.log("Cliente cadastrado com sucesso!");
}
function consultarCliente() {
    console.log("\nConsultar cliente:");
    var cpf = input('Digite o CPF do cliente: ');
    var cliente = banco.consultarPorCpf(cpf);
    if (cliente) {
        console.log("Cliente encontrado: ID ".concat(cliente.id, ", Nome: ").concat(cliente.nome, ", CPF: ").concat(cliente.cpf));
    }
    else {
        console.log("Cliente não encontrado.");
    }
}
function associarContaCliente() {
    console.log("\nAssociar conta a cliente:");
    var numeroConta = input('Digite o número da conta: ');
    var cpfCliente = input('Digite o CPF do cliente: ');
    banco.associarContaCliente(numeroConta, cpfCliente);
    console.log("Conta associada ao cliente com sucesso!");
}
function totalizarSaldoCliente() {
    console.log("\Totalizar saldo por cliente:");
    var cpfCliente = input('Digite o CPF do cliente: ');
    var total = banco.totalizarSaldoCliente(cpfCliente);
    console.log("Total: " + total);
}
main();
