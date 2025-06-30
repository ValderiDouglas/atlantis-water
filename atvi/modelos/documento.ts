import { TipoDocumento } from "../enumeracoes/tipoDocumento"
import Prototipo from "../interfaces/prototipo"

export default class Documento implements Prototipo {
    public numero: string
    public tipo: TipoDocumento
    public dataExpedicao: Date

    public clonar(): Prototipo{
        let documento = new Documento()
        documento.numero = this.numero
        documento.tipo = this.tipo
        documento.dataExpedicao = this.dataExpedicao
        return documento
    }
}