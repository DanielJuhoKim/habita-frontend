import { useEffect, useMemo, useState } from "react";
import "./DetalhesInquilino.css";
import Base from "./Base";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { api } from "./apiService/api";

import type {
  Owner,
  Property,
  Bill,
} from "./types";

type Aba =
  | "visao"
  | "imoveis"
  | "documentos"
  | "historico";

type StatusPagamento =
  | "ok"
  | "pendente"
  | "atrasado";

function getInitials(nome: string) {
  return nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatarId(id?: number) {
  return String(id ?? 0).padStart(
    4,
    "0"
  );
}

function getBillStatus(
  bill: Bill
): StatusPagamento {
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

function brl(valor: number) {
  return valor.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
}

export default function DetalhesInquilino() {
  const [aba, setAba] =
    useState<Aba>("visao");

  const [loading, setLoading] =
    useState(true);

  const [inquilino, setInquilino] =
    useState<Owner | null>(null);

  const [imoveis, setImoveis] =
    useState<Property[]>([]);

  const navigate = useNavigate();

  const { id_inquilino } =
    useParams();

  useEffect(() => {
    async function carregar() {
      try {
        const [
          ownerResponse,
          propertiesResponse,
        ] = await Promise.all([
          api.get(
            `/owner/${id_inquilino}`
          ),

          api.get("/property"),
        ]);

        const owner =
          ownerResponse.data;

        const properties =
          propertiesResponse.data;

        const propriedadesFiltradas =
          properties.filter(
            (
              property: Property
            ) =>
              property.owner_id ===
              Number(id_inquilino)
          );

        setInquilino(owner);

        setImoveis(
          propriedadesFiltradas
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [id_inquilino]);

  const todosBoletos =
    useMemo(() => {
      return imoveis.flatMap(
        (imovel) =>
          imovel.bills ?? []
      );
    }, [imoveis]);

  const totalPago = todosBoletos
    .filter(
      (bill) =>
        getBillStatus(bill) ===
        "ok"
    )
    .reduce(
      (total, bill) =>
        total + bill.total,
      0
    );

  const totalPendente =
    todosBoletos
      .filter(
        (bill) =>
          getBillStatus(
            bill
          ) !== "ok"
      )
      .reduce(
        (total, bill) =>
          total + bill.total,
        0
      );

  const adimplencia =
    todosBoletos.length === 0
      ? 100
      : Math.round(
          (todosBoletos.filter(
            (bill) =>
              getBillStatus(
                bill
              ) === "ok"
          ).length /
            todosBoletos.length) *
            100
        );

  const eventos = todosBoletos
    .map((bill) => ({
      titulo:
        getBillStatus(bill) ===
        "ok"
          ? "Pagamento recebido"
          : getBillStatus(
                bill
              ) === "atrasado"
            ? "Pagamento atrasado"
            : "Pagamento pendente",

      descricao: `${
        bill.bill_type
      } • ${brl(
        bill.total
      )}`,

      data:
        bill.payment_date ??
        bill.due_date,

      tipo:
        getBillStatus(bill),
    }))
    .sort(
      (a, b) =>
        new Date(
          b.data
        ).getTime() -
        new Date(
          a.data
        ).getTime()
    );

  if (loading) {
    return (
      <Base>
        <p>Carregando...</p>
      </Base>
    );
  }

  if (!inquilino) {
    return (
      <Base>
        <div className="card panel">
          <h2>
            Inquilino não
            encontrado
          </h2>
        </div>
      </Base>
    );
  }

  return (
    <Base>
      <div className="card panel">
        <div className="inq-header">
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

          <div className="inq-id">
            <div className="inq-avatar-lg">
              {getInitials(
                inquilino.name
              )}
            </div>

            <div>
              <h1>
                {inquilino.name}
              </h1>

              <p className="muted">
                Cadastrado em{" "}
                {new Date(
                  inquilino.signup_date
                ).toLocaleDateString(
                  "pt-BR"
                )}
              </p>
            </div>
          </div>

          <div className="inq-actions">
            <button className="btn-ghost">
              Mensagem
            </button>

            <button className="btn-edit">
              Editar
            </button>
          </div>
        </div>

        <div className="inq-scroll">
          <div className="inq-metrics">
            <div className="metric">
              <span className="metric-label">
                Total pago
              </span>

              <strong className="metric-value">
                {brl(totalPago)}
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
                Imóveis vinculados
              </span>

              <strong className="metric-value">
                {
                  imoveis.length
                }
              </strong>
            </div>

            <div className="metric">
              <span className="metric-label">
                Adimplência
              </span>

              <strong className="metric-value">
                {adimplencia}%
              </strong>
            </div>
          </div>

          <div className="inq-grid">
            <section className="box">
              <h3>Contato</h3>

              <ul className="info-list">
                <li>
                  <span>
                    E-mail
                  </span>

                  <strong>
                    {
                      inquilino.email
                    }
                  </strong>
                </li>

                <li>
                  <span>
                    Telefone
                  </span>

                  <strong>
                    {
                      inquilino.phone
                    }
                  </strong>
                </li>

                <li>
                  <span>CPF</span>

                  <strong>
                    {
                      inquilino.cpf
                    }
                  </strong>
                </li>
              </ul>
            </section>

            <section className="box">
              <h3>
                Observações
              </h3>

              <p className="obs">
                {inquilino.observations ||
                  "Sem observações"}
              </p>
            </section>
          </div>

          <div
            className="inq-tabs"
            role="tablist"
          >
            {(
              [
                [
                  "visao",
                  "Visão geral",
                ],

                [
                  "imoveis",
                  "Imóveis",
                ],

                [
                  "documentos",
                  "Documentos",
                ],

                [
                  "historico",
                  "Histórico",
                ],
              ] as [
                Aba,
                string
              ][]
            ).map(([k, l]) => (
              <button
                key={k}
                role="tab"
                className={`tab ${
                  aba === k
                    ? "tab--active"
                    : ""
                }`}
                onClick={() =>
                  setAba(k)
                }
              >
                {l}
              </button>
            ))}
          </div>

          <section className="tab-content">
            {aba === "visao" && (
              <div className="box full-width">
                <h3>
                  Últimos eventos
                </h3>

                <ul className="timeline">
                  {eventos
                    .slice(0, 5)
                    .map(
                      (
                        evento,
                        i
                      ) => (
                        <li
                          key={i}
                        >
                          <span
                            className={`dot dot--${evento.tipo}`}
                          />

                          <div>
                            <strong>
                              {
                                evento.titulo
                              }
                            </strong>

                            <p className="muted">
                              {new Date(
                                evento.data
                              ).toLocaleDateString(
                                "pt-BR"
                              )}{" "}
                              —{" "}
                              {
                                evento.descricao
                              }
                            </p>
                          </div>
                        </li>
                      )
                    )}
                </ul>
              </div>
            )}

            {aba ===
              "imoveis" && (
              <div className="imoveis-list">
                {imoveis.map(
                  (
                    imovel
                  ) => (
                    <div
                      key={
                        imovel.id
                      }
                      className="imovel-row"
                    >
                      <div>
                        <strong>
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
                          }{" "}
                          -{" "}
                          {
                            imovel.complement
                          }
                        </strong>

                        <p className="muted">
                          {
                            imovel.city
                          }
                          {" - "}
                          {
                            imovel.state
                          }
                        </p>
                      </div>

                      <div className="imovel-row__right">
                        <button
                          className="btn-edit"
                          onClick={() =>
                            navigate(
                              `/imoveis/${imovel.id}`
                            )
                          }
                        >
                          Ver imóvel
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {aba ===
              "documentos" && (
              <ul className="docs">
                <li>
                  <div>
                    <strong>
                      Nenhum
                      documento
                    </strong>

                    <p className="muted">
                      Ainda não
                      existem
                      documentos
                      cadastrados
                    </p>
                  </div>
                </li>
              </ul>
            )}

            {aba ===
              "historico" && (
              <ul className="timeline">
                {eventos.map(
                  (
                    evento,
                    i
                  ) => (
                    <li
                      key={i}
                    >
                      <span
                        className={`dot dot--${evento.tipo}`}
                      />

                      <div>
                        <strong>
                          {
                            evento.titulo
                          }
                        </strong>

                        <p className="muted">
                          {new Date(
                            evento.data
                          ).toLocaleDateString(
                            "pt-BR"
                          )}{" "}
                          —{" "}
                          {
                            evento.descricao
                          }
                        </p>
                      </div>
                    </li>
                  )
                )}
              </ul>
            )}
          </section>
        </div>
      </div>
    </Base>
  );
}