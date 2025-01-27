"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt = require("prompt-sync");
var input = prompt();
//import { readFileSync, writeFileSync,appendFile, existsSync} from 'node:fs';
var fs = require("fs");
var banco_1 = require("./banco");
var util_1 = require("./util");
var console_1 = require("console");
var BancoApp = /** @class */ (function () {
    function BancoApp() {
        this.banco = new banco_1.Banco();
    }
    BancoApp.prototype.run = function () {
        var opcao = '';
        do {
            console.clear();
            console.log('\nBem vindo (a)! \nDigite uma opção:');
            console.log('Contas:\n');
            console.log(this.menu('1'));
            console.log('Clientes:\n');
            console.log(this.menu('2'));
            opcao = String((0, util_1.getNumberInRange)(Number(input("Opção: ")), 0, 17));
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
                    console.log("Opção inválida.");
            }
            if (opcao != "0") {
                input("Operação finalizada. Digite <enter>");
            }
        } while (opcao != "0");
        console.log("Aplicação encerrada");
    };
    BancoApp.prototype.menu = function (opcoes) {
        if (opcoes == '1') {
            return "\n            1- Inserir conta\n            2- Consultar\n            3- Sacar\n            4- Depositar\n            5- Excluir\n            6- Transferir\n            7- Transferir p/ multiplas contas (at\u00E9 onde saldo permitir)\n            8- Transferir p/ multiplas contas (se saldo for suficiente)\n            9- Totaliza\u00E7\u00F5es\n            10- Render juros da poupan\u00E7a\n            11- Criar arquivo txt para salvar contas ao fim do processo \n\n            12- Cadastrar contas em arquivo txt //Incompleto\n            ";
        }
        else if (opcoes == '2') {
            return "\n            13-   Inserir Cliente\n            14-  Consultar\n            15-  Atribuir titularidade de conta\n            16-  Saldo total.\n            17-  Trocar titularidade\n            18-  Listar contas sem cliente e atribuir titulariadade\n            19-  Excluir cliente\n             0-  Sair";
        }
        return "";
    };
    BancoApp.prototype.cadastrarConta = function () {
        console.log("\nCadastrar conta:");
        var numero = input('Digite o número da conta: ');
        var tipo = (0, util_1.getNumberInRange)(Number(input("Digite 1 Para conta regular, 2 para poupança, 3 com imposto e 4 para corrente: ")), 1, 4);
        var saldoInicial = validaValor(Number(input('Saldo inicial:  ')));
        if (tipo == 1) {
            this.banco.inserirConta(numero, 'conta', saldoInicial);
        }
        else if (tipo == 2) {
            var taxaDeJuros = Number(input("Taxa de juros: "));
            this.banco.inserirConta(numero, "poupanca", saldoInicial, taxaDeJuros);
        }
        else if (tipo == 3) {
            var taxaDeImposto = Number(input("Taxa de imposto: "));
            this.banco.inserirConta(numero, "contaImposto", saldoInicial, taxaDeImposto);
        }
        else {
            var limiteChequeEsp = Number(input("Valor limite do cheque especial: "));
            var taxaManutencao = Number(input("Taxa de manutenção: "));
            this.banco.inserirConta(numero, "contaCorrente", saldoInicial, undefined, limiteChequeEsp, taxaManutencao);
        }
    };
    BancoApp.prototype.sacar = function () {
        console.log("\nSaque:");
        var numero = input('Digite o número da conta: ');
        var valor = parseFloat(input('Digite o valor do saque: '));
        if (this.banco.sacar(numero, valor)) {
            console.log("Saque realizado.");
            this.exibirExtrato(numero);
        }
        else {
            console.log("Falha ao realizar saque!");
        }
    };
    BancoApp.prototype.depositar = function () {
        console.log("\nDepósito:");
        var numero = input('Digite o número da conta: ');
        var valor = parseFloat(input('Digite o valor do depósito: '));
        this.banco.depositar(numero, valor);
        console.log("Depósito realizado.");
        this.exibirExtrato(numero);
    };
    BancoApp.prototype.transferir = function () {
        console.log("\nTransferência:");
        var numeroOrigem = input('Digite o número da conta de origem: ');
        var numeroDestino = input('Digite o número da conta de destino: ');
        var valor = parseFloat(input('Digite o valor da transferência: '));
        this.banco.transferir(numeroOrigem, numeroDestino, valor);
        console.log("Transferência realizada.");
        console.log("\nExtrato da conta de origem:");
        this.exibirExtrato(numeroOrigem);
        console.log("\nExtrato da conta de destino:");
        this.exibirExtrato(numeroDestino);
    };
    BancoApp.prototype.consultarConta = function () {
        console.log("\nConsultar conta:");
        var numero = input('Digite o número da conta: ');
        var conta = this.banco.consultar(numero);
        if (conta) {
            this.exibirExtrato(numero);
        }
        else {
            console.log("Conta não encontrada.");
        }
    };
    BancoApp.prototype.exibirExtrato = function (numero) {
        var conta = this.banco.consultar(numero);
        if (this.banco.contaEsta(conta)) {
            var cliente = conta.cliente;
            console.log("\n=== Extrato da Conta ===");
            console.log("ID: ".concat(conta.id));
            if (conta instanceof banco_1.Poupanca) {
                console.log("Tipo: Poupança");
                console.log("Taxa de juros: ".concat(conta.taxaDejuros, "%"));
            }
            else if (conta instanceof banco_1.ContaImposto) {
                console.log("Tipo: Imposto");
                console.log("Taxa de imposto: ".concat(conta.taxaDejuros, "%"));
            }
            console.log("N\u00FAmero da conta: ".concat(conta.numero));
            console.log("Saldo: R$ ".concat(conta.saldo.toFixed(2)));
            if (cliente && this.banco.clienteEstaCadastrado(cliente)) {
                console.log("\n=== Dados do Cliente ===");
                console.log("ID: ".concat(cliente.id));
                console.log("Nome: ".concat(cliente.nome));
                console.log("CPF: ".concat(cliente.cpf));
                console.log("Contas associadas:");
                cliente.contas.forEach(function (c) {
                    return console.log("- Conta: ".concat(c.numero, ", Saldo: R$ ").concat(c.saldo.toFixed(2)));
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
    };
    BancoApp.prototype.excluirConta = function () {
        console.log("\nExcluir conta:");
        var numero = input('Digite o número da conta: ');
        this.banco.excluirConta(numero);
        console.log("Conta excluída com sucesso!");
    };
    BancoApp.prototype.transferirParaMultiplasContas = function () {
        var contas_lista = [];
        var numero = input("Digite o numero da conta de origem: ");
        var contas = input("Digite os números das contas separando por vígula, sem espaços:  ");
        var valor = Number(input("Digite o valor a ser transferido para as contas: "));
        contas_lista = contas.split(",");
        this.banco.transferirParaMultiplasContas(numero, contas_lista, valor);
    };
    BancoApp.prototype.transferirParaMultiplasContasLimite = function () {
        var contas_lista = [];
        var numero = input("Digite o numero da conta de origem: ");
        var contas = input("Digite os números das contas separando por vígula, sem espaços:  ");
        var valor = Number(input("Digite o valor a ser transferido para as contas: "));
        contas_lista = contas.split(",");
        this.banco.transferirParaMultiplasContasLimite(numero, contas_lista, valor);
    };
    BancoApp.prototype.totalizacoes = function () {
        console.log("\nTotalizações:");
        console.log("Quantidade de contas: ".concat(this.banco.contarContas()));
        console.log("Total depositado no banco: R$ ".concat(this.banco.calcularTotalDepositado().toFixed(2)));
        console.log("M\u00E9dia de saldo das contas: ".concat(this.banco.calcularMediaSaldos()));
    };
    BancoApp.prototype.cadastrarCliente = function () {
        var id = 0;
        console.log("\nCadastrar cliente:");
        var nome = input('Digite o nome do cliente: ');
        var cpf = input('Digite o CPF do cliente: ');
        var dataNascimento = new Date(input('Digite a data de nascimento (AAAA-MM-DD): '));
        var cliente = new banco_1.Cliente(id, nome, cpf, dataNascimento);
        this.banco.inserirCliente(cliente);
        console.log("Cliente cadastrado com sucesso!");
    };
    BancoApp.prototype.consultarCliente = function () {
        console.log("\nConsultar cliente:");
        var cpf = input('Digite o CPF do cliente: ');
        var cliente = this.banco.consultarPorCpf(cpf);
        if (cliente) {
            console.log("Cliente encontrado: ID ".concat(cliente.id, ", Nome: ").concat(cliente.nome, ", CPF: ").concat(cliente.cpf));
        }
        else {
            console.log("Cliente não encontrado.");
        }
    };
    /*private associarContaCliente(): void {
      console.log("\nAssociar conta a cliente:");
      let numeroConta: string = input('Digite o número da conta: ');
      let cpfCliente: string = input('Digite o CPF do cliente: ');
      this.banco.associarContaCliente(numeroConta, cpfCliente);
       }*/
    BancoApp.prototype.totalizarSaldoCliente = function () {
        console.log("\Totalizar saldo por cliente:");
        var cpfCliente = input('Digite o CPF do cliente: ');
        var total = this.banco.totalizarSaldoCliente(cpfCliente);
        console.log("Total: " + total);
    };
    BancoApp.prototype.trocarTitularidade = function () {
        console.log("\nTrocar Titularidade:");
        var cpfAtual = input('Digite o CPF do cliente atual: ');
        var novoCpf = input('Digite o CPF do novo cliente: ');
        var numeroConta = input('Digite o número da conta: ');
        this.banco.trocarTitularidade(cpfAtual, novoCpf, numeroConta);
    };
    BancoApp.prototype.listarContasSemCliente = function () {
        var contasSemCliente = this.banco.listarContasSemCliente();
        console.log("\nContas sem cliente:");
        contasSemCliente.forEach(function (conta) { return console.log("- N\u00FAmero da conta: ".concat(conta.numero)); });
    };
    BancoApp.prototype.atribuirTitularidade = function () {
        console.log("\nAtribuir titularidade a conta sem cliente:");
        var numeroConta = input('Digite o número da conta: ');
        var cpfCliente = input('Digite o CPF do cliente: ');
        this.banco.atribuirTitularidade(numeroConta, cpfCliente);
    };
    BancoApp.prototype.excluirCliente = function () {
        console.log("\nExcluir cliente:");
        var cpf = input('Digite o CPF do cliente a ser excluído: ');
        this.banco.excluirCliente(cpf);
    };
    BancoApp.prototype.RenderJuros = function () {
        var numero = input("Digite o número da conta: ");
        this.banco.renderJuros(numero);
        ;
    };
    BancoApp.prototype.salvarContas = function () {
        var arquivo = input('Digite o nome do arquivo com a extensão .txt: ');
        var linha = "";
        if (fs.existsSync(arquivo) == false) {
            fs.writeFileSync(arquivo, linha);
        }
        for (var _i = 0, _a = this.banco.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            if (conta instanceof banco_1.Poupanca) {
                linha += "CP;".concat(conta.numero, ";").concat(conta.saldo.toFixed(2), ";").concat(conta.taxaDejuros, "%");
                if (conta.cliente) {
                    linha += ";".concat(conta.cliente.nome, "\n");
                }
                else {
                    linha += "\n";
                }
            }
            else if (conta instanceof banco_1.ContaImposto) {
                linha += "CI;".concat(conta.numero, ";").concat(conta.saldo.toFixed(2), ";").concat(conta.taxaDejuros, "%");
                if (conta.cliente) {
                    linha += ";".concat(conta.cliente.nome, "\n");
                }
                else {
                    linha += "\n";
                }
            }
            else {
                linha += "C;".concat(conta.numero, ";").concat(conta.saldo.toFixed(2));
                if (conta.cliente) {
                    linha += ";".concat(conta.cliente.nome, "\n");
                }
                else {
                    linha += "\n";
                }
            }
        }
        fs.appendFile(arquivo, linha, function (err) {
            if (err) {
                console.error(err);
            }
        });
    };
    return BancoApp;
}());
function validaValor(valor) {
    if (valor === undefined) {
        throw new Error("Valor não pode ser undefined!");
    }
    if (valor <= 0 || (typeof valor) != 'number') {
        throw new Error("Valor inválido: deve ser maior que zero.");
    }
    try {
        return valor;
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.error("Ocorreu um erro:", erro.message);
        }
        else {
            console.error("Ocorreu um erro desconhecido:", erro);
        }
    }
    throw console_1.error;
}
var bancoApp = new BancoApp();
bancoApp.run();
