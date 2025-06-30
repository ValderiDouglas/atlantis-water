import Processo from "../abstracoes/processo";
import { GerenciadorHospedagens } from "../modelos/gerenciadorHospedagens";

const gerenciador = new GerenciadorHospedagens();

export default class ListagemHospedagens extends Processo {
    processar(): void {
        const hospedagens = gerenciador.listarTodasHospedagens();
        if (hospedagens.length === 0) {
            console.log('Nenhuma hospedagem registrada.');
        } else {
            hospedagens.forEach(h => {
                console.log(h.toString());
            });
        }
    }
}
