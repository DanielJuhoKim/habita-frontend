import "./Dashboard.css";
import Base from "./Base";

import {
  Filter, Crosshair, AlertOctagon, AlertTriangle,
} from "lucide-react";

const stats = [
  { label: "Pagamento efetuado", value: "R$ 7.839,37", note: "14 Boletos pagos", tone: "ok" },
  { label: "Pagamento pendente", value: "R$ 3.473,81", note: "7 Boletos pendentes", tone: "pending" },
  { label: "Pagamento atrasado", value: "R$ 621,34", note: "3 Boletos atrasados", tone: "late" },
  { label: "Imóveis ativos", value: "7", note: "de 9 imóveis cadastrados", tone: "muted" },
];

const imoveis = [
  { addr: "Rua das Palmeiras, 210 — Casa", tenant: "João Silva", status: "Em dia", tone: "ok", value: "R$ 1.087,91", date: "Efetuado em 01/06/26" },
  { addr: "Av. Central, 890 — Apt 45", tenant: "Ana Costa", status: "Pendente", tone: "pending", value: "R$ 982,71", date: "Vence em 21/07/26" },
  { addr: "Rua João Pedro, 700 - Apt 203", tenant: "Fernanda Ribeira", status: "Atrasado", tone: "late", value: "R$ 207,67", date: "Vencido em 03/06/26" },
  { addr: "Av.Ribeiro, 861", tenant: "Carlos Mendes", status: "Em dia", tone: "ok", value: "R$ 1.420,00", date: "Efetuado em 28/05/26" },
  { addr: "Rua Verde, 312 — Apt 12", tenant: "Marina Souza", status: "Pendente", tone: "pending", value: "R$ 890,00", date: "Vence em 15/07/26" },
  { addr: "Av. Brasil, 1500 — Sala 8", tenant: "Pedro Lima", status: "Em dia", tone: "ok", value: "R$ 2.100,00", date: "Efetuado em 03/06/26" },
];

const alertas = [
  { icon: Crosshair, title: "I.A: Boleto não emitido - Av.Santos, 351", desc: "Já faz 3 dias que o boleto da conta de luz do apt 27 da não foi…", time: "Hoje, 10:00", tone: "muted" },
  { icon: AlertOctagon, title: "Conta de luz atrasada - R.Faria Lima, 681", desc: "Apt 096 está com 13 dias de atraso", tone: "late" },
  { icon: AlertTriangle, title: "Vencimento em 9 dias - R. Bela Vista, 06", desc: "Conta de gás do apt 97 pendente, vencimento previsto para…", tone: "pending" },
  { icon: AlertOctagon, title: "Aluguel atrasado - Rua João Pedro, 700", desc: "Inquilino Fernanda Ribeira — 5 dias de atraso", tone: "late" },
  { icon: AlertTriangle, title: "Manutenção agendada - Av. Central, 890", desc: "Visita técnica marcada para 22/07/26", tone: "pending" },
];

const movimentacoes = [
  { dot: "ok", title: "Pix recebido - Ana Costa", value: "+R$ 301,56", date: "07/06/26" },
  { dot: "late", title: "Pagamento ComGás(Com atraso) - R.Henrique da Costa, 971/Apt 98", value: "-R$ 94,62", date: "07/06/26" },
  { dot: "ok", title: "Pix recebido - Renato Oliveira", value: "+R$ 213,12", date: "06/06/26" },
  { dot: "ok", title: "Imóvel Apt 97, Av.Barros - Cadastrado", value: "-", date: "06/06/26" },
  { dot: "pending", title: "Pagamento Enel - Av.Ribeiro, 861/Apt 97", value: "-R$ 68,38", date: "06/06/26" },
  { dot: "ok", title: "Aluguel pago - Rua das Palmeiras", value: "+R$ 119,95", date: "05/06/26" },
  { dot: "ok", title: "Pix recebido - Marina Souza", value: "+R$ 890,00", date: "05/06/26" },
  { dot: "late", title: "Multa atraso - Rua João Pedro, 700", value: "-R$ 22,40", date: "04/06/26" },
];


export default function Dashboard() {
  return (
    <Base>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="card stat">
            <p className="stat-label">{s.label}</p>
            <p className="stat-value">{s.value}</p>
            <p className={`stat-note tone-${s.tone}`}>{s.note}</p>
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
            {imoveis.map((it, i) => (
              <div key={i} className="row">
                <div className="row-main">
                  <p className="titulo-objeto">{it.addr}</p>
                  <p className="desc-objeto">Inquilino: {it.tenant}</p>
                </div>
                <span className={`badge badge-${it.tone}`}>{it.status}</span>
                <div className="valor-imovel">
                  <p className="v">{it.value}</p>
                  <p className="d">{it.date}</p>
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
            {alertas.map((a, i) => (
              <div key={i} className="alert-row">
                <div className={`alert-icon ${a.tone}`}><a.icon size={20} /></div>
                <div className="row-main">
                  <p className="titulo-objeto">{a.title}</p>
                  <p className="desc-objeto">{a.desc}</p>
                  {a.time && <p className="info-data">{a.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card panel" style={{ flex: 1, minHeight: 0 }}>
        <div className="objetos"><h2>Movimentações recentes</h2></div>
        <div className="scroll" style={{ padding: 8 }}>
          <div className="mov-grid">
            {movimentacoes.map((m, i) => (
              <div key={i} className="movimentacoes">
                <div className="mov-left">
                  <span className={`dot dot-${m.dot}`} />
                  <p className="mov-title">{m.title}</p>
                </div>
                <div className="mov-right">
                  <p className={`mov-valor`}>{m.value}</p>
                  <p className="mov-date">{m.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
}
