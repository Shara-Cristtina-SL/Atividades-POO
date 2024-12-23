class Hora {
    private _horas: string;
    private _minutos: string;
    private _segundos: string;

    /*constructor(horas:string, minutos: string, sengundos: string){
        this._horas = horas;
        this._minutos = minutos;
        this._segundos = sengundos;
    }*/

    public ler_horas(hora: string): void{
        this._horas = hora;
    }

    public let_minutos(minuto: string): void{
        this._minutos = minuto;
    }

    public ler_segundos(segundo: string): void{
        this._segundos = segundo;
    }

    public get hora_completa(): string{
        let hora = `${this._horas}: ${this._minutos}: ${this._segundos}`;
        return hora;
    }
}

let H1: Hora = new Hora();

H1.ler_horas("15");
H1.let_minutos("03");
H1.ler_segundos("19");

console.log(H1.hora_completa);