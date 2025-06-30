import DiretorCasalSimples from '../diretores/diretorCasalSimples';
import DiretorFamiliaSimples from '../diretores/diretorFamiliaSimples';
import DiretorFamiliaMais from '../diretores/diretorFamiliaMais';
import DiretorFamiliaSuper from '../diretores/diretorFamiliaSuper';
import DiretorSolteiroSimples from '../diretores/diretorSolteiroSimples';
import DiretorSolteiroMais from '../diretores/diretorSolteiroMais';
import { GerenciadorHospedagens } from '../modelos/gerenciadorHospedagens';
import Acomodacao from '../modelos/acomodacao';
import Armazem from '../dominio/armazem';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const gerenciador = new GerenciadorHospedagens();
const armazem = Armazem.InstanciaUnica;

const tiposAcomodacoes = [
    { diretor: new DiretorSolteiroSimples, nome: "Solteiro Simples" },
    { diretor: new DiretorCasalSimples, nome: "Casal Simples" },
    { diretor: new DiretorFamiliaSimples, nome: "Familia Simples" },
    { diretor: new DiretorFamiliaMais, nome: "Familia Mais" },
    { diretor: new DiretorFamiliaSuper, nome: "Familia Super" },
    { diretor: new DiretorSolteiroMais, nome: "Solteiro Mais" },
];

function menu() {
    console.log('\n--- Menu Hospedagem Atlantis ---');
    console.log('1. Cadastrar nova acomodação');
    console.log('2. Cadastrar hóspede e associar acomodação');
    console.log('3. Listar hóspedes e acomodações');
    console.log('4. Finalizar hospedagem');
    console.log('5. Sair');
    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1': cadastrarAcomodacao(); break;
            case '2': cadastrarHospede(); break;
            case '3': listarHospedagens(); break;
            case '4': finalizarHospedagem(); break;
            case '5': rl.close(); break;
            default: menu(); break;
        }
    });
}

function cadastrarAcomodacao() {
    console.log('\nTipos de acomodacao:');
    tiposAcomodacoes.forEach((tipo, idx) => {
        console.log(`${idx + 1}. ${tipo.nome}`);
    });
    rl.question('Escolha o tipo de acomodacao para cadastrar: ', (idx) => {
        const tipo = tiposAcomodacoes[parseInt(idx) - 1];
        if (!tipo) {
            console.log('Tipo invalido.');
            return menu();
        }
        const acomodacao = tipo.diretor.construir();
        armazem.Acomodacoes.push(acomodacao);
        console.log(`Acomodacao cadastrada: ${acomodacao.toString()}`);
        menu();
    });
}

function cadastrarHospede() {
    if (armazem.Acomodacoes.length === 0) {
        console.log('Nenhuma acomodacao disponível. Cadastre uma primeiro.');
        return menu();
    }
    rl.question('Nome do hóspede (titular já cadastrado): ', (nome) => {
        // Busca titular já cadastrado
        const titular = armazem.Clientes.find(c => c.Nome === nome && !c.Titular);
        if (!titular) {
            console.log('Titular não encontrado. Cadastre o cliente titular primeiro pelo sistema principal.');
            return menu();
        }
        // Sempre vincula todos os dependentes do titular
        const dependentes = titular.Dependentes;
        console.log('\nAcomodacoes disponiveis:');
        armazem.Acomodacoes.forEach((a: Acomodacao, idx: number) => {
            console.log(`${idx + 1}. ${a.toString()}`);
        });
        rl.question('Escolha o número da acomodação: ', (idxAcom) => {
            const acomodacao = armazem.Acomodacoes[parseInt(idxAcom) - 1];
            if (!acomodacao) {
                console.log('Acomodação inválida.');
                return menu();
            }
            try {
                gerenciador.registrarHospedagem(titular, dependentes, acomodacao);
                console.log('Hospedagem registrada com sucesso!');
            } catch (e) {
                console.log('Erro ao registrar hospedagem:', e instanceof Error ? e.message : e);
            }
            menu();
        });
    });
}

function listarHospedagens() {
    const hospedagens = gerenciador.listarTodasHospedagens();
    if (hospedagens.length === 0) {
        console.log('Nenhuma hospedagem registrada.');
    } else {
        hospedagens.forEach(h => {
            console.log(h.toString());
        });
    }
    menu();
}

function finalizarHospedagem() {
    rl.question('Informe o nome do titular para finalizar hospedagem: ', (nome) => {
        const sucesso = gerenciador.finalizarHospedagemPorTitular(nome);
        if (sucesso) {
            console.log('Hospedagem finalizada com sucesso!');
        } else {
            console.log('Hospedagem não encontrada ou já finalizada.');
        }
        menu();
    });
}

menu();
