import React, { useState } from 'react';
import ListaDependentes from '../components/ListaDependentes';
import FormDependente from '../components/FormDependente';

export default function Dependentes() {
  const [clientes, setClientes] = useState([]);
  const [dependentes, setDependentes] = useState([]);

  function adicionarDependente(dependente) {
    setDependentes([...dependentes, { ...dependente, id: Date.now() }]);
  }

  return (
    <div>
      <h2>Dependentes</h2>
      <FormDependente clientes={clientes} onSalvar={adicionarDependente} />
      <ListaDependentes dependentes={dependentes} clientes={clientes} />
    </div>
  );
}
