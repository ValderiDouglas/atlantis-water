import React, { useState, useEffect } from 'react';
import ListaDependentes from '../components/ListaDependentes';
import FormDependente from '../components/FormDependente';

const API_DEPENDENTES = 'http://localhost:5000/dependentes';
const API_CLIENTES = 'http://localhost:5000/clientes';

export default function Dependentes() {
  const [clientes, setClientes] = useState([]);
  const [dependentes, setDependentes] = useState([]);
  const [dependenteEditando, setDependenteEditando] = useState(null);

  useEffect(() => {
    fetch(API_CLIENTES)
      .then(res => res.json())
      .then(setClientes)
      .catch(() => setClientes([]));
    fetch(API_DEPENDENTES)
      .then(res => res.json())
      .then(setDependentes)
      .catch(() => setDependentes([]));
  }, []);

  function adicionarDependente(dependente) {
    fetch(API_DEPENDENTES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dependente)
    })
      .then(res => res.json())
      .then(novo => setDependentes([...dependentes, novo]));
  }

  function atualizarDependente(depAtualizado) {
    fetch(`${API_DEPENDENTES}/${depAtualizado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(depAtualizado)
    })
      .then(res => res.json())
      .then(atualizado => {
        setDependentes(dependentes.map(d => d.id === atualizado.id ? atualizado : d));
        setDependenteEditando(null);
      });
  }

  function removerDependente(id) {
    fetch(`${API_DEPENDENTES}/${id}`, { method: 'DELETE' })
      .then(() => setDependentes(dependentes.filter(d => d.id !== id)));
  }

  function editarDependente(dep) {
    setDependenteEditando(dep);
  }

  return (
    <div>
      <h2>Dependentes</h2>
      <FormDependente clientes={clientes} onSalvar={dependenteEditando ? atualizarDependente : adicionarDependente} dependente={dependenteEditando} onCancelar={() => setDependenteEditando(null)} />
      <ListaDependentes dependentes={dependentes} clientes={clientes} onEditar={editarDependente} onRemover={removerDependente} />
    </div>
  );
}
