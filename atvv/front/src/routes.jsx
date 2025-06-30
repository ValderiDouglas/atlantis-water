import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Dependentes from './pages/Dependentes';
import Acomodacoes from './pages/Acomodacoes';
import Hospedagens from './pages/Hospedagens';
import MenuNavegacao from './components/MenuNavegacao';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MenuNavegacao />
      <Routes>
        <Route path="/" element={<Navigate to="/clientes" />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/dependentes" element={<Dependentes />} />
        <Route path="/acomodacoes" element={<Acomodacoes />} />
        <Route path="/hospedagens" element={<Hospedagens />} />
      </Routes>
    </BrowserRouter>
  );
}
