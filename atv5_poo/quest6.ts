class Saudacao {
    texto : string;
    destinatario : string;
   
    constructor(texto:string, destinatario:string){
        this.texto = texto;
        this.destinatario = destinatario;
    }

    obterSaudacao() : string{
        return this.texto + this.destinatario;
    }
}

let S1: Saudacao = new Saudacao("Olá,", " Ana!" )
let S2: Saudacao = new Saudacao("Oi,", " professor!")
console.log(S1.obterSaudacao())
console.log(S2.obterSaudacao())