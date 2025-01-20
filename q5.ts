class Produto {
    private id: number;
    private descricao: string;
    private quantidade: number;
    private valorUnitario: number;
  
    constructor(id: number, descricao: string, quantidade: number, valorUnitario: number) {
      this.id = id;
      this.descricao = descricao;
      this.quantidade = quantidade;
      this.valorUnitario = valorUnitario;
    }
  
    public getId(): number {
      return this.id;
    }
  
    public getDescricao(): string {
        return this.descricao;
    }
    
    public getQuantidade(): number {
      return this.quantidade;
    }
  
      public getValorUnitario(): number {
          return this.valorUnitario;
      }
  
    public repor(quantidade: number): void {
      this.quantidade += quantidade;
    }
  
    public darBaixa(quantidade: number): void {
      if (this.quantidade >= quantidade) {
        this.quantidade -= quantidade;
      } else {
        throw new Error("Quantidade insuficiente em estoque.");
      }
    }
  }
  
  class ProdutoPerecivel extends Produto {
    private dataValidade: Date;
  
    constructor(id: number, descricao: string, quantidade: number, valorUnitario: number, dataValidade: Date) {
      super(id, descricao, quantidade, valorUnitario);
      this.dataValidade = dataValidade;
    }
  
    public getDataValidade(): Date {
      return this.dataValidade;
    }
  
    public estaValido(): boolean {
      return this.dataValidade > new Date();
    }
  
    public override repor(quantidade: number): void {
      if (this.estaValido()) {
        super.repor(quantidade);
      } else {
        throw new Error("Produto perecível vencido, não é possível repor.");
      }
    }
  
    public override darBaixa(quantidade: number): void {
      if (this.estaValido()) {
        super.darBaixa(quantidade);
      } else {
        throw new Error("Produto perecível vencido, não é possível dar baixa.");
      }
    }
  }
  
  class Estoque {
    private produtos: (Produto | ProdutoPerecivel)[] = [];
  
      public getProdutos(): (Produto | ProdutoPerecivel)[] {
          return this.produtos;
      }
  
    public existe(id: number, descricao: string): boolean {
        return this.produtos.some(produto => produto.getId() === id || produto.getDescricao() === descricao);
    }
  
    public incluir(produto: Produto | ProdutoPerecivel): void {
        if(this.existe(produto.getId(), produto.getDescricao())){
            throw new Error("Já existe um produto com este ID ou descrição no estoque.");
        }
      this.produtos.push(produto);
    }
  
    public consultar(id: number): Produto | ProdutoPerecivel | undefined {
      return this.produtos.find(produto => produto.getId() === id);
    }
  
    public excluir(id: number): void {
      const index = this.produtos.findIndex(produto => produto.getId() === id);
      if (index > -1) {
        this.produtos.splice(index, 1);
      } else {
          throw new Error("Produto não encontrado para exclusão.");
      }
    }
  
      public repor(id: number, quantidade: number): void {
          const produto = this.consultar(id);
          if (produto) {
              if (produto instanceof ProdutoPerecivel) {
                produto.repor(quantidade);
              } else{
                  produto.repor(quantidade)
              }
          } else {
              throw new Error("Produto não encontrado para reposição.");
          }
      }
  
  
      public darBaixa(id: number, quantidade: number): void {
          const produto = this.consultar(id);
          if (produto) {
              if (produto instanceof ProdutoPerecivel) {
                  produto.darBaixa(quantidade);
              } else {
                  produto.darBaixa(quantidade);
              }
          } else {
              throw new Error("Produto não encontrado para dar baixa.");
          }
      }
  
  
    public listarProdutosVencidos(): ProdutoPerecivel[] {
      return this.produtos.filter(produto => produto instanceof ProdutoPerecivel && !produto.estaValido()) as ProdutoPerecivel[];
    }
  }
  
  // Exemplo de uso
  const estoque = new Estoque();
  
  const produto1 = new Produto(1, "Arroz", 100, 5.50);
  const produto2 = new ProdutoPerecivel(2, "Leite", 50, 4.00, new Date("2023-12-31"));
  const produto3 = new ProdutoPerecivel(3, "Queijo", 20, 20.00, new Date("2023-11-15"));
  const produto4 = new ProdutoPerecivel(4, "Iogurte", 100, 3.00, new Date("2024-01-01"));
  
  estoque.incluir(produto1);
  estoque.incluir(produto2);
  estoque.incluir(produto3);
  estoque.incluir(produto4);
  
  console.log("Produtos no estoque:", estoque.getProdutos())
  
  try {
      estoque.incluir(new Produto(1, "Cuscuz", 50, 5));
  }catch (e: any){
      console.error(e.message);
  }
  
  try{
      estoque.incluir(new Produto(5, "Arroz", 50, 5));
  }catch (e: any){
      console.error(e.message);
  }
  
  estoque.repor(1, 50);
  estoque.darBaixa(2, 10);
  
  try{
      estoque.darBaixa(3, 2);
  }catch (e: any){
      console.error(e.message)
  }
  
  const produtoEncontrado = estoque.consultar(2);
  if(produtoEncontrado){
      console.log("Produto encontrado:", produtoEncontrado);
  }
  
  estoque.excluir(1);
  console.log("Produtos após exclusão:", estoque.getProdutos())
  
  const produtosVencidos = estoque.listarProdutosVencidos();
  console.log("Produtos vencidos:", produtosVencidos);