import React, { useState, useMemo } from 'react';

export default function FormHospedagem({ onSalvar, clientes = [], dependentes = [], acomodacoes = [] }) {
  const [titular, setTitular] = useState('');
  const [dependentesSelecionados, setDependentesSelecionados] = useState([]);
  const [acomodacao, setAcomodacao] = useState('');

  const dependentesDoTitular = useMemo(() => {
    if (!titular) return [];
    return dependentes.filter(d => String(d.titular_id ?? d.titularId) === String(titular));
  }, [titular, dependentes]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!titular || !acomodacao) return;
    onSalvar({ titular, dependentes: dependentesSelecionados, acomodacao });
    setTitular('');
    setDependentesSelecionados([]);
    setAcomodacao('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Hospedagem</h3>
      <select value={titular} onChange={e => { setTitular(e.target.value); setDependentesSelecionados([]); }} required>
        <option value="">Selecione o titular</option>
        {clientes.map(c => (
          <option key={c.id} value={c.id}>{c.nome}</option>
        ))}
      </select>
      <select multiple value={dependentesSelecionados} onChange={e => setDependentesSelecionados(Array.from(e.target.selectedOptions, o => o.value))} style={{ marginTop: '0.5rem', width: '100%' }}>
        {dependentesDoTitular.map(d => (
          <option key={d.id} value={d.id}>{d.nome}</option>
        ))}
      </select>
      <select value={acomodacao} onChange={e => setAcomodacao(e.target.value)} required style={{ marginTop: '0.5rem', width: '100%' }}>
        <option value="">Selecione a acomodação</option>
        {acomodacoes.map(a => (
          <option key={a.id} value={a.id}>{a.nome}</option>
        ))}
      </select>
      <div>
        <button type="submit" style={{ marginTop: '1rem' }}>Registrar</button>
      </div>
    </form>
  );
}
