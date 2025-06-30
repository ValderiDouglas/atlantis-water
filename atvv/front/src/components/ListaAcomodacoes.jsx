import React from 'react';

export default function ListaAcomodacoes({ acomodacoes, onRemover }) {
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
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {acomodacoes.map((a, i) => (
          <tr key={i}>
            <td>{a.nome}</td>
            <td>{a.qtd_camas_solteiro ?? a.solteiro}</td>
            <td>{a.qtd_camas_casal ?? a.casal}</td>
            <td>{a.qtd_suites ?? a.suites}</td>
            <td>{a.climatizacao ? 'Sim' : 'Não'}</td>
            <td>{(a.vagas_garagem ?? a.garagem) > 0 ? 'Sim' : 'Não'}</td>
            <td>
              <button onClick={() => onRemover(a.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
