import React from 'react';

export default function ListaClientes({ clientes, onEditar, onRemover }) {
  if (!clientes.length) return <p>Nenhum cliente cadastrado.</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Nome Social</th>
          <th>Data Nasc.</th>
          <th>Documentos</th>
          <th>Rua</th>
          <th>Número</th>
          <th>Bairro</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Telefones</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map(cliente => (
          <tr key={cliente.id}>
            <td>{cliente.nome}</td>
            <td>{cliente.nome_social}</td>
            <td>{cliente.data_nascimento}</td>
            <td>{cliente.documentos && cliente.documentos.length > 0 ? cliente.documentos.map(d => `${d.tipo}: ${d.numero}`).join(' | ') : '-'}</td>
            <td>{cliente.endereco.rua}</td>
            <td>{cliente.endereco.numero}</td>
            <td>{cliente.endereco.bairro}</td>
            <td>{cliente.endereco.cidade}</td>
            <td>{cliente.endereco.estado}</td>
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
