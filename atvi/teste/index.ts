import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";
let cliente = new Cliente()
cliente.nome = `Pedro de Alcantara Joao Carlos Leopoldo Salvador`
cliente.nomeSocial = `Dom Pedro II`
cliente.dataCadastro = new Date(1840, 6, 23)
cliente.dataNascimento = new Date(1825, 11, 2)
let endereco = new Endereco()
endereco.rua = `R. do Catete`
endereco.bairro = `Copacabana`
endereco.cidade = `Rio de Janeiro`
endereco.estado = `Rio de Janeiro`
endereco.pais = `Brasil`
endereco.codigoPostal = `22220-000`
cliente.endereco = endereco
let telefone = new Telefone()
telefone.ddd = `12`
telefone.numero = `988057745`
cliente.telefones.push(telefone)
telefone = new Telefone();
telefone.ddd = `12`
telefone.numero = `547750889`
cliente.telefones.push(telefone)

let documento = new Documento()
documento.tipo = TipoDocumento.CPF
documento.numero = '99999999999'
documento.dataExpedicao = new Date(2000, 1, 1)
cliente.documentos.push(documento)

let dependente = new Cliente()
dependente.nome = `Isabel Cristina Leopoldina Augusta Micaela`
dependente.nomeSocial = `Princesa Isabel`
dependente.dataCadastro = new Date(1921, 10, 14)
dependente.dataNascimento = new Date(1846, 6, 29)
dependente.endereco = (cliente.endereco.clonar() as Endereco)
dependente.titular = cliente
cliente.dependentes.push(dependente)

documento = new Documento()
documento.tipo = TipoDocumento.RG
documento.numero = '1111111111'
documento.dataExpedicao = new Date(2999, 9, 9)
dependente.documentos.push(documento)

cliente.telefones.forEach((tel) => {
    dependente.telefones.push(tel.clonar() as Telefone);
});


console.log(cliente);
console.log('--------------------')
console.log(dependente);
