import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";
import { Hospedagem } from "../modelos/hospedagem";

export default class Armazem {
    private static instancia: Armazem = new Armazem()
    private clientes: Cliente[] = []
    private acomodacoes: Acomodacao[] = []
    private hospedagens: Hospedagem[] = []
    private constructor() { }
    
    public get Acomodacoes(){
        return this.acomodacoes
    }

    public static get InstanciaUnica(): Armazem {
        if (!Armazem.instancia) {
            Armazem.instancia = new Armazem();
        }
        return Armazem.instancia;
    }

    public get Clientes(): Cliente[] {
        return this.clientes;
    }

    public setClientes(clientes: Cliente[]): void {
        this.clientes = clientes;
    }

    public adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    public removerCliente(indice: number): void {
        if (indice >= 0 && indice < this.clientes.length) {
            this.clientes.splice(indice, 1);
        }
    }

    public atualizarCliente(indice: number, cliente: Cliente): void {
        if (indice >= 0 && indice < this.clientes.length) {
            this.clientes[indice] = cliente;
        }
    }

    public get Hospedagens() {
        return this.hospedagens;
    }
    public adicionarHospedagem(hospedagem: Hospedagem): void {
        this.hospedagens.push(hospedagem);
    }
}