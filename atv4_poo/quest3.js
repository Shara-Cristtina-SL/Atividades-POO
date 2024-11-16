function formatarNumeros(numeros) {
    var resultado = '';
    numeros.forEach(function (numero, index) {
        // Adiciona o número ao resultado
        resultado += numero;
        // Adiciona o hífen, exceto para o último elemento
        if (index !== numeros.length - 1) {
            resultado += '-';
        }
    });
    return resultado;
}
var meuArray = [1, 2, 3, 4, 5];
var resultado = formatarNumeros(meuArray);
console.log(resultado);
