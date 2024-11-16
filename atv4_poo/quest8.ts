const array_8 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const numeros_dobrados = array_8.map(numero => numero*2);
const numeros_soma = array_8.reduce((total, numero)=> total + numero,0)

console.log(numeros_dobrados)
console.log(numeros_soma)