import React, { useState } from 'react';
import ListaAcomodacoes from '../components/ListaAcomodacoes';
import FormAcomodacao from '../components/FormAcomodacao';

export default function Acomodacoes() {
  const [acomodacoes, setAcomodacoes] = useState([]);

  function adicionarAcomodacao(acomodacao) {
    setAcomodacoes([...acomodacoes, { ...acomodacao, id: Date.now() }]);
  }

  return (
    <div>
      <h2>Acomodações</h2>
      <FormAcomodacao onSalvar={adicionarAcomodacao} />
      <ListaAcomodacoes acomodacoes={acomodacoes} />
    </div>
  );
}
