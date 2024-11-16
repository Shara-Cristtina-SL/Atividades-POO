function tratamento (nome:string, pronome:string = "Sr"):void {
    console.log(`${pronome}.${nome}`)
}

function main_q2():void{
    const nome = "Ely";
    const nome2 = "Ana"
    let pronome = "Sra" ;

    tratamento(nome);
    tratamento(nome2, pronome)
}
main_q2()