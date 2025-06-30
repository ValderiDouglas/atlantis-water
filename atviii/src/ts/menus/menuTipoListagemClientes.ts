import Menu from "../interfaces/menu";

export default class MenuTipoListagemClientes implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual o tipo de listagem desejada? `)
        console.log(`----------------------`)
        console.log(`| 1 - Todos os titulares`)
        console.log(`| 2 - Listagem de clientes dependentes para um titular específico`)
        console.log(`| 3 - Listagem do titular para o cliente dependente específico`);
        console.log(`| 4 - Listar Todos os Dependentes`);
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}