import Processo from "../abstracoes/processo";
import { GerenciadorHospedagens } from "../modelos/gerenciadorHospedagens";

const gerenciador = new GerenciadorHospedagens();

export default class FinalizarHospedagem extends Processo {
    processar(): void {
        const nome = this.entrada.receberTexto('Informe o Nome do hóspede para finalizar hospedagem: ');
        const sucesso = gerenciador.finalizarHospedagemPorTitular(nome);
        if (sucesso) {
            console.log('Hospedagem finalizada com sucesso!');
        } else {
            console.log('Hospedagem não encontrada ou já finalizada.');
        }
        const hospedagens = gerenciador.listarHospedagensAtivas();
        if (hospedagens.length === 0) {
            console.log('Nenhuma hospedagem ativa.');
        } else {
            hospedagens.forEach(h => console.log(h.toString()));
        }
    }
}
