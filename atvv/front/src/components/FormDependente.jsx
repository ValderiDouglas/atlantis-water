import React, { useState, useEffect } from 'react';
import { DocumentoForm } from './FormCliente';

const estadoInicial = {
  nome: '',
  nomeSocial: '',
  dataNascimento: '',
  dataCadastro: '',
  documentos: [{ tipo: '', numero: '' }],
  titularId: '',
};

export default function FormDependente({ clientes, onSalvar, dependente }) {
  const [dados, setDados] = useState(estadoInicial);

  useEffect(() => {
    if (dependente) {
      setDados({
        ...estadoInicial,
        ...dependente,
        nomeSocial: dependente.nome_social || '',
        dataNascimento: dependente.data_nascimento || '',
        documentos: dependente.documentos || [{ tipo: '', numero: '' }],
        titularId: dependente.titular_id || '',
      });
    } else setDados(estadoInicial);
  }, [dependente]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  }

  function addDocumento() {
    setDados({ ...dados, documentos: [...dados.documentos, { tipo: '', numero: '' }] });
  }
  function updateDocumento(idx, novo) {
    const documentos = [...dados.documentos];
    documentos[idx] = novo;
    setDados({ ...dados, documentos });
  }
  function removerDocumento(idx) {
    setDados({ ...dados, documentos: dados.documentos.filter((_, i) => i !== idx) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!dados.nome || !dados.dataNascimento || !dados.titularId) return;
    const dependentePayload = {
      nome: dados.nome,
      nomeSocial: dados.nomeSocial,
      dataNascimento: dados.dataNascimento,
      documentos: dados.documentos,
      titularId: dados.titularId
    };
    if (dados.id) dependentePayload.id = dados.id;
    onSalvar(dependentePayload);
    setDados(estadoInicial);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Novo Dependente</h3>
      <input name="nome" placeholder="Nome completo" value={dados.nome} onChange={handleChange} required />
      <input name="nomeSocial" placeholder="Nome social" value={dados.nomeSocial} onChange={handleChange} />
      <label>Data de nascimento:</label>
      <input name="dataNascimento" type="date" placeholder="Data de nascimento" value={dados.dataNascimento} onChange={handleChange} required />
      <div style={{ marginTop: '1rem' }}>
        <label>Documentos:</label>
        {dados.documentos.map((doc, idx) => (
          <DocumentoForm
            key={idx}
            documento={doc}
            onChange={novo => updateDocumento(idx, novo)}
            onRemover={() => removerDocumento(idx)}
          />
        ))}
        <button type="button" onClick={addDocumento}>Adicionar Documento</button>
      </div>
      <select name="titularId" value={dados.titularId} onChange={handleChange} required style={{ marginTop: '1rem', width: '100%' }}>
        <option value="">Selecione o titular</option>
        {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
      </select>
      <div>
        <button type="submit" style={{ marginTop: '1rem' }}>Cadastrar</button>
      </div>
    </form>
  );
}
