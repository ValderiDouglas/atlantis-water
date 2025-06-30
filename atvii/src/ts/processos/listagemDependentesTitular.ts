import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ListagemDependentesTitular extends Processo {
    processar(): void {
        console.log('Iniciando a listagem de dependentes de um titular...');
        let armazem = Armazem.InstanciaUnica;
        let clientes = armazem.Clientes;

        if (clientes.length === 0) {
            console.log('Nenhum cliente disponível.');
            return;
        }

        console.log('Titulares disponíveis:');
        let titulares = clientes.filter(c => c.Dependentes.length > 0);
        if (titulares.length === 0) {
            console.log('Nenhum titular com dependentes disponível.');
            return;
        }

        titulares.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });

        let indice = this.entrada.receberNumero('Selecione o número do titular para listar seus dependentes:');
        if (indice < 1 || indice > titulares.length) {
            console.log('Índice inválido! Operação cancelada.');
            return;
        }

        let titular = titulares[indice - 1];
        console.log(`Dependentes de ${titular.Nome}:`);
        if (titular.Dependentes.length === 0) {
            console.log('Nenhum dependente encontrado.');
        } else {
            titular.Dependentes.forEach((dep, i) => {
                console.log(`${i + 1} - ${dep.Nome} (Nome Social: ${dep.NomeSocial}, Data de Nascimento: ${dep.DataNascimento.toLocaleDateString()})`);
            });
        }
        console.log('Listagem finalizada.');
    }
}