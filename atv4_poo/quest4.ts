function soma(x: number, y?: any): number {
    return x + y
    }
//a. console.log(soma(1, 2));
const resultado_a = soma(1,2);
//Saída: 3
//b. console.log(soma(1, "2"));
const resultado_b  = soma(1,"2");
//Saída: 3
//c. console.log(soma(1));
const resultado_c = soma(1);
//Saída: NaN

console.log(resultado_a,resultado_a,resultado_c);