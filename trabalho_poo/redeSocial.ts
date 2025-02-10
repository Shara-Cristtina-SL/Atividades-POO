import { Perfil } from './perfil';
import { PersistenciaDeDados } from './persistenciaDados';
import {Publicacao} from './perfil';
import { PerfilAvancado, PublicacaoAvancada} from './perfil';
import {PerfilNaoAutorizadoError, AmizadeJaExistenteError, PerfilInativoError} from './excecoes'

export class RedeSocial {
    private _perfis: Perfil[] = [];
    private _publicacoes: Publicacao[] = [];
    private _solicitacoesAmizade: Map<Perfil, Perfil> = new Map();

    constructor() {
        // Carregar perfis ao iniciar a aplicação
        this._perfis = PersistenciaDeDados.carregarPerfis();
        this._publicacoes = PersistenciaDeDados.carregarPublicacoes();
    }

    // Adicionar um novo perfil e salvar automaticamente
    adicionarPerfil(perfil: Perfil): void {
        if (this._perfis.some(p => p['email'] === perfil['email'])) {
            throw new Error("Já existe um perfil com este e-mail.");
        }
        this._perfis.push(perfil);
        PersistenciaDeDados.salvarPerfis(this._perfis);  // Salva os perfis após adicionar
    }
    listarAmigos(perfil: Perfil): Perfil[] {
        // Chama o método listarAmigos de um perfil específico
        return perfil.listarAmigos();
    }
    // Remover um perfil e salvar novamente
    removerPerfil(id: string): void {
        this._perfis = this._perfis.filter(perfil => perfil['id'] !== id);
        PersistenciaDeDados.salvarPerfis(this._perfis);  // Salva após remover
    }

    // Listar todos os perfis
    listarPerfis(): Perfil[] {
        return this._perfis;
    }
    saoAmigos(perfil1: Perfil, perfil2: Perfil): boolean {
        return perfil1.listarAmigos().includes(perfil2);
    }

    // Adicionar uma publicação e salvar
    adicionarPublicacao(publicacao: Publicacao): void {
        if (!publicacao.perfil_perfil.estaAtivo()) {
            throw new PerfilInativoError("Perfil está inativo e não pode adicionar publicações.");
        }
        this._publicacoes.push(publicacao);
        PersistenciaDeDados.salvarPublicacoes(this._publicacoes);  // Salva as publicações
    }

    // Listar publicações
    listarPublicacoes(): Publicacao[] {
        return this._publicacoes.sort((a, b) => b['dataHora'].getTime() - a['dataHora'].getTime());
    }
    buscarPerfil(id?: string, apelido?: string, email?: string): Perfil | null {
        if (email) {
            return this._perfis.find(perfil => perfil.getEmail() === email) || null;
        } else if (id) {
            return this._perfis.find(perfil => perfil.getId() === id) || null;
        } else if (apelido) {
            return this._perfis.find(perfil => perfil.getApelido() === apelido) || null;
        } else {
            return null; // Se nenhum parâmetro for fornecido
        }
    }

    buscarPublicacaoPorId(id: string): Publicacao | PublicacaoAvancada | undefined {
        return this._publicacoes.find(publicacao => publicacao.getid() === id);
    }

    recusarSolicitacao(destinatario: Perfil): void {
        // Encontrar o índice da primeira solicitação de amizade pendente para este destinatário
        const solicitacaoIndex = Array.from(this._solicitacoesAmizade.entries())
        .findIndex(([chave, valor]) => valor === destinatario);

        if (solicitacaoIndex === -1) {
            throw new Error("Não há solicitações de amizade pendentes para este perfil.");
        }

        // Remover a solicitação de amizade do map
        const solicitacao = Array.from(this._solicitacoesAmizade.entries())[solicitacaoIndex];
        this._solicitacoesAmizade.delete(solicitacao[0]);
    }
    listarSolicitacoes(): undefined | Map<Perfil, Perfil>{
        return this._solicitacoesAmizade;
    }
    ativarDesativarPerfil(perfilAvancado: PerfilAvancado, perfil: Perfil): void {
        if (!(perfilAvancado instanceof PerfilAvancado)) {
            throw new PerfilNaoAutorizadoError('Perfil não autorizado para ativar/desativar outro perfil.');
        }
        perfil.ativarDesativarPerfil(); 
        PersistenciaDeDados.salvarPerfis(this._perfis);
    }

    enviarSolicitacaoAmizade(remetente: Perfil, destinatario: Perfil): void {
        if (remetente === destinatario) {
            throw new Error("Não é possível enviar uma solicitação de amizade para si mesmo.");
        }
    
        if (this.saoAmigos(remetente, destinatario)) {
            throw new AmizadeJaExistenteError("Essa amizade já existe.");
        }
    
        // Verifica se já existe uma solicitação pendente
        const solicitacaoPendente = Array.from(this._solicitacoesAmizade.entries())
            .find(([chave, valor]) =>
                (valor === destinatario && chave === remetente) ||
                (valor === remetente && chave === destinatario)
            );
    
        if (solicitacaoPendente) {
            throw new AmizadeJaExistenteError("Já existe uma solicitação de amizade pendente entre esses perfis.");
        }
    
        // Adiciona uma nova solicitação de amizade
        this._solicitacoesAmizade.set(remetente, destinatario);
    }
    aceitarSolicitacao(perfilDestinatario: Perfil): void {
        const perfilRemetente = this._solicitacoesAmizade.get(perfilDestinatario);
        if (perfilRemetente) {
            if (perfilDestinatario.listarAmigos().includes(perfilRemetente)) {
                throw new AmizadeJaExistenteError('Os perfis já são amigos.');
            }
            perfilDestinatario.adicionarAmigo(perfilRemetente);
            perfilRemetente.adicionarAmigo(perfilDestinatario);
            this._solicitacoesAmizade.delete(perfilDestinatario);
        }
    }
    
    }