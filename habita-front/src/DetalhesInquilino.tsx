import { useState } from "react";
import "./DetalhesInquilino.css";
import Base from "./Base";
import { useNavigate } from "react-router-dom";

type Status = "adimplente" | "atraso" | "pendente";

type Pagamento = {
  competencia: string;
  vencimento: string;
  valor: number;
  status: "pago" | "atraso" | "pendente";
  imovel: string;
};

type ImovelVinculado = {
  endereco: string;
  tipo: string;
  contrato: string;
  aluguel: number;
  status: Status;
};

type Documento = {
  nome: string;
  tipo: string;
  data: string;
};

type Evento = {
  data: string;
  titulo: string;
  descricao: string;
  tipo: "pagamento" | "contrato" | "manutencao" | "mensagem";
};

type Inquilino = {
  nome: string;
  iniciais: string;
  email: string;
  telefone: string;
  cpf: string;
  nascimento: string;
  desde: string;
  status: Status;
  scoreAdimplencia: number;
  totalPago: number;
  pendente: number;
  imoveis: ImovelVinculado[];
  pagamentos: Pagamento[];
  documentos: Documento[];
  eventos: Evento[];
  observacoes: string;
};

const inquilino: Inquilino = {
  nome: "Ana Beatriz Souza",
  iniciais: "AB",
  email: "ana.souza@email.com",
  telefone: "(11) 98765-4321",
  cpf: "123.456.789-00",
  nascimento: "12/04/1990",
  desde: "Mar 2023",
  status: "adimplente",
  scoreAdimplencia: 96,
  totalPago: 78400,
  pendente: 0,
  imoveis: [
    {
      endereco: "Rua das Flores, 120 — Apto 32",
      tipo: "Apartamento",
      contrato: "01/03/2023 — 28/02/2026",
      aluguel: 2800,
      status: "adimplente",
    },
    {
      endereco: "Av. Paulista, 1500 — Sala 8",
      tipo: "Comercial",
      contrato: "10/06/2024 — 09/06/2027",
      aluguel: 4200,
      status: "adimplente",
    },
  ],
  pagamentos: [
    { competencia: "Mai/2026", vencimento: "10/05/2026", valor: 2800, status: "pago", imovel: "Rua das Flores, 120" },
    { competencia: "Mai/2026", vencimento: "10/05/2026", valor: 4200, status: "pago", imovel: "Av. Paulista, 1500" },
    { competencia: "Abr/2026", vencimento: "10/04/2026", valor: 2800, status: "pago", imovel: "Rua das Flores, 120" },
    { competencia: "Abr/2026", vencimento: "10/04/2026", valor: 4200, status: "pago", imovel: "Av. Paulista, 1500" },
    { competencia: "Mar/2026", vencimento: "10/03/2026", valor: 2800, status: "pago", imovel: "Rua das Flores, 120" },
    { competencia: "Mar/2026", vencimento: "10/03/2026", valor: 4200, status: "pago", imovel: "Av. Paulista, 1500" },
  ],
  documentos: [
    { nome: "Contrato — Rua das Flores", tipo: "PDF", data: "01/03/2023" },
    { nome: "RG e CPF", tipo: "PDF", data: "28/02/2023" },
    { nome: "Comprovante de renda", tipo: "PDF", data: "28/02/2023" },
    { nome: "Contrato — Av. Paulista", tipo: "PDF", data: "10/06/2024" },
  ],
  eventos: [
    { data: "10/05/2026", titulo: "Pagamento recebido", descricao: "R$ 7.000,00 referente a Mai/2026", tipo: "pagamento" },
    { data: "02/05/2026", titulo: "Mensagem enviada", descricao: "Lembrete de vencimento próximo", tipo: "mensagem" },
    { data: "18/04/2026", titulo: "Manutenção solicitada", descricao: "Vazamento na pia da cozinha — Rua das Flores", tipo: "manutencao" },
    { data: "10/06/2024", titulo: "Novo contrato", descricao: "Contrato assinado para Av. Paulista, 1500", tipo: "contrato" },
  ],
  observacoes:
    "Inquilino pontual, sem histórico de atrasos. Prefere contato por WhatsApp. Solicita reparos via portal.",
};

type Aba = "visao" | "pagamentos" | "imoveis" | "documentos" | "historico";

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const statusLabel: Record<Status, string> = {
  adimplente: "Adimplente",
  atraso: "Em atraso",
  pendente: "Pendente",
};

export default function DetalhesInquilino() {
  const [aba, setAba] = useState<Aba>("visao");
  const navigate = useNavigate();

  return (
    <Base>
        <div className="card panel" >
        <div className="inq-header">
            <button className="btn-back" aria-label="Voltar">← Voltar</button>
            <div className="inq-id">
            <div className="inq-avatar-lg">{inquilino.iniciais}</div>
            <div>
                <h1>{inquilino.nome}</h1>
                <p className="muted">Inquilino desde {inquilino.desde}</p>
            </div>
            <span className={`inq-badge inq-badge--${inquilino.status}`}>
                {statusLabel[inquilino.status]}
            </span>
            </div>
            <div className="inq-actions">
            <button className="btn-ghost">Mensagem</button>
            <button className="btn-edit">Editar</button>
            </div>
        </div>

        <div className="inq-scroll">
            <div className="inq-metrics">
            <div className="metric">
                <span className="metric-label">Adimplência</span>
                <strong className="metric-value">{inquilino.scoreAdimplencia}%</strong>
            </div>
            <div className="metric">
                <span className="metric-label">Total pago</span>
                <strong className="metric-value">{fmtBRL(inquilino.totalPago)}</strong>
            </div>
            <div className="metric">
                <span className="metric-label">Pendente</span>
                <strong className="metric-value">{fmtBRL(inquilino.pendente)}</strong>
            </div>
            <div className="metric">
                <span className="metric-label">Imóveis vinculados</span>
                <strong className="metric-value">{inquilino.imoveis.length}</strong>
            </div>
            </div>

            <div className="inq-grid">
            <section className="box">
                <h3>Contato</h3>
                <ul className="info-list">
                <li><span>E-mail</span><strong>{inquilino.email}</strong></li>
                <li><span>Telefone</span><strong>{inquilino.telefone}</strong></li>
                <li><span>CPF</span><strong>{inquilino.cpf}</strong></li>
                <li><span>Nascimento</span><strong>{inquilino.nascimento}</strong></li>
                </ul>
            </section>

            <section className="box">
                <h3>Observações</h3>
                <p className="obs">{inquilino.observacoes}</p>
            </section>
            </div>

            <div className="inq-tabs" role="tablist">
            {([
                ["visao", "Visão geral"],
                ["pagamentos", "Pagamentos"],
                ["imoveis", "Imóveis"],
                ["documentos", "Documentos"],
                ["historico", "Histórico"],
            ] as [Aba, string][]).map(([k, l]) => (
                <button
                key={k}
                role="tab"
                className={`tab ${aba === k ? "tab--active" : ""}`}
                onClick={() => setAba(k)}
                >
                {l}
                </button>
            ))}
            </div>

            <section className="tab-content">
            {aba === "visao" && (
                <div className="inq-grid">
                <div className="box">
                    <h3>Próximos vencimentos</h3>
                    <ul className="info-list">
                    {inquilino.imoveis.map((im, i) => (
                        <li key={i}>
                        <span>{im.endereco}</span>
                        <strong>{fmtBRL(im.aluguel)}</strong>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="box">
                    <h3>Últimos eventos</h3>
                    <ul className="timeline">
                    {inquilino.eventos.slice(0, 3).map((e, i) => (
                        <li key={i}>
                        <span className={`dot dot--${e.tipo}`} />
                        <div>
                            <strong>{e.titulo}</strong>
                            <p className="muted">{e.data} — {e.descricao}</p>
                        </div>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            )}

            {aba === "pagamentos" && (
                <table className="inq-table">
                <thead>
                    <tr>
                    <th>Competência</th>
                    <th>Vencimento</th>
                    <th>Imóvel</th>
                    <th>Valor</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {inquilino.pagamentos.map((p, i) => (
                    <tr key={i}>
                        <td>{p.competencia}</td>
                        <td>{p.vencimento}</td>
                        <td>{p.imovel}</td>
                        <td>{fmtBRL(p.valor)}</td>
                        <td><span className={`pill pill--${p.status}`}>{p.status}</span></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}

            {aba === "imoveis" && (
                <div className="imoveis-list">
                {inquilino.imoveis.map((im, i) => (
                    <div key={i} className="imovel-row">
                    <div>
                        <strong>{im.endereco}</strong>
                        <p className="muted">{im.tipo} · Contrato {im.contrato}</p>
                    </div>
                    <div className="imovel-row__right">
                        <strong>{fmtBRL(im.aluguel)}</strong>
                        <span className={`inq-badge inq-badge--${im.status}`}>
                        {statusLabel[im.status]}
                        </span>
                        <button className="btn-edit" onClick={() => navigate("/imoveis/7") }>Ver imóvel</button>
                    </div>
                    </div>
                ))}
                </div>
            )}

            {aba === "documentos" && (
                <ul className="docs">
                {inquilino.documentos.map((d, i) => (
                    <li key={i}>
                    <div>
                        <strong>{d.nome}</strong>
                        <p className="muted">{d.tipo} · {d.data}</p>
                    </div>
                    <button className="btn-ghost">Baixar</button>
                    </li>
                ))}
                </ul>
            )}

            {aba === "historico" && (
                <ul className="timeline">
                {inquilino.eventos.map((e, i) => (
                    <li key={i}>
                    <span className={`dot dot--${e.tipo}`} />
                    <div>
                        <strong>{e.titulo}</strong>
                        <p className="muted">{e.data} — {e.descricao}</p>
                    </div>
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
