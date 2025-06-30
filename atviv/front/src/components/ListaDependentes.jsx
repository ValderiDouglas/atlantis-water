import React from 'react';

export default function ListaDependentes({ dependentes, clientes }) {
  if (!dependentes.length) return <p>Nenhum dependente cadastrado.</p>;
  function nomeTitular(id) {
    const titular = clientes.find(c => c.id === id);
    return titular ? titular.nome : 'Desconhecido';
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Documento</th>
          <th>Titular</th>
        </tr>
      </thead>
      <tbody>
        {dependentes.map(dep => (
          <tr key={dep.id}>
            <td>{dep.nome}</td>
            <td>{dep.documento}</td>
            <td>{nomeTitular(dep.titularId)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
