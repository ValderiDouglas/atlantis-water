import React, { useState, useEffect } from 'react';
import ListaClientes from '../components/ListaClientes';
import FormCliente from '../components/FormCliente';

const API_URL = 'http://localhost:5000/clientes';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setClientes)
      .catch(() => setClientes([]));
  }, []);

  function adicionarCliente(cliente) {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    })
      .then(res => res.json())
      .then(novo => setClientes([...clientes, novo]));
  }

  function atualizarCliente(clienteAtualizado) {
    fetch(`${API_URL}/${clienteAtualizado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteAtualizado)
    })
      .then(res => res.json())
      .then(atualizado => {
        setClientes(clientes.map(c => c.id === atualizado.id ? atualizado : c));
        setClienteEditando(null);
      });
  }

  function removerCliente(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setClientes(clientes.filter(c => c.id !== id)));
  }

  function editarCliente(cliente) {
    setClienteEditando(cliente);
  }

  return (
    <div style={{ maxWidth: '100%'}}>
      <h2>Clientes</h2>
      <FormCliente onSalvar={clienteEditando ? atualizarCliente : adicionarCliente} cliente={clienteEditando} onCancelar={() => setClienteEditando(null)} />
      <ListaClientes clientes={clientes} onEditar={editarCliente} onRemover={removerCliente} />
    </div>
  );
}
