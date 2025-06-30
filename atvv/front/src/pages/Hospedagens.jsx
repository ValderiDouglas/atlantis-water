import React, { useState, useEffect } from 'react';
import ListaHospedagens from '../components/ListaHospedagens';
import FormHospedagem from '../components/FormHospedagem';

const API_HOSPEDAGENS = 'http://localhost:5000/hospedagens';
const API_CLIENTES = 'http://localhost:5000/clientes';
const API_DEPENDENTES = 'http://localhost:5000/dependentes';
const API_ACOMODACOES = 'http://localhost:5000/acomodacoes';

export default function Hospedagens() {
  const [hospedagens, setHospedagens] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [dependentes, setDependentes] = useState([]);
  const [acomodacoes, setAcomodacoes] = useState([]);

  useEffect(() => {
    fetch(API_HOSPEDAGENS).then(res => res.json()).then(setHospedagens).catch(() => setHospedagens([]));
    fetch(API_CLIENTES).then(res => res.json()).then(setClientes).catch(() => setClientes([]));
    fetch(API_DEPENDENTES).then(res => res.json()).then(setDependentes).catch(() => setDependentes([]));
    fetch(API_ACOMODACOES).then(res => res.json()).then(setAcomodacoes).catch(() => setAcomodacoes([]));
  }, []);

  function adicionarHospedagem(hospedagem) {
    const payload = {
      titular_id: Number(hospedagem.titular),
      acomodacao_id: Number(hospedagem.acomodacao),
      data_entrada: new Date().toISOString().slice(0, 10),
      dependentes: hospedagem.dependentes.map(Number)
    };
    fetch(API_HOSPEDAGENS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(novo => setHospedagens([...hospedagens, novo]));
  }

  function finalizarHospedagem(id) {
    const data_saida = new Date().toISOString().slice(0, 10);
    fetch(`${API_HOSPEDAGENS}/${id}/finalizar`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data_saida })
    })
      .then(res => res.json())
      .then(atualizada => setHospedagens(hospedagens.map(h => h.id === id ? { ...h, data_saida: atualizada.data_saida } : h)));
  }

  return (
    <div>
      <h2>Hospedagens</h2>
      <FormHospedagem onSalvar={adicionarHospedagem} clientes={clientes} dependentes={dependentes} acomodacoes={acomodacoes} />
      <ListaHospedagens
        hospedagens={hospedagens}
        clientes={clientes}
        dependentes={dependentes}
        acomodacoes={acomodacoes}
        onFinalizar={finalizarHospedagem}
      />
    </div>
  );
}
