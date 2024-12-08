import prompt from "prompt-sync";
import { Conta, Banco } from "./banco";
let input = prompt();
let b: Banco = new Banco();
let opcao: String = '';
do {
console.log('\nBem vindo\nDigite uma opção:');
console.log('Contas:\n' +
console.log('1 - Inserir 2 - Consultar 3 - Sacar\n' +
'4 - Depositar 5 - Excluir 6 - Transferir\n' +
'7 – Totalizações
console.log('Clientes:\n');
console.log('8 - Inserir 9 - Consultar 10 - Associar\n' +
console.log('Sair\n');
opcao = input("Opção:");
switch (opcao) {
case "1":
inserir();
break
case "2":
consultar();
break
//...
}
input("Operação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("Aplicação encerrada");

function inserir(): void {
console.log("\nCadastrar conta\n");
let numero: string = input('Digite o número da conta:');
let conta: Conta;
conta = new Conta(numero, 0);