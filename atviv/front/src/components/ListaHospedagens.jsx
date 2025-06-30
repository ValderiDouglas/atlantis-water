import React from 'react';

export default function ListaHospedagens({ hospedagens }) {
  if (!hospedagens.length) return <p>Nenhuma hospedagem registrada.</p>;
  return (
    <div>
      {hospedagens.map(h => (
        <div key={h.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
          <strong>Titular:</strong> {h.titular}<br />
          <strong>Dependentes:</strong> {Array.isArray(h.dependentes) ? h.dependentes.join(', ') : h.dependentes}<br />
          <strong>Acomodação:</strong> {h.acomodacao}
        </div>
      ))}
    </div>
  );
}
