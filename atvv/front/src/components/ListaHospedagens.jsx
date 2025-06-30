import React from 'react';

export default function ListaHospedagens({ hospedagens, clientes = [], dependentes = [], acomodacoes = [], onFinalizar }) {
  if (!hospedagens.length) return <p>Nenhuma hospedagem registrada.</p>;
  function nomeCliente(id) {
    const c = clientes.find(c => c.id === id);
    return c ? c.nome : id;
  }
  function nomeAcomodacao(id) {
    const a = acomodacoes.find(a => a.id === id);
    return a ? a.nome : id;
  }
  function nomesDependentes(ids) {
    return ids.map(id => {
      const d = dependentes.find(dep => dep.id === id);
      return d ? d.nome : id;
    }).join(', ');
  }
  return (
    <div>
      {hospedagens.map(h => (
        <div key={h.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem', background: h.data_saida ? '#eee' : '#fff' }}>
          <strong>Titular:</strong> {nomeCliente(h.titular_id)}<br />
          <strong>Dependentes:</strong> {Array.isArray(h.dependentes) ? nomesDependentes(h.dependentes) : h.dependentes}<br />
          <strong>Acomodação:</strong> {nomeAcomodacao(h.acomodacao_id)}<br />
          <strong>Entrada:</strong> {h.data_entrada}<br />
          <strong>Saída:</strong> {h.data_saida || 'Ativa'}<br />
          {!h.data_saida && onFinalizar && (
            <button onClick={() => onFinalizar(h.id)}>Finalizar Estadia</button>
          )}
        </div>
      ))}
    </div>
  );
}
