import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";

export default class CadastrarTelefonesCliente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.execucao = true;
    }

    processar(): void {
        console.log('Iniciando o cadastro de telefones...');
        while (this.execucao) {
            let ddd = this.entrada.receberTexto('Qual o DDD do telefone?');
            let numero = this.entrada.receberTexto('Qual o número do telefone? ');
            
            let telefone = new Telefone(ddd, numero);
            this.cliente['telefones'].push(telefone);
            
            console.log('Telefone cadastrado com sucesso!');
            
            let continuar = this.entrada.receberTexto('Deseja cadastrar outro telefone? (s/n):');
            if (continuar.toLowerCase() !== 's') {
                this.execucao = false;
            }
        }
        console.log('Cadastro de telefones finalizado.');
    }
}