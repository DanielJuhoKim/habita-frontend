import { useNavigate, useLocation } from "react-router-dom";

import {
  Bell,
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  Settings,
  Plus
} from "lucide-react";

import { dataAtual } from "./constantes";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Base({ children }: LayoutProps) {
  const navigate = useNavigate();

  const rotas_cima = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icone: LayoutDashboard,
      atual: true,
    },
    {
      label: "Pagamentos",
      path: "/pagamentos",
      atual: false,
      icone: FileText,
    },
    {
      label: "Imóveis",
      path: "/imoveis",
      atual: false,
      icone: Building2,
    },
    {
      label: "Inquilinos",
      path: "/inquilinos",
      atual: false,
      icone: Users,
    }
  ];

  const rotas_baixo = [
    {
      label: "Novo imóvel",
      path: "/imoveis/new",
      atual: false,
      icone: Plus,
    },
    {
      label: "Configurações",
      path: "/configuracoes",
      atual: false,
      icone: Settings,
    }
  ];
  const location = useLocation();

  return (
    <div className="app">
      <aside className="barra_opcoes">
        <button type="button" className="barra_opcoes-titulo" onClick={() => navigate("/dashboard")}>
          <div className="logo_habita">H</div>
          <span className="titulo">Habita</span>
        </button>

        <div className="barra_opcoes-divider" />

        <nav className="barra_opcoes-nav">
          {rotas_cima.map((it) => (
            <button
              key={it.label}
              className={`nav-item ${location.pathname === it.path ? "atual" : ""
            }`}
              onClick={() => navigate(it.path)}
            >
              <it.icone size={20} />
              {it.label}
            </button>
          ))}

          <div className="nav-sep" />

          {rotas_baixo.map((it) => (
            <button
              key={it.label}
              className={`nav-item ${
              location.pathname === it.path ? "atual" : ""
            }`}
              onClick={() => navigate(it.path)}
            >
              <it.icone size={20} />
              {it.label}
            </button>
          ))}
        </nav>

        <div className="barra_opcoes-divider" />

        <button className="barra_opcoes-user" onClick={() => navigate("/usuario")}>
          <div className="avatar">S</div>

          <div>
            <p className="user-name">Silvia</p>
            <p className="user-plan">Plano Premium</p>
          </div>
        </button>
      </aside>

      <main className="main">
        <div className="header">
          <div>
            <h1>Bem vinda Silvia</h1>
            <p>Quinta-Feira, {dataAtual.toLocaleDateString("pt-BR")}</p>
          </div>

          <button className="notif-btn" onClick={ () => navigate(`/notificacao`) }>
            Notificações <Bell size={16} />
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}