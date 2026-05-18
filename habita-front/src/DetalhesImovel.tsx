import { useState } from "react";
import "./DetalhesImovel.css";
import Base from "./Base";
import { useNavigate } from "react-router-dom";

type Status = "ok" | "atraso" | "pendente";

type Pagamento = {
  mes: string;
  valor: number;
  status: "pago" | "pendente" | "atraso";
  data?: string;
};

type Manutencao = {
  data: string;
  titulo: string;
  custo: number;
  status: "concluida" | "em-andamento" | "agendada";
};

type Documento = {
  nome: string;
  tipo: string;
  tamanho: string;
};

type Imovel = {
  endereco: string;
  tipo: string;
  inquilino: {
    nome: string;
    email: string;
    telefone: string;
    desde: string;
  };
  contrato: {
    inicio: string;
    fim: string;
    valor: number;
    reajuste: string;
    caucao: number;
  };
  metricas: {
    gastoMes: number;
    pendente: number;
    adimplencia: number;
    receitaAno: number;
  };
  status: Status;
  caracteristicas: {
    area: string;
    quartos: number;
    banheiros: number;
    vagas: number;
  };
  pagamentos: Pagamento[];
  manutencoes: Manutencao[];
  documentos: Documento[];
};

const imovel: Imovel = {
  endereco: "Rua das Palmeiras, 210",
  tipo: "Casa",
  inquilino: {
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    desde: "Mar 2023",
  },
  contrato: {
    inicio: "01/03/2023",
    fim: "28/02/2026",
    valor: 2800,
    reajuste: "IGP-M anual",
    caucao: 8400,
  },
  metricas: {
    gastoMes: 312.4,
    pendente: 0,
    adimplencia: 98,
    receitaAno: 33600,
  },
  status: "ok",
  caracteristicas: {
    area: "120 m²",
    quartos: 3,
    banheiros: 2,
    vagas: 2,
  },
  pagamentos: [
    { mes: "Mai 2026", valor: 2800, status: "pendente" },
    { mes: "Abr 2026", valor: 2800, status: "pago", data: "05/04" },
    { mes: "Mar 2026", valor: 2800, status: "pago", data: "03/03" },
    { mes: "Fev 2026", valor: 2800, status: "pago", data: "04/02" },
    { mes: "Jan 2026", valor: 2800, status: "pago", data: "06/01" },
    { mes: "Dez 2025", valor: 2800, status: "pago", data: "05/12" },
  ],
  manutencoes: [
    { data: "12/04/2026", titulo: "Reparo no encanamento", custo: 280, status: "concluida" },
    { data: "28/03/2026", titulo: "Pintura externa", custo: 1500, status: "em-andamento" },
    { data: "20/05/2026", titulo: "Limpeza de caixa d'água", custo: 350, status: "agendada" },
  ],
  documentos: [
    { nome: "Contrato de locação.pdf", tipo: "PDF", tamanho: "1.2 MB" },
    { nome: "RG do inquilino.pdf", tipo: "PDF", tamanho: "320 KB" },
    { nome: "Comprovante de renda.pdf", tipo: "PDF", tamanho: "180 KB" },
    { nome: "Vistoria inicial.pdf", tipo: "PDF", tamanho: "2.4 MB" },
  ],
};

function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

type Aba = "visao" | "pagamentos" | "manutencoes" | "documentos";

export default function DetalhesImovel() {
  const [aba, setAba] = useState<Aba>("visao");
  const navigate = useNavigate();
  
  return (
    <Base>
      <div className="card panel id-panel" >
        <div className="id-header">
          {/* <button className="voltar-tela">
            ← Voltar
            </button> */}
          <div className="id-title-block">
            <div className="id-title-row">
              <h2>{imovel.endereco}</h2>
              <span className={`id-badge id-badge--${imovel.status}`}>
                {imovel.status === "ok" && "Em dia"}
                {imovel.status === "atraso" && "Em atraso"}
                {imovel.status === "pendente" && "Pendente"}
              </span>
            </div>
            <p className="id-sub">
              {imovel.tipo} · {imovel.caracteristicas.area} · {imovel.caracteristicas.quartos} quartos · {imovel.caracteristicas.banheiros} banheiros · {imovel.caracteristicas.vagas} vagas
            </p>
          </div>
          <div className="id-actions">
            <button className="btn-editar">Editar</button>
            
            <button className="btn-inquilino" onClick={() => navigate(
              `/inquilinos/7`
            )
          }>Ver inquilino</button>
          </div>
        </div>

        <div className="scroll id-scroll">
          <div className="id-metrics">
            <div className="id-metric">
              <span className="id-metric-label">GASTO NO MÊS</span>
              <strong>{brl(imovel.metricas.gastoMes)}</strong>
              <span className="id-metric-foot">Dentro do previsto</span>
            </div>
            <div className="id-metric">
              <span className="id-metric-label">PENDENTE</span>
              <strong>{brl(imovel.metricas.pendente)}</strong>
              <span className="id-metric-foot">——</span>
            </div>
            <div className="id-metric">
              <span className="id-metric-label">ADIMPLÊNCIA</span>
              <strong>{imovel.metricas.adimplencia}%</strong>
              <span className="id-metric-foot">Últimos 12 meses</span>
            </div>
            <div className="id-metric">
              <span className="id-metric-label">RECEITA / ANO</span>
              <strong>{brl(imovel.metricas.receitaAno)}</strong>
              <span className="id-metric-foot">Projeção 2026</span>
            </div>
          </div>

          <div className="id-grid">
            <section className="id-box">
              <h3>Inquilino</h3>
              <div className="id-tenant">
                <div className="id-avatar">{imovel.inquilino.nome.split(" ").map(n => n[0]).slice(0,2).join("")}</div>
                <div>
                  <strong>{imovel.inquilino.nome}</strong>
                  <span>Inquilino desde {imovel.inquilino.desde}</span>
                </div>
              </div>
              <ul className="id-list">
                <li><span>E-mail</span><span>{imovel.inquilino.email}</span></li>
                <li><span>Telefone</span><span>{imovel.inquilino.telefone}</span></li>
              </ul>
            </section>

            <section className="id-box">
              <h3>Contrato</h3>
              <ul className="id-list">
                <li><span>Início</span><span>{imovel.contrato.inicio}</span></li>
                <li><span>Fim</span><span>{imovel.contrato.fim}</span></li>
                <li><span>Aluguel</span><span>{brl(imovel.contrato.valor)}</span></li>
                <li><span>Reajuste</span><span>{imovel.contrato.reajuste}</span></li>
                <li><span>Caução</span><span>{brl(imovel.contrato.caucao)}</span></li>
              </ul>
            </section>
          </div>

          <div className="id-tabs">
            <button className={aba === "visao" ? "active" : ""} onClick={() => setAba("visao")}>Visão geral</button>
            <button className={aba === "pagamentos" ? "active" : ""} onClick={() => setAba("pagamentos")}>Pagamentos</button>
            <button className={aba === "manutencoes" ? "active" : ""} onClick={() => setAba("manutencoes")}>Manutenções</button>
            <button className={aba === "documentos" ? "active" : ""} onClick={() => setAba("documentos")}>Documentos</button>
          </div>

          <section className="id-box id-tab-content">
            {aba === "visao" && (
              <div className="id-overview">
                <div>
                  <h4>Próximos eventos</h4>
                  <ul className="id-events">
                    <li><span className="dot dot-pending" /> Conta de água vence em 8 dias</li>
                    <li><span className="dot dot-ok" /> Aluguel de Maio em 5 dias</li>
                    <li><span className="dot dot-pending" /> Vistoria semestral em 22 dias</li>
                  </ul>
                </div>
                <div>
                  <h4>Resumo financeiro</h4>
                  <ul className="id-list">
                    <li><span>Receita acumulada</span><span>{brl(14000)}</span></li>
                    <li><span>Despesas (ano)</span><span>{brl(2180)}</span></li>
                    <li><span>Resultado líquido</span><span>{brl(11820)}</span></li>
                  </ul>
                </div>
              </div>
            )}

            {aba === "pagamentos" && (
              <table className="id-table">
                <thead>
                  <tr><th>Mês</th><th>Valor</th><th>Pago em</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {imovel.pagamentos.map((p, i) => (
                    <tr key={i}>
                      <td>{p.mes}</td>
                      <td>{brl(p.valor)}</td>
                      <td>{p.data ?? "—"}</td>
                      <td><span className={`pill pill-${p.status}`}>{p.status === "pago" ? "Pago" : p.status === "pendente" ? "Pendente" : "Atraso"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {aba === "manutencoes" && (
              <table className="id-table">
                <thead>
                  <tr><th>Data</th><th>Serviço</th><th>Custo</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {imovel.manutencoes.map((m, i) => (
                    <tr key={i}>
                      <td>{m.data}</td>
                      <td>{m.titulo}</td>
                      <td>{brl(m.custo)}</td>
                      <td><span className={`pill pill-${m.status}`}>
                        {m.status === "concluida" ? "Concluída" : m.status === "em-andamento" ? "Em andamento" : "Agendada"}
                      </span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {aba === "documentos" && (
              <ul className="id-docs">
                {imovel.documentos.map((d, i) => (
                  <li key={i}>
                    <div className="id-doc-icon">{d.tipo}</div>
                    <div className="id-doc-info">
                      <strong>{d.nome}</strong>
                      <span>{d.tamanho}</span>
                    </div>
                    <button className="btn-ghost">Baixar</button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
      </Base>
  );
}
