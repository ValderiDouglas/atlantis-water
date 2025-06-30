import React, { useState, useEffect } from 'react';
import ListaAcomodacoes from '../components/ListaAcomodacoes';
import FormAcomodacao from '../components/FormAcomodacao';

const API_URL = 'http://localhost:5000/acomodacoes';

export default function Acomodacoes() {
  const [acomodacoes, setAcomodacoes] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setAcomodacoes)
      .catch(() => setAcomodacoes([]));
  }, []);

  function adicionarAcomodacao(acomodacao) {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(acomodacao)
    })
      .then(res => res.json())
      .then(novo => setAcomodacoes([...acomodacoes, novo]));
  }

  function atualizarAcomodacao(acomodacao) {
    fetch(`${API_URL}/${acomodacao.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(acomodacao)
    })
      .then(res => res.json())
      .then(atualizada => {
        setAcomodacoes(acomodacoes.map(a => a.id === atualizada.id ? atualizada : a));
        setEditando(null);
      });
  }

  function removerAcomodacao(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setAcomodacoes(acomodacoes.filter(a => a.id !== id)));
  }

  function editarAcomodacao(acomodacao) {
    setEditando(acomodacao);
  }

  return (
    <div>
      <h2>Acomodações</h2>
      <FormAcomodacao onSalvar={editando ? atualizarAcomodacao : adicionarAcomodacao} acomodacao={editando} onCancelar={() => setEditando(null)} />
      <ListaAcomodacoes acomodacoes={acomodacoes} onEditar={editarAcomodacao} onRemover={removerAcomodacao} />
    </div>
  );
}
