import Processo from "../abstracoes/processo";
import MenuDeletarClientes from "../menus/menuDeletarClientes";
import ListagemTitulares from "./listagemTitulares";

export default class TipoListagemClientes extends Processo {
    constructor(){
        super()
        this.menu = new MenuDeletarClientes()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                this.processo.processar()
                break;
        
            default:
                console.log('Opção não entendida... :(')
        }
    }
}