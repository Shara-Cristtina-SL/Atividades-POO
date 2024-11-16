var array_8 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var numeros_dobrados = array_8.map(function (numero) { return numero * 2; });
var numeros_soma = array_8.reduce(function (total, numero) { return total + numero; }, 0);
console.log(numeros_dobrados);
console.log(numeros_soma);
