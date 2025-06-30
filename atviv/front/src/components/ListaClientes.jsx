import React from 'react';

export default function ListaClientes({ clientes, onEditar, onRemover }) {
  if (!clientes.length) return <p>Nenhum cliente cadastrado.</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Documento</th>
          <th>Cidade</th>
          <th>Telefones</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map(cliente => (
          <tr key={cliente.id}>
            <td>{cliente.nome}</td>
            <td>{cliente.documento}</td>
            <td>{cliente.endereco.cidade}</td>
            <td>{cliente.telefones.map(t => `(${t.ddd}) ${t.numero}`).join(', ')}</td>
            <td>
              <button onClick={() => onEditar(cliente)}>Editar</button>
              <button onClick={() => onRemover(cliente.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
