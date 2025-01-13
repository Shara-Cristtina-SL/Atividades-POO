class Calculadora {
    private _operando1: number;
    private _operando2: number;


    constructor (operando1: number, operando2: number){
        this._operando1 = operando1;
        this._operando2 = operando2;
    }

    somar(): number{
        return this._operando1 + this._operando2;
    }

    // Modificação feita para atender a questão três (resposta da letra C)
    public get operando1(): number {
        return this._operando1;
    }
    
    public get operando2(): number {
        return this._operando2;
    }
}

let C1 = new Calculadora(3,8.5);
console.log(C1.somar());

class CalculadoraCientifica extends Calculadora {

    exponenciar(): number{
        return this.operando1** this.operando2;
    }
}

let CC1 = new CalculadoraCientifica(3,2);

console.log(CC1.exponenciar());

