import React, { useState } from 'react';
import ListaHospedagens from '../components/ListaHospedagens';
import FormHospedagem from '../components/FormHospedagem';

export default function Hospedagens() {
  const [hospedagens, setHospedagens] = useState([]);

  function adicionarHospedagem(hospedagem) {
    setHospedagens([...hospedagens, { ...hospedagem, id: Date.now() }]);
  }

  return (
    <div>
      <h2>Hospedagens</h2>
      <FormHospedagem onSalvar={adicionarHospedagem} />
      <ListaHospedagens hospedagens={hospedagens} />
    </div>
  );
}
