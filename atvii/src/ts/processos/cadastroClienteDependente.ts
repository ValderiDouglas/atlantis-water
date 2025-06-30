import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastrarTelefonesCliente from "./cadastrarTelefonesCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente dependente...');

        let armazem = Armazem.InstanciaUnica;
        let clientes = armazem.Clientes;
        let titularesDisponiveis = clientes.filter(c => !c.Titular);

        if (titularesDisponiveis.length === 0) {
            console.log('Erro: Nenhum cliente titular disponível para vincular o dependente. Cadastre um titular primeiro.');
            return;
        }

        let nome = this.entrada.receberTexto('Qual o nome do novo cliente dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
        let dependente = new Cliente(nome, nomeSocial, dataNascimento);

        this.processo = new CadastroEnderecoTitular(dependente);
        this.processo.processar();

        this.processo = new CadastrarTelefonesCliente(dependente);
        this.processo.processar();

        this.processo = new CadastrarDocumentosCliente(dependente);
        this.processo.processar();

        console.log('Clientes disponíveis para serem titular:');
        titularesDisponiveis.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });

        let indice = this.entrada.receberNumero('Selecione o número do titular para vincular o dependente:');
        if (indice < 1 || indice > titularesDisponiveis.length) {
            console.log('Índice inválido! Cadastro do dependente cancelado.');
            return;
        }

        let titular = titularesDisponiveis[indice - 1];
        dependente['titular'] = titular;
        titular['dependentes'].push(dependente);

        armazem.adicionarCliente(dependente);

        console.log(`Dependente ${dependente.Nome} vinculado ao titular ${titular.Nome} com sucesso!`);
        console.log('Cadastro do dependente finalizado!');
    }
}