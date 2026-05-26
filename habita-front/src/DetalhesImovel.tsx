import { useEffect, useState } from "react";
import "./DetalhesImovel.css";
import Base from "./Base";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { api } from "./apiService/api";

import type {
  Property,
  Bill,
} from "./types";

type Aba =
  | "informacoes"
  | "prioridades"
  | "pagamentos";
  // | "documentos";

// type Documento = {
//   nome: string;
//   tipo: string;
//   tamanho: string;
// };

type Status =
  | "ok"
  | "pendente"
  | "atrasado";

// const documentos: Documento[] = [
//   {
//     nome: "Contrato de locação.pdf",
//     tipo: "PDF",
//     tamanho: "1.2 MB",
//   },

//   {
//     nome: "Comprovante de renda.pdf",
//     tipo: "PDF",
//     tamanho: "380 KB",
//   },

//   {
//     nome: "Vistoria inicial.pdf",
//     tipo: "PDF",
//     tamanho: "2.1 MB",
//   },
// ];


function brl(v: number) {
  return v.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
}

function formatarId(id?: number) {
  return String(id ?? 0).padStart(
    4,
    "0"
  );
}

function getInitials(
  nome?: string
) {
  if (!nome) {
    return "--";
  }

  return nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function pagamentoStatus(
  bill: Bill
): Status {
  if (bill.payment_date) {
    return "ok";
  }

  const hoje = new Date();

  const vencimento = new Date(
    bill.due_date
  );

  if (hoje > vencimento) {
    return "atrasado";
  }

  return "pendente";
}

function getStatusImovel(
  imovel: Property
): Status {
  const bills = imovel.bills ?? [];

  if (
    bills.some(
      (bill) =>
        pagamentoStatus(
          bill
        ) === "atrasado"
    )
  ) {
    return "atrasado";
  }

  if (
    bills.some(
      (bill) =>
        pagamentoStatus(
          bill
        ) === "pendente"
    )
  ) {
    return "pendente";
  }

  return "ok";
}

function pendenciaTotal(
  imovel: Property
) {
  return (
    imovel.bills
      ?.filter((bill) => {
        const status =
          pagamentoStatus(
            bill
          );

        return (
          status ===
            "pendente" ||
          status ===
            "atrasado"
        );
      })
      .reduce(
        (total, bill) =>
          total + bill.total,
        0
      ) ?? 0
  );
}

function atrasoTotal(
  imovel: Property
) {
  return (
    imovel.bills
      ?.filter(
        (bill) =>
          pagamentoStatus(
            bill
          ) === "atrasado"
      )
      .reduce(
        (total, bill) =>
          total + bill.total,
        0
      ) ?? 0
  );
}

function gastoMensal(
  imovel: Property
) {
  return (
    imovel.bills?.reduce(
      (total, bill) =>
        total + bill.total,
      0
    ) ?? 0
  );
}

function getAdimplencia(
  imovel: Property
) {
  const bills =
    imovel.bills ?? [];

  if (bills.length === 0) {
    return "0%";
  }

  const pagos = bills.filter(
    (bill) =>
      pagamentoStatus(
        bill
      ) === "ok"
  ).length;

  return `${Math.round(
    (pagos / bills.length) * 100
  )}%`;
}

function getPagamentosPrioridadeLista(
  imovel: Property
) {
  return (
    imovel.bills
      ?.filter(
        (bill) =>
          pagamentoStatus(
            bill
          ) !== "ok"
      )
      .sort(
        (a, b) =>
          new Date(
            a.due_date
          ).getTime() -
          new Date(
            b.due_date
          ).getTime()
      ) ?? []
  );
}

export default function DTImoveis() {
  const [aba, setAba] =
    useState<Aba>(
      "informacoes"
    );

  const [editandoDescricao, setEditandoDescricao] =
    useState(false);

  const [descricaoEditada, setEdit] =
    useState("");

  const [
    imovel,
    setImovel,
  ] = useState<Property | null>(
    null
  );

  const [loading, setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  const { id_imovel } =
    useParams();

  useEffect(() => {
    async function carregar() {
      try {
        const response =
          await api.get(
            `/property/${id_imovel}`
          );

        setImovel(
          response.data
        );

        setEdit(
          response.data.description ?? ""
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id_imovel]);

  if (loading) {
    return (
      <Base>
        <p>Carregando...</p>
      </Base>
    );
  }

  if (!imovel) {
    return (
      <Base>
        <div className="card panel imv-panel">
          <div className="imv-empty">
            <h2>
              Imóvel não
              encontrado
            </h2>

            <button
              type="button"
              className="btn-back"
              onClick={() =>
                navigate(-1)
              }
              aria-label="Voltar"
            >
              <ArrowLeft
                size={18}
              />
            </button>
          </div>
        </div>
      </Base>
    );
  }

  const owner =
    imovel.owner;

  const status =
    getStatusImovel(
      imovel
    );

  const iniciais =
    getInitials(owner?.name);

  const totalPendente =
    pendenciaTotal(
      imovel
    );

  const totalAtraso =
    atrasoTotal(imovel);

  async function editDescricao() {
    if (!imovel) {
      return;
    }

    try {
      const payload = {
        ...imovel,
        description: descricaoEditada,
      };

      const response =
        await api.put(
          `/property/${imovel.id}`,
          payload
        );

      setImovel(response.data);

      setEditandoDescricao(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Base>
      <div className="card panel imv-panel">
        <div className="imv-header">
          <button
            type="button"
            className="btn-back"
            onClick={() =>
              navigate(-1)
            }
            aria-label="Voltar"
          >
            <ArrowLeft
              size={18}
            />
          </button>

          <div className="imv-id">
            <div>
              <h1>
                (
                {formatarId(
                  imovel.id
                )}
                ){" "}
                {
                  imovel.street
                }
                ,{" "}
                {
                  imovel.number
                }
              </h1>

              <p className="muted">
                {
                  imovel.complement
                }
              </p>
            </div>
          </div>

          <div className="imv-actions">
            <span
              className={`imv-badge imv-badge--${status}`}
            >
              {status ===
                "ok" &&
                "Em dia"}

              {status ===
                "pendente" &&
                "Pendente"}

              {status ===
                "atrasado" &&
                "Em atraso"}
            </span>

            <button
              className="btn-ghost"
              onClick={() =>
                editandoDescricao
                  ? editDescricao()
                  : setEditandoDescricao(true)
              }
            >
              {editandoDescricao
                ? "Salvar"
                : "Editar"}
            </button>

            <button
              className="btn-edit"
              onClick={() =>
                navigate(
                  `/inquilinos/${imovel.owner_id}`
                )
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
                {brl(
                  gastoMensal(
                    imovel
                  )
                )}
              </strong>
            </div>

            <div className="metric">
              <span className="metric-label">
                Pendente
              </span>

              <strong className="metric-value">
                {brl(
                  totalPendente
                )}
              </strong>
            </div>

            <div className="metric">
              <span className="metric-label">
                Em atraso
              </span>

              <strong className="metric-value">
                {brl(
                  totalAtraso
                )}
              </strong>
            </div>

            <div className="metric">
              <span className="metric-label">
                ADIMPLÊNCIA
              </span>

              <strong className="metric-value">
                {getAdimplencia(
                  imovel
                )}
              </strong>
            </div>
          </div>

          <div className="imv-grid">
            <section className="box">
              <h3>
                Inquilino
              </h3>

              <div className="tenant">
                <div className="tenant-avatar">
                  {iniciais}
                </div>

                <div>
                  <strong>
                    {
                      owner?.name
                    }
                  </strong>
                </div>
              </div>

              <ul className="info-list">
                <li>
                  <span>
                    E-mail
                  </span>

                  <strong>
                    {
                      owner?.email
                    }
                  </strong>
                </li>

                <li>
                  <span>
                    Telefone
                  </span>

                  <strong>
                    {
                      owner?.phone
                    }
                  </strong>
                </li>
              </ul>
            </section>

            <section className="box">
              <h3>
                Descrição
              </h3>

              {editandoDescricao ? (
                <textarea
                  className="descricao-input"
                  value={descricaoEditada}
                  onChange={(e) =>
                    setEdit(
                      e.target.value
                    )
                  }
                />
              ) : (
                <p>
                  {imovel.description}
                </p>
              )}
            </section>
          </div>

          <div className="imv-tabs">
            <button
              className={
                aba ===
                "informacoes"
                  ? "tab--active"
                  : ""
              }
              onClick={() =>
                setAba(
                  "informacoes"
                )
              }
            >
              Informações
            </button>

            <button
              className={
                aba ===
                "prioridades"
                  ? "tab--active"
                  : ""
              }
              onClick={() =>
                setAba(
                  "prioridades"
                )
              }
            >
              Prioridades
            </button>

            <button
              className={
                aba ===
                "pagamentos"
                  ? "tab--active"
                  : ""
              }
              onClick={() =>
                setAba(
                  "pagamentos"
                )
              }
            >
              Pagamentos
            </button>

            {/* <button
              className={
                aba ===
                "documentos"
                  ? "tab--active"
                  : ""
              }
              onClick={() =>
                setAba(
                  "documentos"
                )
              }
            >
              Documentos
            </button> */}
          </div>

          <section className="tab-content">
            {aba ===
              "informacoes" && (
              <div className="info-grid">
                <section className="box">
                  <h3>
                    Endereço
                  </h3>

                  <ul className="info-list">
                    <li>
                      <span>
                        Logradouro
                      </span>

                      <strong>
                        {
                          imovel.street
                        }
                      </strong>
                    </li>

                    <li>
                      <span>
                        Número
                      </span>

                      <strong>
                        {
                          imovel.number
                        }
                      </strong>
                    </li>

                    <li>
                      <span>
                        Complemento
                      </span>

                      <strong>
                        {
                          imovel.complement
                        }
                      </strong>
                    </li>

                    <li>
                      <span>
                        CEP
                      </span>

                      <strong>
                        {
                          imovel.cep
                        }
                      </strong>
                    </li>

                    <li>
                      <span>
                        Cidade
                      </span>

                      <strong>
                        {
                          imovel.city
                        }
                      </strong>
                    </li>

                    <li>
                      <span>
                        Estado
                      </span>

                      <strong>
                        {
                          imovel.state
                        }
                      </strong>
                    </li>

                    <li>
                      <span>
                        Telefone
                      </span>

                      <strong>
                        {imovel.phone ??
                          "Não definido"}
                      </strong>
                    </li>
                  </ul>
                </section>
              </div>
            )}

            {aba ===
              "prioridades" && (
              <div className="box full-width">
                <h3>
                  Prioridades
                </h3>

                <ul className="timeline">
                  {getPagamentosPrioridadeLista(
                    imovel
                  ).map(
                    (
                      p,
                      i
                    ) => (
                      <li
                        key={i}
                      >
                        <span
                          className={`dot dot-${
                            pagamentoStatus(
                              p
                            ) ===
                            "atrasado"
                              ? "late"
                              : pagamentoStatus(
                                  p
                                )
                          }`}
                        />

                        <div>
                          <strong>
                            {
                              p.bill_type
                            }
                          </strong>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {aba ===
              "pagamentos" && (
              <div className="box full-width">
                <table className="imv-table">
                  <thead>
                    <tr>
                      <th>
                        Descrição
                      </th>

                      <th>
                        Valor
                      </th>

                      <th>
                        Data
                      </th>

                      <th>
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {imovel.bills?.map(
                      (
                        p,
                        i
                      ) => (
                        <tr
                          key={i}
                        >
                          <td>
                            {
                              p.bill_type
                            }{" "}
                            -{" "}
                            {
                              p.emitter
                            }
                          </td>

                          <td>
                            {brl(
                              p.total
                            )}
                          </td>

                          <td>
                            {new Date(
                              p.due_date
                            ).toLocaleDateString(
                              "pt-BR"
                            )}
                          </td>

                          <td>
                            <span
                              className={`pill pill--${pagamentoStatus(
                                p
                              )}`}
                            >
                              {pagamentoStatus(
                                p
                              ) ===
                                "ok" &&
                                "Pago"}

                              {pagamentoStatus(
                                p
                              ) ===
                                "pendente" &&
                                "Pendente"}

                              {pagamentoStatus(
                                p
                              ) ===
                                "atrasado" &&
                                "Atrasado"}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* {aba ===
              "documentos" && (
              <ul className="docs">
                {documentos.map(
                  (
                    doc,
                    i
                  ) => (
                    <li key={i}>
                      <div>
                        <strong>
                          {
                            doc.nome
                          }
                        </strong>

                        <p className="muted">
                          {
                            doc.tipo
                          }{" "}
                          ·{" "}
                          {
                            doc.tamanho
                          }
                        </p>
                      </div>

                      <button className="btn-ghost">
                        Baixar
                      </button>
                    </li>
                  )
                )}
              </ul>
            )} */}
          </section>
        </div>
      </div>
    </Base>
  );
}