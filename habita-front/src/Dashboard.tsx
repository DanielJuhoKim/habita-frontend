import "./Dashboard.css";
import Base from "./Base";

import { Filter } from "lucide-react";

import { statsDashboard as stats, imoveis, alertas, movimentacoes, pendenciaTotal, getInquilino, getStatusImovel } from "./constantes"

export default function Dashboard() {
  return (
    <Base>
      <div className="stats">
        {stats.map((stat) => (
          <div key={stat.label} className="card stat">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">
              {
              stat.label !== "Imóveis ativos"
              ? `R$ ${stat.value}`
              : stat.value
              }</p>
            <p className={`stat-note corStat-${stat.corStat}`}>{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="middle">
        <div className="card panel">
          <div className="objetos">
            <h2>Meus imóveis</h2>
            <button className="filtro-bt"><Filter size={14} /> Filtros</button>
          </div>
          <div className="scroll">
            {imoveis.map((imovel, i) => (

              <div key={i} className="row">
                <div className="row-main">
                  <p className="titulo-objeto">{imovel.logradouro + " — " + imovel.complemento}</p>
                  <p className="desc-objeto">Inquilino: {getInquilino(imovel.inquilino)?.nome}</p>
                </div>

                <span className={`badge badge-${imovel.dashboard.corStat}`}>{getStatusImovel(imovel)}</span>
                <div className="valor-imovel">
                  <p className="v">{"R$ " + pendenciaTotal(imovel)}</p>
                  <p className="d">{imovel.dashboard.date.toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card panel">
          <div className="objetos">
            <h2>Alertas e Avisos</h2>
            <button className="filtro-bt"><Filter size={14} /> Filtros</button>
          </div>
          <div className="scroll">
            {alertas.map((alert, i) => (
              <div key={i} className="alert-row">
                <div className={`alert-icon ${alert.corStat}`}><alert.icon size={20} /></div>
                <div className="row-main">
                  <p className="titulo-objeto">{alert.title}</p>
                  <p className="desc-objeto">{alert.desc}</p>
                  {alert.time && <p className="info-data">{alert.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card panel">
        <div className="objetos"><h2>Movimentações recentes</h2></div>
        <div className="scroll" style={{ padding: 8 }}>
          <div className="mov-grid">
            {movimentacoes.map((movment, i) => (
              <div key={i} className="movimentacoes">
                <div className="mov-left">
                  <span className={`dot dot-${movment.dot}`} />
                  <p className="mov-title">{movment.desc}</p>
                </div>
                <div className="mov-right">
                  <p className={`mov-valor`}>{"R$ " + movment.value}</p>
                  <p className="mov-date">{movment.date.toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
}
