import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ListagemTodosDependentes extends Processo {
    processar(): void {
        console.log('Iniciando a listagem de todos os dependentes...');
        let armazem = Armazem.InstanciaUnica;
        let clientes = armazem.Clientes;

        let dependentes = clientes.filter(c => c.Titular);

        if (dependentes.length === 0) {
            console.log('Nenhum dependente cadastrado.');
            return;
        }

        console.log('Lista de todos os dependentes:');
        dependentes.forEach((dependente, index) => {
            console.log(`${index + 1} - Nome: ${dependente.Nome}, Nome Social: ${dependente.NomeSocial}, Data de Nascimento: ${dependente.DataNascimento.toLocaleDateString()}, Titular: ${dependente.Titular!.Nome}`);
        });

        console.log('Listagem finalizada.');
    }
}