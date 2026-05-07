import {
  Bell,
  LayoutDashboard,
  FileText,
  LineChart,
  Building2,
  Users,
  Settings,
} from "lucide-react";

const navTop = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "Pagamentos" },
  { icon: LineChart, label: "Relatórios" },
];

const navBottom = [
  { icon: Building2, label: "Imóveis" },
  { icon: Users, label: "Inquilinos" },
  { icon: Settings, label: "Configurações" },
];

type LayoutProps = {
  children: React.ReactNode;
};

export default function Base({ children }: LayoutProps) {
  return (
    <div className="app">
      <aside className="barra_opcoes">
        <div className="barra_opcoes-titulo">
          <div className="logo_habita">H</div>
          <span className="titulo">Habita</span>
        </div>

        <div className="barra_opcoes-divider" />

        <nav className="barra_opcoes-nav">
          {navTop.map((it) => (
            <button
              key={it.label}
              className={`nav-item ${it.active ? "active" : ""}`}
            >
              <it.icon size={20} />
              {it.label}
            </button>
          ))}

          <div className="nav-sep" />

          {navBottom.map((it) => (
            <button key={it.label} className="nav-item">
              <it.icon size={20} />
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
            <p>Terça-Feira, 17 de agosto de 2026</p>
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