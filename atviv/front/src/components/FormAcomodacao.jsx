import React, { useState } from 'react';

const tipos = [
  { nome: 'Casal Simples', solteiro: 0, casal: 1, suites: 1, climatizacao: true, garagem: 1 },
  { nome: 'Família Simples', solteiro: 2, casal: 1, suites: 1, climatizacao: true, garagem: 1 },
  { nome: 'Família Mais', solteiro: 5, casal: 1, suites: 2, climatizacao: true, garagem: 2 },
  { nome: 'Família Super', solteiro: 6, casal: 2, suites: 3, climatizacao: true, garagem: 2 },
  { nome: 'Solteiro Simples', solteiro: 1, casal: 0, suites: 1, climatizacao: true, garagem: 0 },
  { nome: 'Solteiro Mais', solteiro: 0, casal: 1, suites: 1, climatizacao: true, garagem: 1 },
];

export default function FormAcomodacao({ onSalvar }) {
  const [tipo, setTipo] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const t = tipos.find(t => t.nome === tipo);
    if (t) onSalvar({ ...t });
    setTipo('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Acomodação</h3>
      <select value={tipo} onChange={e => setTipo(e.target.value)} required>
        <option value="">Selecione o tipo</option>
        {tipos.map(t => <option key={t.nome} value={t.nome}>{t.nome}</option>)}
      </select>
      <div>
        <button type="submit">Adicionar</button>
      </div>
    </form>
  );
}
