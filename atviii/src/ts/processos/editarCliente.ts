import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";

export default class EditarCliente extends Processo {
    processar(): void {
        console.log('Iniciando a edição de um cliente...');
        let armazem = Armazem.InstanciaUnica;
        let clientes = armazem.Clientes;

        if (clientes.length === 0) {
            console.log('Nenhum cliente disponível para edição.');
            return;
        }

        console.log('Clientes disponíveis:');
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}${cliente.Titular ? ` (Dependente de ${cliente.Titular.Nome})` : ''}`);
        });

        let indice = this.entrada.receberNumero('Selecione o número do cliente que deseja editar:');
        if (indice < 1 || indice > clientes.length) {
            console.log('Índice inválido! Operação cancelada.');
            return;
        }

        let clienteAntigo = clientes[indice - 1];
        console.log(`Editando cliente: ${clienteAntigo.Nome}`);

        let novoNome = this.entrada.receberTexto(`Novo nome do cliente (atual: ${clienteAntigo.Nome}):`);
        let novoNomeSocial = this.entrada.receberTexto(`Novo nome social (atual: ${clienteAntigo.NomeSocial}):`);
        let novaDataNascimento = this.entrada.receberData(`Nova data de nascimento (atual: ${clienteAntigo.DataNascimento.toLocaleDateString()}):`);

        let novoCliente = new Cliente(novoNome, novoNomeSocial, novaDataNascimento);
        novoCliente.Endereco = clienteAntigo.Endereco;
        novoCliente['telefones'] = clienteAntigo.Telefones;
        novoCliente['documentos'] = clienteAntigo.Documentos;
        novoCliente['dependentes'] = clienteAntigo.Dependentes;
        novoCliente['titular'] = clienteAntigo.Titular;

        this.processo = new CadastroEnderecoTitular(novoCliente);
        this.processo.processar();

        this.processo = new CadastrarDocumentosCliente(novoCliente);
        this.processo.processar();

        if (!clienteAntigo.Titular) {
            console.log('Dependentes atuais:', clienteAntigo.Dependentes.length > 0 ? clienteAntigo.Dependentes.map(d => d.Nome).join(', ') : 'Nenhum');
            let editarDependentes = this.entrada.receberTexto('Deseja adicionar/remover dependentes? (s/n):');
            if (editarDependentes.toLowerCase() === 's') {
                console.log('Clientes disponíveis para adicionar como dependentes:');
                clientes.forEach((c, i) => {
                    if (c !== clienteAntigo && !c.Titular) {
                        console.log(`${i + 1} - ${c.Nome}`);
                    }
                });
                let dependenteIndice = this.entrada.receberNumero('Digite o número do cliente para adicionar como dependente (0 para pular):');
                if (dependenteIndice > 0 && dependenteIndice <= clientes.length && clientes[dependenteIndice - 1] !== clienteAntigo && !clientes[dependenteIndice - 1].Titular) {
                    novoCliente['dependentes'].push(clientes[dependenteIndice - 1]);
                    clientes[dependenteIndice - 1]['titular'] = novoCliente;
                }
                let removerDependente = this.entrada.receberTexto('Deseja remover um dependente? (s/n):');
                if (removerDependente.toLowerCase() === 's' && novoCliente.Dependentes.length > 0) {
                    console.log('Dependentes:');
                    novoCliente.Dependentes.forEach((d, i) => console.log(`${i + 1} - ${d.Nome}`));
                    let removerIndice = this.entrada.receberNumero('Digite o número do dependente para remover (0 para pular):');
                    if (removerIndice > 0 && removerIndice <= novoCliente.Dependentes.length) {
                        novoCliente.Dependentes[removerIndice - 1]['titular'] = undefined;
                        novoCliente['dependentes'] = novoCliente.Dependentes.filter((_, i) => i !== removerIndice - 1);
                    }
                }
            }
        } else {
            console.log('Este cliente é um dependente. Apenas titulares podem gerenciar dependentes.');
        }

        if (clienteAntigo.Titular) {
            let mudarTitular = this.entrada.receberTexto(`Cliente é dependente de ${clienteAntigo.Titular.Nome}. Deseja alterar o titular? (s/n):`);
            if (mudarTitular.toLowerCase() === 's') {
                console.log('Clientes disponíveis para serem titular:');
                clientes.forEach((c, i) => {
                    if (c !== clienteAntigo && !c.Dependentes.includes(clienteAntigo)) {
                        console.log(`${i + 1} - ${c.Nome}`);
                    }
                });
                let titularIndice = this.entrada.receberNumero('Digite o número do novo titular (0 para remover titular):');
                if (titularIndice === 0) {
                    clienteAntigo.Titular['dependentes'] = clienteAntigo.Titular.Dependentes.filter(d => d !== clienteAntigo);
                    novoCliente['titular'] = undefined;
                } else if (titularIndice > 0 && titularIndice <= clientes.length && clientes[titularIndice - 1] !== clienteAntigo) {
                    clienteAntigo.Titular['dependentes'] = clienteAntigo.Titular.Dependentes.filter(d => d !== clienteAntigo);
                    novoCliente['titular'] = clientes[titularIndice - 1];
                    clientes[titularIndice - 1]['dependentes'].push(novoCliente);
                }
            }
        }

        armazem.atualizarCliente(indice - 1, novoCliente);

        armazem.Clientes.forEach(c => {
            if (c.Dependentes.includes(clienteAntigo)) {
                c['dependentes'] = c.Dependentes.map(d => d === clienteAntigo ? novoCliente : d);
            }
            if (c.Titular === clienteAntigo) {
                c['titular'] = novoCliente;
            }
        });

        console.log('Edição do cliente finalizada com sucesso!');
    }
}