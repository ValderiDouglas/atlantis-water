import React, { useState, useEffect } from 'react';

const estadoInicial = {
  nome: '',
  nomeSocial: '',
  dataNascimento: '',
  dataCadastro: '',
  telefones: [{ ddd: '', numero: '' }],
  endereco: { rua: '', numero: '', bairro: '', cidade: '', estado: '' },
  documentos: [{ tipo: '', numero: '' }],
  dependentes: [],
  titular: null,
};

export function DocumentoForm({ documento, onChange, onRemover }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
      <select name="tipo" value={documento.tipo} onChange={e => onChange({ ...documento, tipo: e.target.value })} required>
        <option value="CPF">CPF</option>
        <option value="RG">RG</option>
        <option value="Passaporte">Passaporte</option>
      </select>
      <input name="numero" placeholder="Número" value={documento.numero} onChange={e => onChange({ ...documento, numero: e.target.value })} required />
      <button type="button" onClick={onRemover}>Remover</button>
    </div>
  );
}

export default function FormCliente({ onSalvar, cliente, onCancelar }) {
  const [dados, setDados] = useState(estadoInicial);

  useEffect(() => {
    if (cliente) setDados({ ...estadoInicial, ...cliente });
    else setDados(estadoInicial);
  }, [cliente]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith('endereco.')) {
      setDados({ ...dados, endereco: { ...dados.endereco, [name.split('.')[1]]: value } });
    } else if (name.startsWith('telefone.')) {
      const idx = Number(name.split('.')[1]);
      const campo = name.split('.')[2];
      const telefones = [...dados.telefones];
      telefones[idx][campo] = value;
      setDados({ ...dados, telefones });
    } else {
      setDados({ ...dados, [name]: value });
    }
  }

  function addTelefone() {
    setDados({ ...dados, telefones: [...dados.telefones, { ddd: '', numero: '' }] });
  }
  function removerTelefone(idx) {
    setDados({ ...dados, telefones: dados.telefones.filter((_, i) => i !== idx) });
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
    if (!dados.nome || !dados.dataNascimento || !dados.dataCadastro) return;
    onSalvar(dados);
    setDados(estadoInicial);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{cliente ? 'Editar Cliente' : 'Novo Cliente'}</h3>
      <input name="nome" placeholder="Nome completo" value={dados.nome} onChange={handleChange} required />
      <input name="nomeSocial" placeholder="Nome social" value={dados.nomeSocial} onChange={handleChange} />
      <label>Data de nascimento:</label>
      <input name="dataNascimento" type="date" placeholder="Data de nascimento" value={dados.dataNascimento} onChange={handleChange} required />
      <input name="endereco.rua" placeholder="Rua" value={dados.endereco.rua} onChange={handleChange} required />
      <input name="endereco.numero" placeholder="Número" value={dados.endereco.numero} onChange={handleChange} required />
      <input name="endereco.bairro" placeholder="Bairro" value={dados.endereco.bairro} onChange={handleChange} required />
      <input name="endereco.cidade" placeholder="Cidade" value={dados.endereco.cidade} onChange={handleChange} required />
      <input name="endereco.estado" placeholder="Estado" value={dados.endereco.estado} onChange={handleChange} required />
      <div>
        <label>Telefones:</label>
        {dados.telefones.map((tel, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input name={`telefone.${idx}.ddd`} placeholder="DDD" value={tel.ddd} onChange={handleChange} required />
            <input name={`telefone.${idx}.numero`} placeholder="Número" value={tel.numero} onChange={handleChange} required />
            {dados.telefones.length > 1 && <button type="button" onClick={() => removerTelefone(idx)}>-</button>}
          </div>
        ))}
        <button type="button" onClick={addTelefone}>Adicionar Telefone</button>
      </div>
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
      <div>
        <button type="submit" style={{ marginTop: '1rem', alignItems: 'center' }}>{cliente ? 'Salvar' : 'Cadastrar'}</button>
      </div>
      {cliente && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}
