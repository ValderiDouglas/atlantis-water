import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListagemDependentesTitular from "./listagemDependentesTitular";
import ListagemTitularDependente from "./listagemTitularDependente";
import ListagemTitulares from "./listagemTitulares";
import ListagemTodosDependentes from "./listagemTodosDependentes";

export default class TipoListagemClientes extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoListagemClientes();
    }
    
    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares();
                this.processo.processar();
                break;
            case 2:
                this.processo = new ListagemDependentesTitular();
                this.processo.processar();
                break;
            case 3:
                this.processo = new ListagemTitularDependente();
                this.processo.processar();
                break;
            case 4:
                this.processo = new ListagemTodosDependentes();
                this.processo.processar();
                break;
            case 0:
                this.execucao = false;
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}