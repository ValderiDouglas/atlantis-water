import React, { useState } from 'react';

export default function FormHospedagem({ onSalvar }) {
  const [titular, setTitular] = useState('');
  const [dependentes, setDependentes] = useState([]);
  const [acomodacao, setAcomodacao] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!titular || !acomodacao) return;
    onSalvar({ titular, dependentes, acomodacao });
    setTitular('');
    setDependentes([]);
    setAcomodacao('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Hospedagem</h3>
      <input placeholder="Titular (ID ou nome)" value={titular} onChange={e => setTitular(e.target.value)} required />
      <input placeholder="Dependentes (IDs separados por vírgula)" value={dependentes} onChange={e => setDependentes(e.target.value.split(','))} />
      <input placeholder="Acomodação (ID ou tipo)" value={acomodacao} onChange={e => setAcomodacao(e.target.value)} required />
      <div>
        <button type="submit">Registrar</button>
      </div>
    </form>
  );
}
