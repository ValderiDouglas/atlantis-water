import Processo from "../abstracoes/processo";
import CadastroHospedagem from "./cadastroHospedagem";
import ListagemHospedagens from "./listagemHospedagens";
import FinalizarHospedagem from "./finalizarHospedagem";

export default class MenuHospedagem extends Processo {
    processar(): void {
        console.log("\n--- Menu de Hospedagem ---");
        console.log("1 - Cadastrar nova hospedagem");
        console.log("2 - Listar hospedagens");
        console.log("3 - Finalizar hospedagem");
        console.log("0 - Voltar ao menu principal");
        const opcao = this.entrada.receberNumero("Escolha uma opção: ");
        switch (opcao) {
            case 1:
                new CadastroHospedagem().processar();
                break;
            case 2:
                new ListagemHospedagens().processar();
                break;
            case 3:
                new FinalizarHospedagem().processar();
                break;
            case 0:
                return;
            default:
                console.log("Opção inválida!");
        }
    }
}
