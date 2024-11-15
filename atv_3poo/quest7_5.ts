  let nome3: string; // Variável declarada, mas sem valor inicial
  
  // Sem strictNullChecks, o código abaixo compilaria sem problemas,
  // mas poderia causar um erro em tempo de execução se nome for null ou undefined
  console.log("Olá, " + nome);
  
  // Com strictNullChecks: true, o código acima gerará um erro de compilação,
  // pois o compilador não tem certeza se nome tem um valor