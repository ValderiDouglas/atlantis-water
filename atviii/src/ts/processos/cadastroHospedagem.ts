import Processo from "../abstracoes/processo";
import { GerenciadorHospedagens } from "../modelos/gerenciadorHospedagens";
import Armazem from "../dominio/armazem";

const gerenciador = new GerenciadorHospedagens();

export default class CadastroHospedagem extends Processo {
    processar(): void {
        const armazem = Armazem.InstanciaUnica;
        if (armazem.Acomodacoes.length === 0) {
            console.log('Nenhuma acomodação disponível. Cadastre uma primeiro.');
            return;
        }
        if (armazem.Clientes.length === 0) {
            console.log('Nenhum cliente cadastrado. Cadastre um cliente primeiro.');
            return;
        }
        const titulares = armazem.Clientes.filter(c => !c.Titular);
        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado. Cadastre um titular primeiro.');
            return;
        }
        console.log('Clientes titulares:');
        titulares.forEach((t, idx) => {
            console.log(`${idx + 1}. ${t.Nome}`);
        });
        const idxTitular = this.entrada.receberNumero('Escolha o número do titular: ');
        const titular = titulares[idxTitular - 1];
        if (!titular) {
            console.log('Titular inválido.');
            return;
        }
        const dependentes = titular.Dependentes;
        console.log('\nAcomodações disponíveis:');
        armazem.Acomodacoes.forEach((a: any, idx: number) => {
            console.log(`${idx + 1}. ${a.toString()}`);
        });
        const idxAcom = this.entrada.receberNumero('Escolha o número da acomodação: ');
        const acomodacao = armazem.Acomodacoes[idxAcom - 1];
        if (!acomodacao) {
            console.log('Acomodação inválida.');
            return;
        }
        try {
            gerenciador.registrarHospedagem(titular, dependentes, acomodacao);
            console.log('Hospedagem registrada com sucesso!');
            const hospedagens = gerenciador.listarHospedagensAtivas();
            hospedagens.forEach(h => console.log(h.toString()));
        } catch (e) {
            console.log('Erro ao registrar hospedagem:', e instanceof Error ? e.message : e);
        }
    }
}
