class Calculadora {
    private _operando1: number;
    private _operando2: number;
    private _resultado: number;

    constructor(operando1: number, operando2: number, resultado: number){
        this._operando1 = operando1;
        this._operando2 = operando2;
        //this._resultado = resultado;
    }

    public somar(valor1: number, valor2: number): void{
        this._operando1 = valor1
        this._operando2 = valor2
        this._resultado = this._operando1 + this._operando2;
    }

    public subtrair(valor1: number,valor2: number): void{
        this._operando1 = valor1;
        this._operando2 = valor2;
        this._resultado = this._operando1 - this._operando2;
    }

    public get resultado(): number{
        return this._resultado;
    }


}

let C:Calculadora = new Calculadora(0,0,0);
C.somar(1,3);
console.log(C.resultado);
C.subtrair(100,50);
console.log(C.resultado);