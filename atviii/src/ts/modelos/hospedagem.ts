import Cliente from './cliente';
import Acomodacao from './acomodacao';

export class Hospedagem {
    private titular: Cliente;
    private dependentes: Cliente[];
    private acomodacao: Acomodacao;
    private ativa: boolean;

    constructor(titular: Cliente, dependentes: Cliente[] = [], acomodacao: Acomodacao) {
        this.titular = titular;
        this.dependentes = dependentes;
        this.acomodacao = acomodacao;
        this.ativa = true;
    }

    public getTitular(): Cliente {
        return this.titular;
    }

    public getDependentes(): Cliente[] {
        return this.dependentes;
    }

    public getAcomodacao(): Acomodacao {
        return this.acomodacao;
    }

    public isAtiva(): boolean {
        return this.ativa;
    }

    public finalizar(): void {
        this.ativa = false;
    }

    public toString(): string {
        const nomesDependentes = this.dependentes && this.dependentes.length > 0 ? this.dependentes.map(d => d.Nome).join(', ') : '';
        return `${this.titular.Nome}${nomesDependentes ? ' (com ' + nomesDependentes + ')' : ''} está hospedado na acomodação ${this.acomodacao.NomeAcomadacao}. Ativa: ${this.ativa}`;
    }
}