"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaCorrente = exports.ContaImposto = exports.Poupanca = exports.Banco = exports.Conta = exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(id, nome, cpf, data_nascimento) {
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._data_nascimento = data_nascimento;
        this._contas = [];
    }
    Object.defineProperty(Cliente.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "data_nascimento", {
        get: function () {
            return this._data_nascimento;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "cpf", {
        get: function () {
            return this._cpf;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "contas", {
        get: function () {
            return this._contas;
        },
        set: function (contas) {
            this._contas = contas;
        },
        enumerable: false,
        configurable: true
    });
    return Cliente;
}());
exports.Cliente = Cliente;
var Conta = /** @class */ (function () {
    function Conta(numero, saldoInicial) {
        this._numero = numero;
        this._saldo = saldoInicial;
        this._id = 0;
    }
    Conta.prototype.sacar = function (valor) {
        if (this._saldo >= valor) {
            this._saldo = this._saldo - valor;
            return true;
        }
        return false;
    };
    Conta.prototype.depositar = function (valor) {
        this._saldo = this._saldo + valor;
    };
    Conta.prototype.consultarSaldo = function () {
        return this._saldo;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        if (!(this.sacar(valor))) {
            throw new Error("Saldo insuficiente.");
        }
        try {
            contaDestino.depositar(valor);
            return true;
        }
        catch (erro) {
            if (erro instanceof Error) {
                console.error("Erro durante a transfer\u00EAncia: ".concat(erro.message));
            }
            else {
                console.error("Um erro desconhecido ocorreu durante a transferência.", erro);
            }
        }
        return false;
    };
    Object.defineProperty(Conta.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "numero", {
        get: function () {
            return this._numero;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "saldo", {
        get: function () {
            return this._saldo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "cliente", {
        get: function () {
            return this._cliente;
        },
        set: function (cliente) {
            this._cliente = cliente;
        },
        enumerable: false,
        configurable: true
    });
    return Conta;
}());
exports.Conta = Conta;
var Banco = /** @class */ (function () {
    function Banco() {
        this._contas = [];
        this._clientes = [];
        this._idClienteAtual = 0;
        this._idContaAtual = 0;
    }
    Object.defineProperty(Banco.prototype, "contas", {
        get: function () {
            return this._contas;
        },
        enumerable: false,
        configurable: true
    });
    Banco.prototype.inserirConta = function (numero, tipo, saldoInicial, taxaDeJuros_or_imposto, limiteChequeEspecial, taxaManutencao) {
        if (tipo === void 0) { tipo = 'conta'; }
        var contaExistente = false;
        for (var i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                console.log("Conta j\u00E1 cadastrada anteriomente!: ".concat(numero));
                contaExistente = true;
                break;
            }
        }
        if (!contaExistente) {
            var conta = void 0;
            if (tipo === 'poupanca' && taxaDeJuros_or_imposto !== undefined) {
                conta = new Poupanca(numero, saldoInicial, taxaDeJuros_or_imposto);
            }
            else if (tipo === 'contaImposto' && taxaDeJuros_or_imposto) {
                conta = new ContaImposto(numero, saldoInicial, taxaDeJuros_or_imposto);
            }
            else if (tipo === 'contaCorrente' && limiteChequeEspecial !== undefined && taxaManutencao !== undefined) {
                conta = new ContaCorrente(numero, saldoInicial, limiteChequeEspecial, taxaManutencao);
            }
            else {
                conta = new Conta(numero, saldoInicial);
            }
            conta.id = this._idContaAtual++;
            this._contas.push(conta);
            console.log("Conta cadastrada com sucesso!");
        }
    };
    Banco.prototype.inserirCliente = function (cliente) {
        cliente.id = this._idClienteAtual++;
        this._clientes.push(cliente);
    };
    Banco.prototype.consultar = function (numero) {
        var contaProcurada;
        for (var _i = 0, _a = this._contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    };
    Banco.prototype.consultarPorIndice = function (numero) {
        var indiceProcurado = -1;
        for (var i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    };
    Banco.prototype.consultarPorCpf = function (cpf) {
        var clienteProcurado;
        for (var _i = 0, _a = this._clientes; _i < _a.length; _i++) {
            var cliente = _a[_i];
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
                break;
            }
        }
        return clienteProcurado;
    };
    Banco.prototype.excluirConta = function (numero) {
        var indiceProcurado = this.consultarPorIndice(numero);
        var conta = this.consultar(numero);
        if (!conta) {
            console.log("Conta não encontrada.");
            return;
        }
        if (conta.cliente) {
            conta.cliente.contas = conta.cliente.contas.filter(function (contacliente) { return contacliente.numero != numero; });
        }
        if (indiceProcurado != -1) {
            for (var i = indiceProcurado; i < this._contas.length - 1; i++) {
                this._contas[i] = this._contas[i + 1];
            }
            this._contas.pop();
        }
    };
    //Questão 2, exercício 05:
    // Opção 1. Excluir as contas do cliente:
    Banco.prototype.excluirCliente = function (cpf) {
        var cliente = this.consultarPorCpf(cpf);
        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }
        // Excluir as contas do cliente
        for (var _i = 0, _a = cliente.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            this.excluirConta(conta.numero);
        }
        //Excluindo o cliente
        this._clientes = this._clientes.filter(function (cli) { return cli.cpf != cpf; });
        console.log("Cliente ".concat(cliente.nome, " excluido com sucesso"));
    };
    /*Opção 2: Somente desassociar a conta do cliente:
      excluirCliente2(cpf: string): void {
         const cliente = this.consultarPorCpf(cpf);
         if (!cliente) {
             console.log("Cliente não encontrado.");
             return;
         }
 
         // Desassociar contas do cliente
         for (const conta of cliente.contas) {
             conta.cliente = null; // Remove a referência ao cliente
         }
 
         //Removendo o cliente da lista
         this.clientes = this.clientes.filter(cli => cli.cpf != cpf)
          console.log(`Cliente ${cliente.nome} excluido com sucesso`)
     }
     }*/
    Banco.prototype.listarContasSemCliente = function () {
        var contasSemCliente = [];
        for (var _i = 0, _a = this._contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            if (!conta.cliente) {
                contasSemCliente.push(conta);
            }
        }
        return contasSemCliente;
    };
    Banco.prototype.atribuirTitularidade = function (numeroConta, cpfCliente) {
        var conta = this.consultar(numeroConta);
        var cliente = this.consultarPorCpf(cpfCliente);
        if (!conta) {
            console.log("Conta não encontrada.");
            return;
        }
        if (conta.cliente) {
            console.log("Esta conta já possui um cliente associado.");
            return;
        }
        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }
        conta.cliente = cliente;
        cliente.contas.push(conta);
        console.log("Conta ".concat(numeroConta, " associada ao cliente ").concat(cliente.nome, " com sucesso."));
    };
    Banco.prototype.depositar = function (numero, valor) {
        var contaProcurada = this.consultar(numero);
        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
        else {
            console.log("Conta não encontrada");
        }
    };
    Banco.prototype.consultarSaldo = function () {
        var saldo = this.consultarSaldo();
        return saldo;
    };
    Banco.prototype.alterar = function (conta) {
        var indice = this.consultarPorIndice(conta.numero);
        if (indice != -1) {
            this._contas[indice] = conta;
        }
        else {
            console.log("Conta não encontrada!");
        }
    };
    Banco.prototype.jaAssociados = function (cliente, conta) {
        var jaExiste = false;
        if (conta.cliente != null) {
            if (conta.cliente.cpf == cliente.cpf) {
                jaExiste = true;
            }
            else {
                for (var _i = 0, _a = cliente.contas; _i < _a.length; _i++) {
                    var contaAssociada = _a[_i];
                    if (contaAssociada.numero == conta.numero) {
                        jaExiste = true;
                    }
                }
            }
        }
        return jaExiste;
    };
    /*public associarContaCliente(numeroConta: string, cpf: string): void {
        const clienteProcurado = this.consultarPorCpf(cpf);
        const contaProcurada = this.consultar(numeroConta);

        if (clienteProcurado && contaProcurada) {
            if (!this.jaAssociados(clienteProcurado, contaProcurada)) {
                // Verifica se a conta já está associada ao cliente
                contaProcurada.cliente = clienteProcurado;
                clienteProcurado.contas.push(contaProcurada);
                console.log("Conta associada ao cliente com sucesso.");

            } else {
                console.log("A conta já está associada ao cliente!");
            }
        } else {
            console.log("Ocorreu um erro!");
        }
    }*/
    Banco.prototype.totalizarSaldoCliente = function (cpf) {
        var clienteProcurado = this.consultarPorCpf(cpf);
        var total = 0;
        if (clienteProcurado) {
            for (var _i = 0, _a = clienteProcurado.contas; _i < _a.length; _i++) {
                var conta = _a[_i];
                total += conta.saldo;
            }
        }
        return total;
    };
    Banco.prototype.listarContasCliente = function (cpf) {
        var clienteProcurado = this.consultarPorCpf(cpf);
        var contas = [];
        if (clienteProcurado) {
            contas = clienteProcurado.contas;
        }
        return contas;
    };
    Banco.prototype.transferir = function (numeroOrigem, numeroDestino, valor) {
        var contaOrigem = this.consultar(numeroOrigem);
        var contaDestino = this.consultar(numeroDestino);
        if (!contaOrigem) {
            throw new Error("Conta de origem ".concat(numeroOrigem, " n\u00E3o encontrada!"));
        }
        if (!contaDestino) {
            throw new Error("Conta de destino ".concat(numeroDestino, " n\u00E3o encontrada!"));
        }
        try {
            contaOrigem.transferir(contaDestino, valor);
        }
        catch (erro) {
            if (erro instanceof Error) {
                console.error("Erro durante a transfer\u00EAncia: ".concat(erro.message));
            }
            else {
                console.error("Um erro desconhecido ocorreu durante a transferência.", erro);
            }
            throw erro;
        }
    };
    Banco.prototype.transferirParaMultiplasContas = function (numeroContaOrigem, numeroContasDestino, valor) {
        var contaOrigem = this.consultar(numeroContaOrigem);
        if (!contaOrigem) {
            console.log("Conta origem não encontrada.");
            return;
        }
        for (var _i = 0, numeroContasDestino_1 = numeroContasDestino; _i < numeroContasDestino_1.length; _i++) {
            var numeroDestino = numeroContasDestino_1[_i];
            var contaDestino = this.consultar(numeroDestino);
            if (contaDestino) {
                if (contaOrigem.transferir(contaDestino, valor)) {
                    console.log("Transfer\u00EAncia de R$ ".concat(valor.toFixed(2), " da conta ").concat(numeroContaOrigem, " para ").concat(numeroDestino, " realizada com sucesso."));
                }
                else {
                    console.log("Saldo insuficiente na conta ".concat(numeroContaOrigem, " para transferir para ").concat(numeroDestino, "."));
                }
            }
            else {
                console.log("Conta de destino ".concat(numeroDestino, " n\u00E3o encontrada."));
            }
        }
    };
    Banco.prototype.transferirParaMultiplasContasLimite = function (numeroContaOrigem, ContasDestino, valor) {
        var contaOrigem = this.consultar(numeroContaOrigem);
        if ((ContasDestino.length * valor) <= contaOrigem.consultarSaldo()) {
            if (!contaOrigem) {
                console.log("Conta origem não encontrada.");
                return;
            }
            for (var _i = 0, ContasDestino_1 = ContasDestino; _i < ContasDestino_1.length; _i++) {
                var numeroDestino = ContasDestino_1[_i];
                var contaDestino = this.consultar(numeroDestino);
                if (contaDestino) {
                    if (contaOrigem.transferir(contaDestino, valor)) {
                        console.log("Transfer\u00EAncia de R$ ".concat(valor.toFixed(2), " da conta ").concat(numeroContaOrigem, " para ").concat(numeroDestino, " realizada com sucesso."));
                    }
                }
                else {
                    console.log("Conta de destino ".concat(numeroDestino, " n\u00E3o encontrada."));
                }
            }
        }
        else {
            console.log("Saldo insulficiente!");
        }
    };
    Banco.prototype.sacar = function (numeroConta, valor) {
        var contaProcurada = this.consultar(numeroConta);
        if (contaProcurada) {
            contaProcurada.sacar(valor);
            return true;
        }
        return false;
    };
    Banco.prototype.contarContas = function () {
        return this._contas.length;
    };
    Banco.prototype.calcularTotalDepositado = function () {
        var total = 0;
        for (var _i = 0, _a = this._contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            total += conta.saldo;
        }
        return total;
    };
    Banco.prototype.calcularMediaSaldos = function () {
        var totalContas = this.contarContas();
        var totalDepositado = this.calcularTotalDepositado();
        return totalContas > 0 ? totalDepositado / totalContas : 0;
    };
    Banco.prototype.clienteEstaCadastrado = function (cliente) {
        var esta = false;
        for (var i = 0; i < this._contas.length; i++) {
            if (cliente == this._clientes[i]) {
                esta = true;
            }
        }
        return esta;
    };
    Banco.prototype.contaEsta = function (conta) {
        var esta = false;
        for (var i = 0; i < this._contas.length; i++) {
            if (conta == this._contas[i]) {
                esta = true;
            }
        }
        return esta;
    };
    Banco.prototype.trocarTitularidade = function (cpfAtual, novoCpf, numeroConta) {
        var conta = this.consultar(numeroConta);
        var clienteAtual = this.consultarPorCpf(cpfAtual);
        var novoCliente = this.consultarPorCpf(novoCpf);
        if (!conta || !clienteAtual || !novoCliente) {
            console.log("Conta, cliente atual ou novo cliente não encontrados.");
            return;
        }
        //Removendo a conta do cliente atual
        clienteAtual.contas = clienteAtual.contas.filter(function (contaCliente) { return contaCliente.numero != conta.numero; });
        //Associando a conta ao novo cliente
        conta.cliente = novoCliente;
        novoCliente.contas.push(conta);
        console.log("Titularidade da conta ".concat(numeroConta, " transferida de ").concat(clienteAtual.nome, " para ").concat(novoCliente.nome, "."));
    };
    Banco.prototype.renderJuros = function (numero) {
        var conta = this.consultar(numero);
        if (conta) {
            if (conta instanceof Poupanca) {
                var juros = conta.saldo * conta.taxaDejuros / 100;
                conta.depositar(juros);
                console.log("Sucesso!");
            }
            else {
                console.log("A conta não é do tipo poupança.");
            }
        }
        else {
            console.log("Conta inexistente!");
        }
    };
    return Banco;
}());
exports.Banco = Banco;
var Poupanca = /** @class */ (function (_super) {
    __extends(Poupanca, _super);
    function Poupanca(numero, saldo, taxaDeJuros) {
        var _this = _super.call(this, numero, saldo) || this;
        _this._taxaDeJuros = taxaDeJuros;
        return _this;
    }
    Object.defineProperty(Poupanca.prototype, "taxaDejuros", {
        get: function () {
            return this._taxaDeJuros;
        },
        enumerable: false,
        configurable: true
    });
    return Poupanca;
}(Conta));
exports.Poupanca = Poupanca;
var ContaImposto = /** @class */ (function (_super) {
    __extends(ContaImposto, _super);
    function ContaImposto(numero, saldo, taxaDeImposto) {
        var _this = _super.call(this, numero, saldo) || this;
        _this._taxaDeImposto = taxaDeImposto;
        return _this;
    }
    Object.defineProperty(ContaImposto.prototype, "taxaDejuros", {
        get: function () {
            return this._taxaDeImposto;
        },
        enumerable: false,
        configurable: true
    });
    ContaImposto.prototype.sacar = function (valor) {
        var imposto = valor * (this._taxaDeImposto / 100);
        var totalSaque = valor + imposto;
        _super.prototype.sacar.call(this, totalSaque);
        return true;
    };
    return ContaImposto;
}(Conta));
exports.ContaImposto = ContaImposto;
var ContaCorrente = /** @class */ (function (_super) {
    __extends(ContaCorrente, _super);
    function ContaCorrente(numero, saldoInicial, limiteChequeEspecial, taxaManutencao) {
        var _this = _super.call(this, numero, saldoInicial) || this;
        _this._limiteChequeEspecial = limiteChequeEspecial;
        _this._taxaManutencao = taxaManutencao;
        return _this;
    }
    Object.defineProperty(ContaCorrente.prototype, "limiteChequeEspecial", {
        get: function () {
            return this._limiteChequeEspecial;
        },
        set: function (limite) {
            this._limiteChequeEspecial = limite;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContaCorrente.prototype, "taxaManutencao", {
        get: function () {
            return this._taxaManutencao;
        },
        enumerable: false,
        configurable: true
    });
    ContaCorrente.prototype.sacar = function (valor) {
        var saldoDisponivel = this.saldo + this._limiteChequeEspecial;
        if (saldoDisponivel >= valor) {
            _super.prototype.sacar.call(this, valor);
            return true;
        }
        return false;
    };
    ContaCorrente.prototype.cobrarTaxaManutencao = function () {
        this.sacar(this._taxaManutencao);
    };
    return ContaCorrente;
}(Conta));
exports.ContaCorrente = ContaCorrente;
/*
const banco = new Banco();

// Criar um cliente
const cliente = new Cliente(1, "João", "123.456.789-00", new Date("2000-01-01"));
banco.inserirCliente(cliente);


// Criar uma conta corrente
banco.inserirConta("1234-5", 'conta', 1000, undefined)
banco.inserirConta("4321-5", 'conta', 1000, undefined)
//Associar a conta ao cliente
banco.atribuirTitularidade('1234-5', cliente.cpf)


banco.transferir("1234-5","4321-5",1020)
console.log(banco.contas)*/ 
