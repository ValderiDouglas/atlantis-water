import { Link } from 'react-router-dom';
import './MenuNavegacao.css';

export default function MenuNavegacao() {
  return (
    <nav className="menu-navegacao">
      <ul>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/dependentes">Dependentes</Link></li>
        <li><Link to="/acomodacoes">Acomodações</Link></li>
        <li><Link to="/hospedagens">Hospedagens</Link></li>
      </ul>
    </nav>
  );
}
