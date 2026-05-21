import { useState } from "react";
import "./DetalhesImovel.css";
import Base from "./Base";
import { useNavigate, useParams } from "react-router-dom";

import {
  getImovel,
  getStatusImovel,
  pendenciaTotal,
  gastoMensal,
  getInitials,
  getInquilino,
  atrasoTotal,
  formatarId,
  getAdimplencia,
} from "./constantes";

type Aba = "visao" | "pagamentos" | "documentos";

type Documento = {
  nome: string;
  tipo: string;
  tamanho: string;
};

const documentos: Documento[] = [
  {
    nome: "Contrato de locação.pdf",
    tipo: "PDF",
    tamanho: "1.2 MB",
  },

  {
    nome: "Comprovante de renda.pdf",
    tipo: "PDF",
    tamanho: "380 KB",
  },

  {
    nome: "Vistoria inicial.pdf",
    tipo: "PDF",
    tamanho: "2.1 MB",
  },
];

function brl(v: number) {
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function DTImoveis() {
  const [aba, setAba] = useState<Aba>("visao");

  const navigate = useNavigate();

  const { id_imovel } = useParams();

  const imovel = getImovel(Number(id_imovel));

  if (!imovel) {
    return (
      <Base>
        <div className="card panel imv-panel">
          <div className="imv-empty">
            <h2>Imóvel não encontrado</h2>

            <button
              className="btn-back"
              onClick={() => navigate(-1)}
            >
              ← Voltar
            </button>
          </div>
        </div>
      </Base>
    );
  }

  const inquilino = getInquilino(imovel.inquilino);

  const status = getStatusImovel(imovel);

  const iniciais = getInitials(inquilino?.nome);

  const totalPendente = pendenciaTotal(imovel);

  const totalAtraso = atrasoTotal(imovel);

  return (
    <Base>
      <div className="card panel imv-panel">
        <div className="imv-header">
          <button
            className="btn-back"
            onClick={() => navigate(-1)}
          >
            ← Voltar
          </button>

          <div className="imv-id">
            <div>
              <h1> ({formatarId(imovel.id)}) {imovel.logradouro}</h1>

              <p className="muted">
                {imovel.complemento}
              </p>
            </div>
          </div>

          <div className="imv-actions">
            <span className={`imv-badge imv-badge--${status}`}>
              {status === "ok" && "Em dia"}
              {status === "pendente" && "Pendente"}
              {status === "atrasado" && "Em atraso"}
            </span>

            <button className="btn-ghost">
              Editar
            </button>

            <button
              className="btn-edit"
              onClick={() =>
                navigate(`/inquilinos/${imovel.inquilino}`)
              }
            >
              Ver inquilino
            </button>
          </div>
        </div>

        <div className="imv-scroll">
          <div className="imv-metrics">
            <div className="metric">
              <span className="metric-label">
                Gasto mensal
              </span>

              <strong className="metric-value">
                {brl(gastoMensal(imovel))}
              </strong>
            </div>

            <div className="metric">
              <span className="metric-label">
                Pendente
              </span>

              <strong className="metric-value">
                {brl(totalPendente)}
              </strong>
            </div>

            <div className="metric">
              <span className="metric-label">
                Em atraso
              </span>

              <strong className="metric-value">
                {brl(totalAtraso)}
              </strong>
            </div>

            <div className="metric">
              <span className="metric-label">
                ADIMPLÊNCIA
              </span>

              <strong className="metric-value">
                {getAdimplencia(imovel)}
              </strong>
            </div>
          </div>

          <div className="imv-grid">
            <section className="box">
              <h3>Inquilino</h3>

              <div className="tenant">
                <div className="tenant-avatar">
                  {iniciais}
                </div>

                <div>
                  <strong>{inquilino?.nome}</strong>

                  <p className="muted">
                    Inquilino ativo
                  </p>
                </div>
              </div>

              <ul className="info-list">
                <li>
                  <span>E-mail</span>

                  <strong>{inquilino?.email}</strong>
                </li>

                <li>
                  <span>Telefone</span>

                  <strong>{inquilino?.telefone}</strong>
                </li>
              </ul>
            </section>

            <section className="box">
              <h3>Descrição</h3>
                {imovel.descricao}
            </section>
          </div>

          <div className="imv-tabs">
            <button
              className={aba === "visao" ? "tab--active" : ""}
              onClick={() => setAba("visao")}
            >
              Visão geral
            </button>

            <button
              className={aba === "pagamentos" ? "tab--active" : ""}
              onClick={() => setAba("pagamentos")}
            >
              Pagamentos
            </button>

            <button
              className={aba === "documentos" ? "tab--active" : ""}
              onClick={() => setAba("documentos")}
            >
              Documentos
            </button>
          </div>

          <section className="tab-content">
            {aba === "visao" && (
              <div className="box full-width">
                <h3>Prioridades</h3>

                <ul className="timeline">
                  {imovel.relatorio.prioridades.map(
                    (prioridade, i) => (
                      <li key={i}>
                        <span
                          className={`dot dot--${prioridade.corStat}`}
                        />

                        <div>
                          <strong>
                            {prioridade.text}
                          </strong>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {aba === "pagamentos" && (
              <div className="box full-width">
                <table className="imv-table">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Valor</th>
                      <th>Data</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {imovel.pagamentos.map((p, i) => (
                      <tr key={i}>
                        <td>{p.desc}</td>

                        <td>{brl(p.value)}</td>

                        <td>
                          {p.date.toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>

                        <td>
                          <span
                            className={`pill pill--${p.status}`}
                          >
                            {p.status === "ok" &&
                              "Pago"}

                            {p.status ===
                              "pendente" &&
                              "Pendente"}

                            {p.status ===
                              "atrasado" &&
                              "Atrasado"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {aba === "documentos" && (
              <ul className="docs">
                {documentos.map((doc, i) => (
                  <li key={i}>
                    <div>
                      <strong>{doc.nome}</strong>

                      <p className="muted">
                        {doc.tipo} · {doc.tamanho}
                      </p>
                    </div>

                    <button className="btn-ghost">
                      Baixar
                    </button>
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