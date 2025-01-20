export function getNumberInRange(numero: number, min: number, max: number){
    let num: number = numero
    if(num < min || num > max){
        console.log("Opçâo inválida!")
        getNumberInRange(numero, min, max);
    }else{
        return num;
    }
}