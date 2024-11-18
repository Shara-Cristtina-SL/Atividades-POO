class Equipamento{
    ligado : boolean;

    constructor(ligado : boolean = false){
        this.ligado = ligado;
    }

    Liga(){
        if(!this.ligado){
            this.ligado = true
        }   
    }

    Desliga(){
        if(this.ligado){
            this.ligado = false
        }
    }

    inverte(){
        if(this.ligado == true){
            this.ligado = false
        }else{
            this.ligado = true
        }
    }

    esta_ligado(){
        return this.ligado
    }
}

let E1 : Equipamento = new Equipamento;

console.log(E1.esta_ligado());//false
E1.Liga();
console.log(E1.esta_ligado());//true
E1.Desliga();
console.log(E1.esta_ligado());//false
E1.inverte();
console.log(E1.esta_ligado());//true
