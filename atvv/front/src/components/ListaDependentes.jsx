import React from 'react';

export default function ListaDependentes({ dependentes, clientes, onEditar, onRemover }) {
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
          <th>Nome Social</th>
          <th>Data Nasc.</th>
          <th>Documentos</th>
          <th>Titular</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dependentes.map(dep => (
          <tr key={dep.id}>
            <td>{dep.nome}</td>
            <td>{dep.nome_social || dep.nomeSocial || ''}</td>
            <td>{dep.data_nascimento || dep.dataNascimento || ''}</td>
            <td>{dep.documentos && dep.documentos.length > 0 ? dep.documentos.map(d => `${d.tipo}: ${d.numero}`).join(' | ') : '-'}</td>
            <td>{nomeTitular(dep.titular_id || dep.titularId)}</td>
            <td>
              <button onClick={() => onEditar(dep)}>Editar</button>
              <button onClick={() => onRemover(dep.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
