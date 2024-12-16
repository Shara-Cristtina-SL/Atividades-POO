export class Cliente {
    id: number;
    nome: string;
    cpf: string;
    data_nascimento: Date;
    contas: Conta[];

    constructor(id: number, nome: string, cpf: string, data_nascimento: Date) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.contas = [];
    }
}
export class Conta {
    numero: string;
    saldo: number;
    id: number;
    cliente !: Cliente;

    constructor(numero: string, saldoInicial: number) {
        this.numero = numero;
        this.saldo = saldoInicial;
        this.id = 0;
    }
    sacar(valor: number): boolean {
        if (this.saldo >= valor) {
            this.saldo = this.saldo - valor;
            return true;
        }
        return false;
    }
    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }
    consultarSaldo(): number {
        return this.saldo;
    }
    transferir(contaDestino: Conta, valor: number): boolean {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true
        }
        return false
    }
}

export class Banco {
    contas: Conta[];
    clientes: Cliente[];
    idClienteAtual: number;
    idContaAtual: number;

    constructor() {
        this.contas = [];
        this.clientes = [];
        this.idClienteAtual = 0;
        this.idContaAtual = 0;
    }

    inserirConta(numero: string): void {
        let contaExistente = false;
        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                console.log(`Conta já cadastrada: ${numero}`)
                contaExistente = true;
            }
        }
        if (!contaExistente) {
             let conta = new Conta(numero, 0);
            conta.id = this.idContaAtual++;
             this.contas.push(conta);
        }
    }

    inserirCliente(cliente: Cliente): void {
        cliente.id = this.idClienteAtual++
        this.clientes.push(cliente);
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            if (conta.numero == numero ) {
                contaProcurada = conta;
                console.log("Consulta pronta!")
                break;
            }
        }
        return contaProcurada;
    }

    consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i
                break;
            }
        }
        return indiceProcurado;
    }

    consultarPorCpf(cpf: string): Cliente {
        let clienteProcurado!: Cliente;

        for (let cliente of this.clientes) {
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
    excluirConta(numero: string): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);
        const conta = this.consultar(numero);

         if (!conta) {
            console.log("Conta não encontrada.");
            return;
        }
        
        if(conta.cliente){
           conta.cliente.contas =  conta.cliente.contas.filter(contacliente => contacliente.numero != numero)
        }
        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }
    //Questão 2, exercício 05:
    // Opção 1. Excluir as contas do cliente:
     excluirCliente(cpf: string): void {
        const cliente = this.consultarPorCpf(cpf);
        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }

        // Excluir as contas do cliente
        for(const conta of cliente.contas){
            this.excluirConta(conta.numero)
        }

       //Excluindo o cliente
        this.clientes = this.clientes.filter(cli => cli.cpf != cpf)
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
        for (const conta of this.contas) {
            if (!conta.cliente) {
                contasSemCliente.push(conta);
            }
        }
        return contasSemCliente;
    }


    atribuirTitularidade(numeroConta: string, cpfCliente: string): void {
        const conta = this.consultar(numeroConta);
        const cliente = this.consultarPorCpf(cpfCliente);
        
        if (!conta) {
            console.log("Conta não encontrada.");
            return;
        }

        if(conta.cliente){
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


    depositar(numero: string, valor: number): void {
        const contaProcurada: Conta = this.consultar(numero);
        if (contaProcurada) {
            contaProcurada.depositar(valor);
        } else {
            console.log("Conta não encontrada");
        }

    }

    consultarSaldo(): number{
        let saldo = this.consultarSaldo()

        return saldo
    }

    alterar(conta: Conta): void {
        let indice = this.consultarPorIndice(conta.numero);
        if (indice != -1) {
            this.contas[indice] = conta;
        } else {
            console.log("Conta não encontrada!")
        }
    }

    jaAssociados(cliente: Cliente, conta: Conta): boolean {
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
    associarContaCliente(numeroConta: string, cpf: string): void {
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
    }

    totalizarSaldoCliente(cpf: string): number {
        let clienteProcurado: Cliente = this.consultarPorCpf(cpf);
        let total: number = 0;
        if (clienteProcurado) {
            for (let conta of clienteProcurado.contas) {
                total += conta.saldo
            }
        }

        return total;
    }

    listarContasCliente(cpf: string): Conta[] {
        let clienteProcurado: Cliente = this.consultarPorCpf(cpf);
        let contas: Conta[] = [];

        if (clienteProcurado) {
            contas = clienteProcurado.contas;
        }
        return contas;
    }

    transferir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numeroOrigem);
        let contaDestino: Conta = this.consultar(numeroDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }

    transferirParaMultiplasContas(numeroContaOrigem: string, numeroContasDestino: string[], valor: number): void {
        const contaOrigem = this.consultar(numeroContaOrigem);

        if (!contaOrigem) {
            console.log("Conta origem não encontrada.");
            return;
        }

        for (const numeroDestino of numeroContasDestino) {
            const contaDestino = this.consultar(numeroDestino);
            if (contaDestino) {
                if (contaOrigem.transferir(contaDestino, valor)) {
                    console.log(`Transferência de ${valor} da conta ${numeroContaOrigem} para ${numeroDestino} realizada com sucesso.`);
                } else {
                    console.log(`Saldo insuficiente na conta ${numeroContaOrigem} para transferir para ${numeroDestino}.`);
                }
            } else {
                console.log(`Conta de destino ${numeroDestino} não encontrada.`);
            }
        }
    }

    sacar(numeroConta: string, valor: number): void {
        let contaProcurada: Conta = this.consultar(numeroConta);

        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    }

    contarContas(): number {
        return this.contas.length;
    }

    calcularTotalDepositado(): number {
        let total: number = 0;
        for (const conta of this.contas) {
            total += conta.saldo;
        }
        return total;
    }

    calcularMediaSaldos(): number {
        const totalContas = this.contarContas();
        const totalDepositado = this.calcularTotalDepositado();
        return totalContas > 0 ? totalDepositado / totalContas : 0;
    }

    clienteEstaCadastrado(cliente: Cliente): boolean{
        let esta = false;
        for(let i = 0; i < this.contas.length; i++){
            if(cliente == this.clientes[i]){
                esta = true;
            }
        }
        return esta
       }

       contaEsta(conta: Conta): boolean{
        let esta = false;
        for(let i = 0; i < this.contas.length; i++){
            if(conta == this.contas[i]){
                esta = true;
            }
        }
        return esta
       }

       trocarTitularidade(cpfAtual: string, novoCpf: string, numeroConta: string): void {
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
}

//const banco = new Banco();