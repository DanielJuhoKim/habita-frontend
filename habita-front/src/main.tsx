import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard";
import Pagamentos from "./Pagamentos";
import Imoveis  from "./Imoveis";
import Login from "./Login";

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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
