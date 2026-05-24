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
  getPagamentosPrioridadeLista,
  pagamentoStatus,
} from "./constantes";

import { ArrowLeft } from "lucide-react";

type Aba = "informacoes" | "prioridades" | "pagamentos" | "documentos";

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
  const [aba, setAba] = useState<Aba>("informacoes");

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
                type="button"
                className="btn-back"
                onClick={() => navigate(-1)}
                aria-label="Voltar"
            >
                <ArrowLeft size={18} />
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
              type="button"
              className="btn-back"
              onClick={() => navigate(-1)}
              aria-label="Voltar">
              <ArrowLeft size={18} />
          </button>

          <div className="imv-id">
            <div>
              <h1> ({formatarId(imovel.id)}) {imovel.logradouro}, {imovel.numero}</h1>

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
              className={aba === "informacoes" ? "tab--active" : ""}
              onClick={() => setAba("informacoes")}>
              Informações
            </button>

            <button
              className={aba === "prioridades" ? "tab--active" : ""}
              onClick={() => setAba("prioridades")}>
              Prioridades
            </button>

            <button
              className={aba === "pagamentos" ? "tab--active" : ""}
              onClick={() => setAba("pagamentos")}>
              Pagamentos
            </button>
{/* 
            <button
              className={aba === "documentos" ? "tab--active" : ""}
              onClick={() => setAba("documentos")}>
              Documentos
            </button> */}
          </div>

          <section className="tab-content">
            {aba === "informacoes" && (
              <div className="info-grid">
                <section className="box">
                  <h3>Endereço</h3>

                  <ul className="info-list">
                    <li>
                      <span>Logradouro</span>
                      <strong>{imovel.logradouro}</strong>
                    </li>

                    <li>
                      <span>Número</span>
                      <strong>{imovel.numero}</strong>
                    </li>

                    <li>
                      <span>Complemento</span>
                      <strong>{imovel.complemento}</strong>
                    </li>

                    <li>
                      <span>CEP</span>
                      <strong>{imovel.CEP}</strong>
                    </li>

                    <li>
                      <span>Cidade</span>
                      <strong>{imovel.cidade}</strong>
                    </li>

                    <li>
                      <span>Estado</span>
                      <strong>{imovel.estado}</strong>
                    </li>

                    <li>
                      <span>Interfone</span>
                      <strong>{imovel.n_interfone}</strong>
                    </li>
                  </ul>
                </section>
              </div>
            )}

            {aba === "prioridades" && (
              <div className="box full-width">
                <h3>Prioridades</h3>

                <ul className="timeline">
                  {getPagamentosPrioridadeLista(imovel)?.map((p, i) => (
                    <li key={i}>
                      <span
                        className={`dot dot-${
                          pagamentoStatus(p) === "atrasado"
                            ? "late"
                            : pagamentoStatus(p)
                        }`}
                      />

                      <div>
                        <strong>{p.tipo_pagamento} {p.emissora}</strong>
                      </div>
                    </li>
                  ))}
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
                        <td>{p.tipo_pagamento} - {p.emissora}</td>

                        <td>{brl(p.total)}</td>

                        <td>
                          {p.data_vencimento.toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>

                        <td>
                          <span
                            className={`pill pill--${pagamentoStatus(p)}`}>
                            {pagamentoStatus(p) === "ok" &&
                              "Pago"}

                            {pagamentoStatus(p) ===
                              "pendente" &&
                              "Pendente"}

                            {pagamentoStatus(p) ===
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