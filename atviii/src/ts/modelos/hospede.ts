export class Hospede {
    private nome: string;
    private cpf: string;
    private dataCheckIn: Date;
    private dataCheckOut?: Date;

    constructor(nome: string, cpf: string, dataCheckIn: Date) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataCheckIn = dataCheckIn;
    }

    public getNome(): string {
        return this.nome;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public getDataCheckIn(): Date {
        return this.dataCheckIn;
    }

    public getDataCheckOut(): Date | undefined {
        return this.dataCheckOut;
    }

    public setDataCheckOut(data: Date): void {
        this.dataCheckOut = data;
    }

    public toString(): string {
        return `Hóspede: ${this.nome}, CPF: ${this.cpf}, Check-in: ${this.dataCheckIn.toISOString()}, Check-out: ${this.dataCheckOut?.toISOString() || 'N/A'}`;
    }
}