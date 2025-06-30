import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExcluirCliente extends Processo {
    processar(): void {
        console.log('Iniciando a exclusionsão de um cliente...');
        let armazem = Armazem.InstanciaUnica;
        let clientes = armazem.Clientes;

        if (clientes.length === 0) {
            console.log('Nenhum cliente disponível para exclusão.');
            return;
        }

        console.log('Clientes disponíveis:');
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}${cliente.Titular ? ` (Dependente de ${cliente.Titular.Nome})` : ''}`);
        });

        let indice = this.entrada.receberNumero('Selecione o número do cliente que deseja excluir:');
        if (indice < 1 || indice > clientes.length) {
            console.log('Índice inválido! Operação cancelada.');
            return;
        }

        let cliente = clientes[indice - 1];

        if (cliente.Titular) {
            cliente.Titular['dependentes'] = cliente.Titular.Dependentes.filter(d => d !== cliente);
        }

        cliente.Dependentes.forEach(dep => {
            dep['titular'] = undefined;
        });

        armazem.removerCliente(indice - 1);
        console.log(`Cliente ${cliente.Nome} excluído com sucesso!`);
    }
}