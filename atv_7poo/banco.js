"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = exports.Conta = exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(id, nome, cpf, data_nascimento) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.contas = [];
    }
    return Cliente;
}());
exports.Cliente = Cliente;
var Conta = /** @class */ (function () {
    function Conta(numero, saldoInicial) {
        this.numero = numero;
        this.saldo = saldoInicial;
        this.id = 0;
    }
    Conta.prototype.sacar = function (valor) {
        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
            return true;
        }
        return false;
    };
    Conta.prototype.depositar = function (valor) {
        this.saldo = this.saldo + valor;
    };
    Conta.prototype.consultarSaldo = function () {
        return this.saldo;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    };
    return Conta;
}());
exports.Conta = Conta;
var Banco = /** @class */ (function () {
    function Banco() {
        this.contas = [];
        this.clientes = [];
        this.idClienteAtual = 0;
        this.idContaAtual = 0;
    }
    Banco.prototype.inserirConta = function (numero) {
        var contaExistente = false;
        for (var i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                console.log("Conta j\u00E1 cadastrada: ".concat(numero));
                contaExistente = true;
            }
        }
        if (!contaExistente) {
            var conta = new Conta(numero, 0);
            conta.id = this.idContaAtual++;
            this.contas.push(conta);
        }
    };
    Banco.prototype.inserirCliente = function (cliente) {
        cliente.id = this.idClienteAtual++;
        this.clientes.push(cliente);
    };
    Banco.prototype.consultar = function (numero) {
        var contaProcurada;
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            if (conta.numero == numero) {
                contaProcurada = conta;
                console.log("Consulta pronta!");
                break;
            }
        }
        return contaProcurada;
    };
    Banco.prototype.consultarPorIndice = function (numero) {
        var indiceProcurado = -1;
        for (var i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    };
    Banco.prototype.consultarPorCpf = function (cpf) {
        var clienteProcurado;
        for (var _i = 0, _a = this.clientes; _i < _a.length; _i++) {
            var cliente = _a[_i];
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
                break;
            }
        }
        return clienteProcurado;
    };
    /*Questão 3, exercício 05:
    Mantém a consistência dos dados: Garante que a lista de contas do cliente
     reflita a realidade (ou seja, que não inclua a conta que foi excluída)
    É a abordagem mais comum e recomendada na maioria dos cenários. Ela garante
    a consistência dos dados e não adiciona complexidade desnecessária*/
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
            for (var i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
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
        this.clientes = this.clientes.filter(function (cli) { return cli.cpf != cpf; });
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
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
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
            this.contas[indice] = conta;
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
    Banco.prototype.associarContaCliente = function (numeroConta, cpf) {
        var clienteProcurado = this.consultarPorCpf(cpf);
        var contaProcurada = this.consultar(numeroConta);
        if (clienteProcurado && contaProcurada) {
            if (!this.jaAssociados(clienteProcurado, contaProcurada)) {
                // Verifica se a conta já está associada ao cliente
                contaProcurada.cliente = clienteProcurado;
                clienteProcurado.contas.push(contaProcurada);
                console.log("Conta associada ao cliente com sucesso.");
            }
            else {
                console.log("A conta já está associada ao cliente!");
            }
        }
        else {
            console.log("Ocorreu um erro!");
        }
    };
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
        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
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
                    console.log("Transfer\u00EAncia de ".concat(valor, " da conta ").concat(numeroContaOrigem, " para ").concat(numeroDestino, " realizada com sucesso."));
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
    Banco.prototype.sacar = function (numeroConta, valor) {
        var contaProcurada = this.consultar(numeroConta);
        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    };
    Banco.prototype.contarContas = function () {
        return this.contas.length;
    };
    Banco.prototype.calcularTotalDepositado = function () {
        var total = 0;
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
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
        for (var i = 0; i < this.contas.length; i++) {
            if (cliente == this.clientes[i]) {
                esta = true;
            }
        }
        return esta;
    };
    Banco.prototype.contaEsta = function (conta) {
        var esta = false;
        for (var i = 0; i < this.contas.length; i++) {
            if (conta == this.contas[i]) {
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
    return Banco;
}());
exports.Banco = Banco;
//const banco = new Banco();
