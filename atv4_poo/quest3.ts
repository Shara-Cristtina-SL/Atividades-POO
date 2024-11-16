function formatarNumeros(numeros: number[]): string {
    let resultado = '';
  
    numeros.forEach((numero, index) => {
      // Adiciona o número ao resultado
      resultado += numero;
  
      // Adiciona o hífen, exceto para o último elemento
      if (index !== numeros.length - 1) {
        resultado += '-';
      }
    });
  
    return resultado;
  }
  
  const meuArray = [1, 2, 3, 4, 5];
  const resultado = formatarNumeros(meuArray);
  console.log(resultado); 