export class Cliente {
    id : number;
    nome : string;
    cpf : string;
    data_nascimento : string;
    contas : number[];

    constructor(id:number, nome:string, cpf:string, data_nascimento:string, contas: number[]){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.contas = contas;
    }
}

let C1 : Cliente = new Cliente(21,"Ana", "1234", "12/03/04", [1,2,7]);

/*console.log(C1.id);
console.log(C1.nome);
console.log(C1.cpf);
console.log(C1.data_nascimento);
console.log(C1.contas);*/