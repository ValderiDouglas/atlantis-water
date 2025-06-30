import Processo from "../abstracoes/processo";
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples";
import DiretorCasalSimples from "../diretores/diretorCasalSimples";
import Armazem from "../dominio/armazem";
import Acomodacao from "../modelos/acomodacao";
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais";
import DiretorFamiliaSuper from "../diretores/diretorFamiliaSuper";
import DiretorFamiliaSimples from "../diretores/diretorFamiliaSimples";
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais";

export default class CadastroAcomodacoes extends Processo {
    private acomodacoes: Acomodacao[]
    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }
    processar(): void {
        let diretor = new DiretorSolteiroSimples()
        this.acomodacoes.push(diretor.construir())
        diretor = new DiretorSolteiroMais()
        this.acomodacoes.push(diretor.construir())
        diretor = new DiretorCasalSimples()
        this.acomodacoes.push(diretor.construir())
        diretor = new DiretorFamiliaSimples()
        this.acomodacoes.push(diretor.construir())
        diretor = new DiretorFamiliaMais()
        this.acomodacoes.push(diretor.construir())
        diretor = new DiretorFamiliaSuper()
        this.acomodacoes.push(diretor.construir())
    }
}