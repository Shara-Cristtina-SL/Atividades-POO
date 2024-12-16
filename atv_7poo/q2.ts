/*class Postagem{
    id : number;
    texto: string;
    quantidadeCurtidas: number;

    constructor(id: number, texto:string, quantidadeCurtidas: number){
        this.id = id;
        this.texto = texto;
        this.quantidadeCurtidas = quantidadeCurtidas;
    }

    curtir(): void{
        this.quantidadeCurtidas++;
    }

    toString(): string{
        return `
        Postagem ${this.id}: ${this.texto}
        ${this.quantidadeCurtidas} curtidas`
    }

    
}

class Microblog {
    postagens: Postagem[] = [];
    maisCurtidas: Postagem[] = [];

    incluirPostagem(adicionada: Postagem): void{
        this.postagens.push(adicionada);
    }

    consultarPorid(numero: number): number {
        let idProcurado: number = -1;

        for (let i = 0; i < this.postagens.length; i++) {
            if (this.postagens[i].id == numero) {
                idProcurado = i;
                break;
            }
        }

        return idProcurado;
    }
    excluirPorid(numero: number): void {
        let idProcurado: number =
            this.consultarPorid(numero);

        if (idProcurado != -1) {
            for (let i = idProcurado; i < this.postagens.length - 1; i++) {
                this.postagens[i] = this.postagens[i + 1];
            }
            this.postagens.pop();
        }
    }

    buscarMaisCurtida(): Postagem | string{
        let P0: Postagem = new Postagem(0, "Sem curtidas.", 0);
        let maisCurtida = P0
        let contador_iguais = 0;
        for(let i = 0; i < this.postagens.length; i++){
            if(this.postagens[i].quantidadeCurtidas > maisCurtida.quantidadeCurtidas){
                maisCurtida = this.postagens[i];
            }
        }
        
        for(let i = 0; i < this.postagens.length; i++){
            if(this.postagens[i].quantidadeCurtidas == maisCurtida.quantidadeCurtidas){
                contador_iguais++;
                this.maisCurtidas.push(this.postagens[i]);
            }
        }
        this.maisCurtidas = this.postagens.filter(post => post.quantidadeCurtidas === maisCurtida.quantidadeCurtidas);
        if(contador_iguais == 1){
            return maisCurtida
        }
        return `As postagengens mais curtidas são:
        ${this.maisCurtidas}`
    }

    curtirPorid(numero: number): void{
        let idProcurado: number = this.consultarPorid(numero);
        if (idProcurado !== -1) {
            this.postagens[idProcurado].curtir(); // Chama o método curtir() da postagem encontrada
            this.buscarMaisCurtida()
        }
    }

    toString():string{
        let texto = "Postagens do blog: ";
        for(let i = 0; i < this.postagens.length; i++){
            texto+= this.postagens[i]
            texto+= "; "
        }
        return texto
    }
}


let P1: Postagem = new Postagem(1, "Bom dia!", 0);
let P2: Postagem = new Postagem(2, "Boa tarde!", 0);
let P3: Postagem = new Postagem(3, "Boa noite!", 0);
let M1: Microblog = new Microblog;

console.log(P1.toString());
P1.curtir();
P3.curtir();
P1.curtir();
P2.curtir();
console.log(P1.toString());
M1.incluirPostagem(P1);
M1.incluirPostagem(P2);
M1.incluirPostagem(P3);
M1.curtirPorid(1);
M1.curtirPorid(3);
console.log(M1.postagens)
M1.excluirPorid(2)
console.log(M1.postagens)
M1.incluirPostagem(P2);
console.log(M1.postagens);
console.log(M1.buscarMaisCurtida());
console.log(M1.toString())*/