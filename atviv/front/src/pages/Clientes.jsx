import React, { useState } from 'react';
import ListaClientes from '../components/ListaClientes';
import FormCliente from '../components/FormCliente';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);

  function adicionarCliente(cliente) {
    setClientes([...clientes, { ...cliente, id: Date.now(), dependentes: [] }]);
  }

  function atualizarCliente(clienteAtualizado) {
    setClientes(clientes.map(c => c.id === clienteAtualizado.id ? clienteAtualizado : c));
    setClienteEditando(null);
  }

  function removerCliente(id) {
    setClientes(clientes.filter(c => c.id !== id));
  }

  function editarCliente(cliente) {
    setClienteEditando(cliente);
  }

  return (
    <div>
      <h2>Clientes</h2>
      <FormCliente onSalvar={clienteEditando ? atualizarCliente : adicionarCliente} cliente={clienteEditando} onCancelar={() => setClienteEditando(null)} />
      <ListaClientes clientes={clientes} onEditar={editarCliente} onRemover={removerCliente} />
    </div>
  );
}
