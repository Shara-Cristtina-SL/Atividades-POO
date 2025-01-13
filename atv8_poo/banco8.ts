export class Cliente {
    private _id: number;
    private _nome: string;
    private _cpf: string;
    private _data_nascimento: Date;
    private _contas: Conta[];

    constructor(id: number, nome: string, cpf: string, data_nascimento: Date) {
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._data_nascimento = data_nascimento;
        this._contas = [];
    }

    public set id(id: number) {
        this._id = id;
    }
    public get id(): number {
        return this._id;
    }
    public get data_nascimento(): Date {
        return this._data_nascimento
    }
    public get nome(): string {
        return this._nome;
    }
    public get cpf(): string {
        return this._cpf;
    }
    public get contas(): Conta[] {
        return this._contas
    }
    public set contas(contas: Conta[]) {
        this._contas = contas;
    }
}
export class Conta {
    private _numero: string;
    private _saldo: number;
    private _id: number;
    private _cliente !: Cliente;

    constructor(numero: string, saldoInicial: number) {
        this._numero = numero;
        this._saldo = saldoInicial;
        this._id = 0;
    }
    sacar(valor: number): boolean {
        if (this._saldo >= valor) {
            this._saldo = this._saldo - valor;
            return true;
        }
        return false;
    }
    depositar(valor: number): void {
        this._saldo = this._saldo + valor;
    }
    consultarSaldo(): number {
        return this._saldo;
    }
    transferir(contaDestino: Conta, valor: number): boolean {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true
        }
        return false
    }

    public get id(): number {
        return this._id
    }

    public set id(id: number) {
        this._id = id;
    }

    public get numero(): string {
        return this._numero
    }

    public get saldo(): number {
        return this._saldo;
    }

    public get cliente(): Cliente {
        return this._cliente
    }

    public set cliente(cliente: Cliente) {
        this._cliente = cliente;
    }
}

export class Banco {
    private _contas: Conta[];
    private _clientes: Cliente[];
    private _idClienteAtual: number;
    private _idContaAtual: number;

    constructor() {
        this._contas = [];
        this._clientes = [];
        this._idClienteAtual = 0;
        this._idContaAtual = 0;
    }

    public inserirConta(numero: string, tipo: 'conta' | 'poupanca' = 'conta', taxaDeJuros?: number): void {
        let contaExistente = false;
        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                console.log(`Conta já cadastrada anteriomente!: ${numero}`);
                contaExistente = true;
                break;
            }
        }
        if (!contaExistente) {
            let conta: Conta;
            if (tipo === 'poupanca' && taxaDeJuros !== undefined) {
                conta = new Poupanca(numero, 0, taxaDeJuros);
            } else {
                conta = new Conta(numero, 0);
            }
            conta.id = this._idContaAtual++;
            this._contas.push(conta);
            console.log("Conta cadastrada com sucesso!");

        }
    }
    public inserirCliente(cliente: Cliente): void {
        cliente.id = this._idClienteAtual++
        this._clientes.push(cliente);
    }

    public consultar(numero: string): Conta | Poupanca {
        let contaProcurada!: Conta | Poupanca;

        for (let conta of this._contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    }

    private consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i
                break;
            }
        }
        return indiceProcurado;
    }

    public consultarPorCpf(cpf: string): Cliente {
        let clienteProcurado!: Cliente;

        for (let cliente of this._clientes) {
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
                break;
            }
        }

        return clienteProcurado;
    }
    /*Questão 3, exercício 05:
    Mantém a consistência dos dados: Garante que a lista de contas do cliente
     reflita a realidade (ou seja, que não inclua a conta que foi excluída)
    É a abordagem mais comum e recomendada na maioria dos cenários. Ela garante 
    a consistência dos dados e não adiciona complexidade desnecessária*/
    public excluirConta(numero: string): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);
        const conta = this.consultar(numero);

        if (!conta) {
            console.log("Conta não encontrada.");
            return;
        }

        if (conta.cliente) {
            conta.cliente.contas = conta.cliente.contas.filter(contacliente => contacliente.numero != numero)
        }
        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this._contas.length - 1; i++) {
                this._contas[i] = this._contas[i + 1];
            }
            this._contas.pop();
        }
    }
    //Questão 2, exercício 05:
    // Opção 1. Excluir as contas do cliente:
    public excluirCliente(cpf: string): void {
        const cliente = this.consultarPorCpf(cpf);
        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }

        // Excluir as contas do cliente
        for (const conta of cliente.contas) {
            this.excluirConta(conta.numero)
        }

        //Excluindo o cliente
        this._clientes = this._clientes.filter(cli => cli.cpf != cpf)
        console.log(`Cliente ${cliente.nome} excluido com sucesso`)
    }
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

    listarContasSemCliente(): Conta[] {
        const contasSemCliente: Conta[] = [];
        for (const conta of this._contas) {
            if (!conta.cliente) {
                contasSemCliente.push(conta);
            }
        }
        return contasSemCliente;
    }


    public atribuirTitularidade(numeroConta: string, cpfCliente: string): void {
        const conta = this.consultar(numeroConta);
        const cliente = this.consultarPorCpf(cpfCliente);

        if (!conta) {
            console.log("Conta não encontrada.");
            return;
        }

        if (conta.cliente) {
            console.log("Esta conta já possui um cliente associado.")
            return
        }

        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }
        conta.cliente = cliente;
        cliente.contas.push(conta);
        console.log(`Conta ${numeroConta} associada ao cliente ${cliente.nome} com sucesso.`)
    }


    public depositar(numero: string, valor: number): void {
        const contaProcurada: Conta = this.consultar(numero);
        if (contaProcurada) {
            contaProcurada.depositar(valor);
        } else {
            console.log("Conta não encontrada");
        }

    }

    public consultarSaldo(): number {
        let saldo = this.consultarSaldo()

        return saldo
    }

    public alterar(conta: Conta): void {
        let indice = this.consultarPorIndice(conta.numero);
        if (indice != -1) {
            this._contas[indice] = conta;
        } else {
            console.log("Conta não encontrada!")
        }
    }

    private jaAssociados(cliente: Cliente, conta: Conta): boolean {
        let jaExiste: boolean = false;

        if (conta.cliente != null) {
            if (conta.cliente.cpf == cliente.cpf) {
                jaExiste = true;
            } else {
                for (let contaAssociada of cliente.contas) {
                    if (contaAssociada.numero == conta.numero) {
                        jaExiste = true;
                    }
                }
            }
        }

        return jaExiste;
    }
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

    public totalizarSaldoCliente(cpf: string): number {
        let clienteProcurado: Cliente = this.consultarPorCpf(cpf);
        let total: number = 0;
        if (clienteProcurado) {
            for (let conta of clienteProcurado.contas) {
                total += conta.saldo
            }
        }

        return total;
    }

    public listarContasCliente(cpf: string): Conta[] {
        let clienteProcurado: Cliente = this.consultarPorCpf(cpf);
        let contas: Conta[] = [];

        if (clienteProcurado) {
            contas = clienteProcurado.contas;
        }
        return contas;
    }

    public transferir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numeroOrigem);
        let contaDestino: Conta = this.consultar(numeroDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }

    public transferirParaMultiplasContas(numeroContaOrigem: string, numeroContasDestino: string[], valor: number): void {
        const contaOrigem = this.consultar(numeroContaOrigem);

        if (!contaOrigem) {
            console.log("Conta origem não encontrada.");
            return;
        }

        for (const numeroDestino of numeroContasDestino) {
            const contaDestino = this.consultar(numeroDestino);
            if (contaDestino) {
                if (contaOrigem.transferir(contaDestino, valor)) {
                    console.log(`Transferência de R$ ${valor.toFixed(2)} da conta ${numeroContaOrigem} para ${numeroDestino} realizada com sucesso.`);
                } else {
                    console.log(`Saldo insuficiente na conta ${numeroContaOrigem} para transferir para ${numeroDestino}.`);
                }
            } else {
                console.log(`Conta de destino ${numeroDestino} não encontrada.`);
            }
        }
    }

    public transferirParaMultiplasContasLimite(numeroContaOrigem: string, ContasDestino: string[], valor: number): void {
        const contaOrigem = this.consultar(numeroContaOrigem);
        if ((ContasDestino.length * valor) <= contaOrigem.consultarSaldo()) {
            if (!contaOrigem) {
                console.log("Conta origem não encontrada.");
                return;
            }

            for (const numeroDestino of ContasDestino) {
                const contaDestino = this.consultar(numeroDestino);
                if (contaDestino) {
                    if (contaOrigem.transferir(contaDestino, valor)) {
                        console.log(`Transferência de R$ ${valor.toFixed(2)} da conta ${numeroContaOrigem} para ${numeroDestino} realizada com sucesso.`);
                    }
                } else {
                    console.log(`Conta de destino ${numeroDestino} não encontrada.`);
                }
            }
        } else {
            console.log("Saldo insulficiente!")
        }
    }

    public sacar(numeroConta: string, valor: number): void {
        let contaProcurada: Conta = this.consultar(numeroConta);

        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    }

    contarContas(): number {
        return this._contas.length;
    }

    public calcularTotalDepositado(): number {
        let total: number = 0;
        for (const conta of this._contas) {
            total += conta.saldo;
        }
        return total;
    }

    public calcularMediaSaldos(): number {
        const totalContas = this.contarContas();
        const totalDepositado = this.calcularTotalDepositado();
        return totalContas > 0 ? totalDepositado / totalContas : 0;
    }

    public clienteEstaCadastrado(cliente: Cliente): boolean {
        let esta = false;
        for (let i = 0; i < this._contas.length; i++) {
            if (cliente == this._clientes[i]) {
                esta = true;
            }
        }
        return esta
    }

    public contaEsta(conta: Conta): boolean {
        let esta = false;
        for (let i = 0; i < this._contas.length; i++) {
            if (conta == this._contas[i]) {
                esta = true;
            }
        }
        return esta
    }

    public trocarTitularidade(cpfAtual: string, novoCpf: string, numeroConta: string): void {
        const conta = this.consultar(numeroConta);
        const clienteAtual = this.consultarPorCpf(cpfAtual);
        const novoCliente = this.consultarPorCpf(novoCpf);

        if (!conta || !clienteAtual || !novoCliente) {
            console.log("Conta, cliente atual ou novo cliente não encontrados.");
            return;
        }
        //Removendo a conta do cliente atual
        clienteAtual.contas = clienteAtual.contas.filter(contaCliente => contaCliente.numero != conta.numero)

        //Associando a conta ao novo cliente
        conta.cliente = novoCliente;
        novoCliente.contas.push(conta);

        console.log(`Titularidade da conta ${numeroConta} transferida de ${clienteAtual.nome} para ${novoCliente.nome}.`);

    }

    public renderJuros(numero: string): void {
        let conta = this.consultar(numero);
        if (conta) {
            if (conta instanceof Poupanca) {
                let juros: number = conta.saldo * conta.taxaDejuros / 100;
                conta.depositar(juros);
                console.log("Sucesso!");

            } else {
                console.log("A conta não é do tipo poupança.");
            }
        } else {
            console.log("Conta inexistente!");
        }
    }
}

export class Poupanca extends Conta {
    private _taxaDeJuros: number;

    constructor(numero: string, saldo: number, taxaDeJuros: number) {
        super(numero, saldo);
        this._taxaDeJuros = taxaDeJuros;
    }

    get taxaDejuros(): number {
        return this._taxaDeJuros;
    }
}

/*let banco: Banco = new Banco();

banco.inserirConta("1");
banco.inserirConta("2", 'poupanca', 10);

banco.depositar("1", 100);
banco.depositar("2", 200)

banco.renderJuros("2");
console.log(banco.consultar("2"));


banco.inserirConta("1");

banco.inserirConta("2", 'poupanca', 10); 



let banco1: Banco = new Banco();

// Cria uma conta normal
banco1.inserirConta("1");
banco1.depositar("1", 100);

// Cria uma poupança
banco1.inserirConta("2", 'poupanca', 10);
banco1.depositar("2", 200);


banco1.renderJuros("2");
console.log(banco.consultar("2"));*/