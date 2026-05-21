import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard";
import Pagamentos from "./Pagamentos";
import Imoveis  from "./Imoveis";
import DetalhesImovel from "./DetalhesImovel";
import Login from "./Login";
import Inquilinos from "./Inquilinos";
import DetalhesInquilino from "./DetalhesInquilino";
import AdicionarImovel from "./AdicionarImovel";
import Notificacoes from "./Notificacao";
import PerfilUsuario from "./PerfilUsuario";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/pagamentos" element={<Pagamentos />} />

        <Route path="/imoveis" element={<Imoveis />} />
        <Route path="/imoveis/:id_imovel" element={<DetalhesImovel />} />
        <Route path="/imoveis/new" element={<AdicionarImovel />} />

        <Route path="/inquilinos" element={<Inquilinos />} />
        <Route path="/inquilinos/:id_inquilino" element={<DetalhesInquilino />} />

        <Route path="/notificacao" element={<Notificacoes />} />

        <Route path="/usuario" element={<PerfilUsuario />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
