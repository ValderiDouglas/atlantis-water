import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ListagemTitularDependente extends Processo {
    processar(): void {
        console.log('Iniciando a listagem do titular de um dependente...');
        let armazem = Armazem.InstanciaUnica;
        let clientes = armazem.Clientes;

        if (clientes.length === 0) {
            console.log('Nenhum cliente disponível.');
            return;
        }

        console.log('Dependentes disponíveis:');
        let dependentes = clientes.filter(c => c.Titular);
        if (dependentes.length === 0) {
            console.log('Nenhum dependente disponível.');
            return;
        }

        dependentes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });

        let indice = this.entrada.receberNumero('Selecione o número do dependente para listar seu titular:');
        if (indice < 1 || indice > dependentes.length) {
            console.log('Índice inválido! Operação cancelada.');
            return;
        }

        let dependente = dependentes[indice - 1];
        console.log(`Titular de ${dependente.Nome}:`);
        if (dependente.Titular) {
            console.log(`Nome: ${dependente.Titular.Nome}, Nome Social: ${dependente.Titular.NomeSocial}, Data de Nascimento: ${dependente.Titular.DataNascimento.toLocaleDateString()}`);
        } else {
            console.log('Nenhum titular encontrado.');
        }
        console.log('Listagem finalizada.');
    }
}