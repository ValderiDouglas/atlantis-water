import React from 'react';

export default function ListaAcomodacoes({ acomodacoes }) {
  if (!acomodacoes.length) return <p>Nenhuma acomodação cadastrada.</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Solteiro</th>
          <th>Casal</th>
          <th>Suítes</th>
          <th>Climatização</th>
          <th>Garagem</th>
        </tr>
      </thead>
      <tbody>
        {acomodacoes.map((a, i) => (
          <tr key={i}>
            <td>{a.nome}</td>
            <td>{a.solteiro}</td>
            <td>{a.casal}</td>
            <td>{a.suites}</td>
            <td>{a.climatizacao ? 'Sim' : 'Não'}</td>
            <td>{a.garagem}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
