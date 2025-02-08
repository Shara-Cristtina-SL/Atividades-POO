export class AppError extends Error {
    constructor(message: string, public statusCode: number) {
      super(message);
      this.name = this.constructor.name; // Define o nome do erro
      Error.captureStackTrace(this, this.constructor); // Captura o stack trace
    }
  }
  
  // Classe para erros de autenticação
  class AuthError extends AppError {
    constructor(message: string) {
      super(message, 401); // 401: Não autorizado
    }
  }
  
  export function validaValor(valor: number): number{
    if (valor === undefined) {
        throw new Error("Valor não pode ser undefined!");
      }
    
      if (valor <= 0 || (typeof valor) != 'number' ) {
        throw new Error("Valor inválido: deve ser maior que zero.");
      }
    
    try {
        return valor
    } catch (erro) {
        if(erro instanceof Error){
            console.error("Ocorreu um erro:", erro.message);
        }else{
            console.error("Ocorreu um erro desconhecido:", erro);
        }
         
    }
    throw Error
}
  
  // Função que pode lançar erros
  export function valores_positivo_zero(valor: number) {
    if (valor<0) {
      throw new AuthError("Valor inválido");
    }
  }

  export class ValorInvalidoError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ValorInvalidoError"; // Define o nome do erro
    }
  }
  