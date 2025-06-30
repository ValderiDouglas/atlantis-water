import Cliente from "../modelos/cliente";

export default class Armazem {
    private static instancia: Armazem;
    private clientes: Cliente[] = [];

    private constructor() {}

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
}