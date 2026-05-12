import { useNavigate } from "react-router-dom";

import {
  Bell,
  LayoutDashboard,
  FileText,
  LineChart,
  Building2,
  Users,
  Settings,
} from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Base({ children }: LayoutProps) {
  const navegador = useNavigate();

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
      label: "Relatórios",
      path: "/relatorios",
      atual: false,
      icone: LineChart,
    }
  ];

  const rotas_baixo = [
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
    },
    {
      label: "Configurações",
      path: "/configuracoes",
      atual: false,
      icone: Settings,
    }
  ];

  return (
    <div className="app">
      <aside className="barra_opcoes">
        <div className="barra_opcoes-titulo">
          <div className="logo_habita">H</div>
          <span className="titulo">Habita</span>
        </div>

        <div className="barra_opcoes-divider" />

        <nav className="barra_opcoes-nav">
          {rotas_cima.map((it) => (
            <button
              key={it.label}
              className={`nav-item ${it.atual ? "atual" : ""}`}
              onClick={() => navegador(it.path)}
            >
              <it.icone size={20} />
              {it.label}
            </button>
          ))}

          <div className="nav-sep" />

          {rotas_baixo.map((it) => (
            <button
              key={it.label}
              className={`nav-item ${it.atual ? "atual" : ""}`}
              onClick={() => navegador(it.path)}
            >
              <it.icone size={20} />
              {it.label}
            </button>
          ))}
        </nav>

        <div className="barra_opcoes-divider" />

        <div className="barra_opcoes-user">
          <div className="avatar">S</div>

          <div>
            <p className="user-name">Silvia</p>
            <p className="user-plan">Plano Premium</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="header">
          <div>
            <h1>Bem vinda Silvia</h1>
            <p>Terça-Feira, 13 de junho de 2026 - 13/06/26</p>
          </div>

          <button className="notif-btn">
            Notificações <Bell size={16} />
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}