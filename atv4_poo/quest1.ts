function eh_par (numero :number) :boolean{
    if(numero%2 == 0){
        return true;
    }else{
        return false;
    }
}

function main_q1() : void{
    let numero = 4556

    if(eh_par(numero)){
        console.log(`O número ${numero} é par.`)
    }else{
        console.log(`O número ${numero} é ímpar.`)
    }
}

main_q1()