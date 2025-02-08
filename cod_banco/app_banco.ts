import * as prompt from 'prompt-sync';
const input = prompt();
import * as fs from 'fs';
import { Cliente, Banco, Poupanca, ContaImposto, ContaCorrente } from "./classes"; // Importe ContaCorrente
import { AppError, ValorInvalidoError, validaValor} from "./classe_error"; // Importe as classes de erro

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

            opcao = this.obterOpcao(); // Função para obter a opção do usuário com tratamento de erros

            switch (opcao) {
                case "1": this.cadastrarConta(); break;
                case "2": this.consultarConta(); break;
                case "3": this.sacar(); break;
                case "4": this.depositar(); break;
                case "5": this.excluirConta(); break;
                case "6": this.transferir(); break;
                case "7": this.transferirParaMultiplasContas(); break;
                case "8": this.transferirParaMultiplasContasLimite(); break;
                case "9": this.totalizacoes(); break;
                case "10": this.RenderJuros(); break;
                case "11": this.salvarContas(); break;
                case '12': /*this.cadastrarContasDeArquivo();*/ break; // Incompleto
                case '13': this.cadastrarCliente(); break;
                case "14": this.consultarCliente(); break;
                case "15": this.atribuirTitularidade(); break;
                case "16": this.totalizarSaldoCliente(); break;
                case "17": this.trocarTitularidade(); break;
                case "18": this.listarContasSemCliente(); this.atribuirTitularidade(); break;
                case "19": this.excluirCliente(); break;
                case "0": break;
                default: console.log("Opção inválida.");
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


    private obterOpcao(): string {
        while (true) {
            try {
                const inputOpcao = input("Opção: ");
                const opcao = String(Number(inputOpcao));

                if (isNaN(Number(opcao))) {
                    throw new ValorInvalidoError("Opção inválida: Digite um número.");
                }

                return opcao;

            } catch (error) {
                if (error instanceof ValorInvalidoError) {
                    console.error("Erro:", error.message);
                } else {
                    console.error("Ocorreu um erro desconhecido:", error);
                }
            }
        }
    }


    private cadastrarConta(): void {
        console.log("\nCadastrar conta:");
        const numero: string = input('Digite o número da conta: ');

        const tipoConta = this.obterTipoConta(); // Usando a função para obter o tipo com tratamento de erros

        if (isNaN(tipoConta)) {
            console.log("Cadastro de conta cancelado.");
            return; // Sai da função se o usuário cancelar
        }

        let saldoInicial: number;
        try {
            saldoInicial = this.obterValor('Saldo inicial: ');
        } catch (error) {
            console.error(error.message);
            return;
        }


        try {
            switch (tipoConta) {
                case 1: this.banco.inserirConta(numero, 'conta', saldoInicial); break;
                case 2:
                    const taxaDeJuros = this.obterValor('Taxa de juros: ');
                    this.banco.inserirConta(numero, "poupanca", saldoInicial, taxaDeJuros);
                    break;
                case 3:
                    const taxaDeImposto = this.obterValor('Taxa de imposto: ');
                    this.banco.inserirConta(numero, "contaImposto", saldoInicial, taxaDeImposto);
                    break;
                case 4:
                    const limiteChequeEsp = this.obterValor('Valor limite do cheque especial: ');
                    const taxaManutencao = this.obterValor('Taxa de manutenção: ');
                    this.banco.inserirConta(numero, "contaCorrente", saldoInicial, undefined, limiteChequeEsp, taxaManutencao);
                    break;
            }
            console.log("Conta cadastrada com sucesso!");

        } catch (error) {
            console.error("Erro ao cadastrar conta:", error.message);
        }
    }

    private obterTipoConta(): number {
        while (true) {
            try {
                const inputTipo = input("Digite 1 Para conta regular, 2 para poupança, 3 com imposto e 4 para corrente: ");
                const tipo = Number(inputTipo);

                if (isNaN(tipo)) {
                    throw new ValorInvalidoError("Entrada inválida. Digite um número.");
                }

                if (tipo < 1 || tipo > 4) {
                    throw new ValorInvalidoError("Valor inválido. Digite um número entre 1 e 4.");
                }

                return tipo;
            } catch (error) {
                if (error instanceof ValorInvalidoError) {
                    console.error("Erro:", error.message);
                } else {
                    console.error("Ocorreu um erro desconhecido:", error);
                }
            }
        }
    }

    private obterValor(mensagem: string): number {
        while (true) {
            try {
                const inputValor = input(mensagem);
                const valor = Number(inputValor);

                if (isNaN(valor) ||valor <= 0){
                    throw new ValorInvalidoError("Entrada inválida. Digite um número maior que zero.");
                }
                return valor;
            } catch (error) {
                if (error instanceof ValorInvalidoError) {
                    console.error("Erro:", error.message);
                } else {
                    console.error("Ocorreu um erro desconhecido:", error);
                }
            }
        }
    }


    private sacar(): void {
        console.log("\nSaque:");
        const numero = input('Digite o número da conta: ');
        try {
            const valor = this.obterValor('Digite o valor do saque: ');
            if (this.banco.sacar(numero, valor)) {
                console.log("Saque realizado.");
                this.exibirExtrato(numero);
            } else {
                console.log("Falha ao realizar saque!");
            }
        } catch (error) {
            console.error("Erro ao sacar:", error.message);
        }
    }

    private depositar(): void {
        console.log("\nDepósito:");
        const numero = input('Digite o número da conta: ');
        try {
            const valor = this.obterValor('Digite o valor do depósito: ');
            this.banco.depositar(numero, valor);
            console.log("Depósito realizado.");
            this.exibirExtrato(numero);
        } catch (error) {
            console.error("Erro ao depositar:", error.message);
        }
    }

    private transferir(): void {
        console.log("\nTransferência:");
        const numeroOrigem = input('Digite o número da conta de origem: ');
        const numeroDestino = input('Digite o número da conta de destino: ');
        try {
            const valor = this.obterValor('Digite o valor da transferência: ');
            this.banco.transferir(numeroOrigem, numeroDestino, valor);
            console.log("Transferência realizada.");
            console.log("\nExtrato da conta de origem:");
            this.exibirExtrato(numeroOrigem);
            console.log("\nExtrato da conta de destino:");
            this.exibirExtrato(numeroDestino);
        } catch (error) {
            console.error("Erro ao transferir:", error.message);
        }
    }


    private consultarConta(): void {
        console.log("\nConsultar conta:");
        const numero = input('Digite o número da conta: ');
        try {
            const conta = this.banco.consultar(numero);
            if (conta) {
                this.exibirExtrato(numero);
            } else {
                console.log("Conta não encontrada.");
            }
        } catch (error) {
            console.error("Erro ao consultar conta:", error.message);
        }
    }

    private exibirExtrato(numero: string): void {
        try {
            const conta = this.banco.consultar(numero);
            if (this.banco.contaEsta(conta)) {
                const cliente = conta.cliente;
                console.log("\n=== Extrato da Conta ===");
                console.log(`ID: ${conta.id}`);
                console.log(`Número da conta: ${conta.numero}`);
                console.log(`Saldo: R$ ${conta.saldo.toFixed(2)}`);

                if (conta instanceof Poupanca) {
                    console.log("Tipo: Poupança");
                    console.log(`Taxa de juros: ${conta.taxaDejuros}%`);
                } else if (conta instanceof ContaImposto) {
                    console.log("Tipo: Imposto");
                    console.log(`Taxa de imposto: ${conta.taxaDejuros}%`);
                } else if (conta instanceof ContaCorrente) {
                    console.log("Tipo: Corrente");
                    console.log(`Limite cheque especial: ${conta.limiteChequeEspecial}`);
                    console.log(`Taxa de manutenção: ${conta.taxaManutencao}`);
                }

                if (cliente && this.banco.clienteEstaCadastrado(cliente)) {
                    console.log("\n=== Dados do Cliente ===");
                    console.log(`ID: ${cliente.id}`);
                    console.log(`Nome: ${cliente.nome}`);
                    console.log(`CPF: ${cliente.cpf}`);

                    console.log("Contas associadas:");
                    cliente.contas.forEach((c) =>
                        console.log(`- Conta: <span class="math-inline">\{c\.numero\}, Saldo\: R</span> ${c.saldo.toFixed(2)}`)
                    );

                } else {
                    console.log("Cliente: Não associado.");
                }
                console.log("=========================\n");
            } else {
                console.log("Conta não encontrada para exibir extrato.");
            }
        } catch (error) {
            console.error("Erro ao exibir extrato:", error.message);
        }
    }

    private excluirConta(): void {
        console.log("\nExcluir conta:");
        const numero = input('Digite o número da conta: ');
        try {
            this.banco.excluirConta(numero);
            console.log("Conta excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir conta:", error.message);
        }
    }

    private transferirParaMultiplasContas(): void {
        let  contas_lista: string[] = [];
        const numero = input("Digite o numero da conta de origem: ");
        let  contas = input("Digite os números das contas separando por vígula, sem espaços:  ");
        try {
            const valor = this.obterValor("Digite o valor a ser transferido para as contas: ");
            contas_lista = contas.split(",");
            this.banco.transferirParaMultiplasContas(numero, contas_lista, valor);
        } catch (error) {
            console.error("Erro na transferência para múltiplas contas:", error.message);
        }
    }

    private transferirParaMultiplasContasLimite(): void {
        let contas_lista: string[] = [];
        const numero = input("Digite o numero da conta de origem: ");
        const contas = input("Digite os números das contas separando por vígula, sem espaços:  ");
        try {
            const valor = this.obterValor("Digite o valor a ser transferido para as contas: ");
            contas_lista = contas.split(",");
            this.banco.transferirParaMultiplasContasLimite(numero, contas_lista, valor);
        } catch (error) {
            console.error("Erro na transferência para múltiplas contas (limite):", error.message);
        }
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
        const nome = input('Digite o nome do cliente: ');
        const cpf = input('Digite o CPF do cliente: ');
        const dataNascimento = new Date(input('Digite a data de nascimento (AAAA-MM-DD): '));
        const cliente: Cliente = new Cliente(id, nome, cpf, dataNascimento);
        try {
            this.banco.inserirCliente(cliente);
            console.log("Cliente cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error.message);
        }
    }

    private consultarCliente(): void {
        console.log("\nConsultar cliente:");
        const cpf = input('Digite o CPF do cliente: ');
        try {
            const cliente = this.banco.consultarPorCpf(cpf);
            if (cliente) {
                console.log(`Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
            } else {
                console.log("Cliente não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao consultar cliente:", error.message);
        }
    }

    private totalizarSaldoCliente(): void {
        console.log("\Totalizar saldo por cliente:");
        const cpfCliente = input('Digite o CPF do cliente: ');
        try {
            const total = this.banco.totalizarSaldoCliente(cpfCliente);
            console.log("Total: " + total);
        } catch (error) {
            console.error("Erro ao totalizar saldo do cliente:", error.message);
        }
    }

    private trocarTitularidade(): void {
        console.log("\nTrocar Titularidade:");
        const cpfAtual = input('Digite o CPF do cliente atual: ');
        const novoCpf = input('Digite o CPF do novo cliente: ');
        const numeroConta = input('Digite o número da conta: ');
        try {
            this.banco.trocarTitularidade(cpfAtual, novoCpf, numeroConta);
        } catch (error) {
            console.error("Erro ao trocar titularidade:", error.message);
        }
    }

    private listarContasSemCliente(): void {
        const contasSemCliente = this.banco.listarContasSemCliente();
        console.log("\nContas sem cliente:");
        contasSemCliente.forEach(conta => console.log(`- Número da conta: ${conta.numero}`));
    }

    private atribuirTitularidade(): void {
        console.log("\nAtribuir titularidade a conta sem cliente:");
        const numeroConta = input('Digite o número da conta: ');
        const cpfCliente = input('Digite o CPF do cliente: ');
        try {
            this.banco.atribuirTitularidade(numeroConta, cpfCliente);
        } catch (error) {
            console.error("Erro ao atribuir titularidade:", error.message);
        }
    }

    private excluirCliente(): void {
        console.log("\nExcluir cliente:");
        const cpf = input('Digite o CPF do cliente a ser excluído: ');
        try {
            this.banco.excluirCliente(cpf);
        } catch (error) {
            console.error("Erro ao excluir cliente:", error.message);
        }
    }

    private RenderJuros(): void {
        const numero = input("Digite o número da conta: ");
        try {
            this.banco.renderJuros(numero);
        } catch (error) {
            console.error("Erro ao render juros:", error.message);
        }
    }

    private salvarContas(): void {
        const arquivo = input('Digite o nome do arquivo com a extensão .txt: ');
        let linha: string = ``;

        try {
            if (!fs.existsSync(arquivo)) {
                fs.writeFileSync(arquivo, linha);
            }

            for (const conta of this.banco.contas) {
                let linhaConta = ''; // Linha para cada conta

                if (conta instanceof Poupanca) {
                    linhaConta = `CP;${conta.numero};${conta.saldo.toFixed(2)};${conta.taxaDejuros}%`;
                } else if (conta instanceof ContaImposto) {
                    linhaConta = `CI;${conta.numero};${conta.saldo.toFixed(2)};${conta.taxaDejuros}%`;
                } else if (conta instanceof ContaCorrente) {  // Adicione ContaCorrente aqui
                    linhaConta = `CC;${conta.numero};${conta.saldo.toFixed(2)};${conta.limiteChequeEspecial};${conta.taxaManutencao}`; // Adicione os campos específicos
                } else {
                    linhaConta = `C;${conta.numero};${conta.saldo.toFixed(2)}`;
                }

                if (conta.cliente && this.banco.clienteEstaCadastrado(conta.cliente)) {
                    linhaConta += `;${conta.cliente.nome}\n`;
                } else {
                    linhaConta += `;\n`; // Adicione ponto e vírgula para indicar sem cliente
                }

                linha += linhaConta; // Concatena a linha da conta à linha geral
            }

            fs.appendFile(arquivo, linha, (err) => {
                if (err) {
                    console.error("Erro ao salvar contas:", err); // Mensagem de erro mais específica
                } else {
                    console.log("Contas salvas com sucesso em", arquivo); // Mensagem de sucesso
                }
            });
        } catch (error) {
            console.error("Erro ao salvar contas:", error); // Trate outros erros (ex: permissão)
        }
    }

    private cadastrarContasDeArquivo(): void {
        let arquivo = input('Digite o nome do arquivo com a extensão .txt: ');
        try {
            const conteudoArquivo = fs.readFileSync(arquivo, 'utf8');
            const linhas = conteudoArquivo.split('\n'); // Divide o arquivo em linhas
    
            for (const linha of linhas) {
                if (linha.trim() === '') continue; // Ignora linhas em branco
    
                const partes = linha.split(';'); // Divide cada linha em partes
    
                const tipo = this.obterTipoContaArquivo(partes[0]); // Obtém o tipo de conta
                const numero = partes[1];
                const saldo = Number(partes[2]);
    
                let taxa: number | undefined = undefined;
                let limite: number | undefined = undefined;
                let manutencao: number | undefined = undefined;
                let nome: string | undefined = undefined;
                let cpf: string | undefined = undefined;
                let dataNascimento: Date | undefined = undefined;
    
                // Extrai dados específicos de acordo com o tipo de conta
                switch (tipo) {
                    case 'poupanca':
                    case 'contaImposto':
                        taxa = Number(partes[3].replace('%', ''));
                        nome = partes[6]; // Nome do cliente
                        cpf = partes[7]; // CPF do cliente
                        dataNascimento = new Date(partes[8]); // Data de nascimento do cliente
                        break;
                    case 'contaCorrente':
                        limite = Number(partes[3]);
                        manutencao = Number(partes[4]);
                        nome = partes[5]; // Nome do cliente
                        cpf = partes[6]; // CPF do cliente
                        dataNascimento = new Date(partes[7]); // Data de nascimento do cliente
                        break;
                    case 'conta':
                        nome = partes[3]; // Nome do cliente
                        cpf = partes[4]; // CPF do cliente
                        dataNascimento = new Date(partes[5]); // Data de nascimento do cliente
                        break;
                }
    
                // Cria o cliente, se os dados estiverem presentes
                let cliente: Cliente | undefined = undefined;
                if (nome && cpf && dataNascimento) {
                    cliente = new Cliente(0, nome, cpf, dataNascimento); // ID será gerado posteriormente
                }
    
                // Cadastra a conta associando o cliente, se existir
                let conta;
                switch (tipo) {
                    case 'conta':
                        conta = new Conta(numero, saldo);
                        break;
                    case 'poupanca':
                        conta = new Poupanca(numero, saldo, taxa!); // taxa não é undefined aqui
                        break;
                    case 'contaImposto':
                        conta = new ContaImposto(numero, saldo, taxa!); // taxa não é undefined aqui
                        break;
                    case 'contaCorrente':
                        conta = new ContaCorrente(numero, saldo, undefined, limite!, manutencao!); // limite e manutencao não são undefined aqui
                        break;
                }
    
                if (cliente) {
                    this.banco.associarClienteConta(cliente, conta);
                }
    
                this.banco.inserirConta(conta);
                console.log(`Conta ${numero} cadastrada.`);
            }
    
            console.log("Contas cadastradas do arquivo com sucesso.");
        } catch (erro) {
            console.error("Erro ao cadastrar contas do arquivo:", erro);
        }
    }
    
    
    private obterTipoContaArquivo(tipo: string): "conta" | 'poupanca' | 'contaImposto' | 'contaCorrente' {
        switch (tipo) {
            case 'C': return 'conta';
            case 'CP': return 'poupanca';
            case 'CI': return 'contaImposto';
            case 'CC': return 'contaCorrente';
            default: throw new Error(`Tipo de conta inválido: ${tipo}`);
        }
    }
}
        const bancoApp = new BancoApp();
    bancoApp.run();


