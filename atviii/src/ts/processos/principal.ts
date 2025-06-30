import Processo from "../abstracoes/processo";
import MenuPrincipal from "../menus/menuPrincipal";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoListagemClientes from "./tipoListagemClientes";
import ListagemAcomodacoes from "./listagemAcomodacoes"
import EditarCliente from "./editarCliente";
import ExcluirCliente from "./excluirCliente";
import MenuHospedagem from "./menuHospedagem";


export default class Principal extends Processo {
    constructor() {
        super();
        this.execucao = true;
        this.menu = new MenuPrincipal();
    }
    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente();
                this.processo.processar();
                break;
            case 2:
                this.processo = new EditarCliente();
                this.processo.processar();
                break;
            case 3:
                this.processo = new TipoListagemClientes();
                this.processo.processar();
                break;
            case 4:
                this.processo = new ExcluirCliente();
                this.processo.processar();
                break;
            case 5:
                this.processo = new ListagemAcomodacoes()
                this.processo.processar()
                break
            case 6:
                this.processo = new MenuHospedagem();
                this.processo.processar();
                break;
            case 0:
                this.execucao = false;
                console.log('Até logo!');
                console.clear();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}