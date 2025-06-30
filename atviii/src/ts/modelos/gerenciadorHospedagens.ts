import { Hospedagem } from './hospedagem';
import Cliente from './cliente';
import Acomodacao from './acomodacao';
import Armazem from '../dominio/armazem';

export class GerenciadorHospedagens {
    constructor() {}

    public registrarHospedagem(titular: Cliente, dependentes: Cliente[], acomodacao: Acomodacao): void {
        const armazem = Armazem.InstanciaUnica;
        if (!armazem.Acomodacoes.includes(acomodacao)) {
            throw new Error("Acomodação indisponível");
        }
        armazem.Acomodacoes.splice(armazem.Acomodacoes.indexOf(acomodacao), 1);
        const hospedagem = new Hospedagem(titular, dependentes, acomodacao);
        armazem.adicionarHospedagem(hospedagem);
    }

    public finalizarHospedagemPorTitular(nomeTitular: string): boolean {
        const armazem = Armazem.InstanciaUnica;
        const idx = armazem.Hospedagens.findIndex((h: Hospedagem) => h.getTitular().Nome === nomeTitular && h.isAtiva());
        if (idx !== -1) {
            const hospedagem = armazem.Hospedagens[idx];
            hospedagem.finalizar();
            armazem.Acomodacoes.push(hospedagem.getAcomodacao());
            armazem.Hospedagens.splice(idx, 1);
            return true;
        }
        return false;
    }

    public listarHospedagensAtivas(): Hospedagem[] {
        const armazem = Armazem.InstanciaUnica;
        return armazem.Hospedagens.filter((h: Hospedagem) => h.isAtiva());
    }

    public listarTodasHospedagens(): Hospedagem[] {
        const armazem = Armazem.InstanciaUnica;
        return armazem.Hospedagens;
    }
}