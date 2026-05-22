import "./Dashboard.css";
import Base from "./Base";

import {
  Filter,
  Crosshair,
  AlertOctagon,
  AlertTriangle,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { api } from "./apiService/api";

import type {
  Property,
  Bill,
} from "./types";

type Status =
  | "ok"
  | "pendente"
  | "atrasado";

type CorStat =
  | "ok"
  | "pendente"
  | "late"
  | "muted";

type AlertItem = {
  title: string;
  desc: string;
  time?: string;
  corStat: CorStat;
};

type MovementItem = {
  desc: string;
  value: number;
  date: string;
  dot: Status;
};

function getBillStatus(
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
        getBillStatus(bill) ===
        "atrasado"
    )
  ) {
    return "atrasado";
  }

  if (
    bills.some(
      (bill) =>
        getBillStatus(bill) ===
        "pendente"
    )
  ) {
    return "pendente";
  }

  return "ok";
}

function getStatusColor(
  status: Status
): CorStat {
  if (status === "atrasado") {
    return "late";
  }

  if (status === "pendente") {
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
          getBillStatus(bill);

        return (
          status === "pendente" ||
          status === "atrasado"
        );
      })
      .reduce(
        (total, bill) =>
          total + bill.total,
        0
      ) ?? 0
  );
}

function getPagamentoPrioridade(
  imovel: Property
) {
  const bills = imovel.bills ?? [];

  if (bills.length === 0) {
    return undefined;
  }

  const atrasados = bills
    .filter(
      (bill) =>
        getBillStatus(bill) ===
        "atrasado"
    )
    .sort(
      (a, b) =>
        new Date(
          a.due_date
        ).getTime() -
        new Date(
          b.due_date
        ).getTime()
    );

  if (atrasados.length > 0) {
    return atrasados[0];
  }

  const pendentes = bills
    .filter(
      (bill) =>
        getBillStatus(bill) ===
        "pendente"
    )
    .sort(
      (a, b) =>
        new Date(
          a.due_date
        ).getTime() -
        new Date(
          b.due_date
        ).getTime()
    );

  if (pendentes.length > 0) {
    return pendentes[0];
  }

  return bills[0];
}

function gerarAlertas(
  imoveis: Property[]
): AlertItem[] {
  const alertas: AlertItem[] = [];

  imoveis.forEach((imovel) => {
    imovel.bills?.forEach((bill) => {
      const status =
        getBillStatus(bill);

      if (status === "atrasado") {
        alertas.push({
          title: `${bill.bill_type} atrasado`,
          desc: `${imovel.street}, ${imovel.number}`,
          corStat: "late",
        });
      }

      if (status === "pendente") {
        alertas.push({
          title: `${bill.bill_type} pendente`,
          desc: `${imovel.street}, ${imovel.number}`,
          corStat: "pendente",
        });
      }
    });
  });

  return alertas.slice(0, 6);
}

function gerarMovimentacoes(
  imoveis: Property[]
): MovementItem[] {
  const movimentacoes: MovementItem[] =
    [];

  imoveis.forEach((imovel) => {
    imovel.bills?.forEach((bill) => {
      const status =
        getBillStatus(bill);

      movimentacoes.push({
        desc: `${bill.bill_type} - ${imovel.street}`,
        value:
          status === "ok"
            ? bill.total
            : -bill.total,
        date:
          bill.payment_date ??
          bill.due_date,
        dot: status,
      });
    });
  });

  return movimentacoes
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 8);
}

export default function Dashboard() {
  const [imoveis, setImoveis] =
    useState<Property[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const response =
          await api.get("/property/");

        setImoveis(
          response.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  const alertas = useMemo(
    () => gerarAlertas(imoveis),
    [imoveis]
  );

  const movimentacoes = useMemo(
    () =>
      gerarMovimentacoes(
        imoveis
      ),
    [imoveis]
  );

  const totalEfetuado = imoveis
    .flatMap(
      (imovel) =>
        imovel.bills ?? []
    )
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

  const totalPendente = imoveis
    .flatMap(
      (imovel) =>
        imovel.bills ?? []
    )
    .filter(
      (bill) =>
        getBillStatus(bill) ===
        "pendente"
    )
    .reduce(
      (total, bill) =>
        total + bill.total,
      0
    );

  const totalAtrasado = imoveis
    .flatMap(
      (imovel) =>
        imovel.bills ?? []
    )
    .filter(
      (bill) =>
        getBillStatus(bill) ===
        "atrasado"
    )
    .reduce(
      (total, bill) =>
        total + bill.total,
      0
    );

  const qtdEfetuados = imoveis
    .flatMap(
      (imovel) =>
        imovel.bills ?? []
    )
    .filter(
      (bill) =>
        getBillStatus(bill) ===
        "ok"
    ).length;

  const qtdPendentes = imoveis
    .flatMap(
      (imovel) =>
        imovel.bills ?? []
    )
    .filter(
      (bill) =>
        getBillStatus(bill) ===
        "pendente"
    ).length;

  const qtdAtrasados = imoveis
    .flatMap(
      (imovel) =>
        imovel.bills ?? []
    )
    .filter(
      (bill) =>
        getBillStatus(bill) ===
        "atrasado"
    ).length;

  const stats = [
    {
      label:
        "Pagamento efetuado",
      value:
        totalEfetuado.toFixed(2),
      note: `${qtdEfetuados} boletos pagos`,
      corStat: "ok",
    },

    {
      label:
        "Pagamento pendente",
      value:
        totalPendente.toFixed(2),
      note: `${qtdPendentes} boletos pendentes`,
      corStat: "pendente",
    },

    {
      label:
        "Pagamento atrasado",
      value:
        totalAtrasado.toFixed(2),
      note: `${qtdAtrasados} boletos atrasados`,
      corStat: "late",
    },

    {
      label:
        "Imóveis cadastrados",
      value: imoveis.length,
      note: "",
      corStat: "muted",
    },
  ];

  if (loading) {
    return (
      <Base>
        <p>Carregando...</p>
      </Base>
    );
  }

  return (
    <Base>
      <div className="stats">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card stat"
          >
            <p className="stat-label">
              {stat.label}
            </p>

            <p className="stat-value">
              {stat.label !==
              "Imóveis cadastrados"
                ? `R$ ${stat.value}`
                : stat.value}
            </p>

            <p
              className={`stat-note corStat-${stat.corStat}`}
            >
              {stat.note}
            </p>
          </div>
        ))}
      </div>

      <div className="middle">
        <div className="card panel">
          <div className="objetos">
            <h2>
              Meus imóveis
            </h2>

            <button className="filtro-bt">
              <Filter size={14} />
              Filtros
            </button>
          </div>

          <div className="scroll">
            {imoveis.map(
              (imovel) => {
                const status =
                  getStatusImovel(
                    imovel
                  );

                const pagamentoPrioridade =
                  getPagamentoPrioridade(
                    imovel
                  );

                return (
                  <div
                    key={imovel.id}
                    className="row"
                  >
                    <div className="row-main">
                      <p className="titulo-objeto">
                        {
                          imovel.street
                        }
                        ,{" "}
                        {
                          imovel.number
                        }
                        {" — "}
                        {
                          imovel.complement
                        }
                      </p>

                      <p className="desc-objeto">
                        Proprietário:
                        {" "}
                        {imovel
                          .owner
                          ?.name ??
                          "Não definido"}
                      </p>
                    </div>

                    <span
                      className={`badge badge-${getStatusColor(
                        status
                      )}`}
                    >
                      {status}
                    </span>

                    <div className="valor-imovel">
                      <p className="v">
                        R${" "}
                        {pendenciaTotal(
                          imovel
                        ).toFixed(
                          2
                        )}
                      </p>

                      <p className="d">
                        {pagamentoPrioridade
                          ? new Date(
                              pagamentoPrioridade.due_date
                            ).toLocaleDateString(
                              "pt-BR"
                            )
                          : ""}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="card panel">
          <div className="objetos">
            <h2>
              Alertas e Avisos
            </h2>
          </div>

          <div className="scroll">
            {alertas.map(
              (alert, i) => {
                const Icon =
                  alert.corStat ===
                  "late"
                    ? AlertOctagon
                    : alert.corStat ===
                      "pendente"
                    ? AlertTriangle
                    : Crosshair;

                return (
                  <div
                    key={i}
                    className="alert-row"
                  >
                    <div
                      className={`alert-icon ${alert.corStat}`}
                    >
                      <Icon
                        size={20}
                      />
                    </div>

                    <div className="row-main">
                      <p className="titulo-objeto">
                        {
                          alert.title
                        }
                      </p>

                      <p className="desc-objeto">
                        {
                          alert.desc
                        }
                      </p>

                      {alert.time && (
                        <p className="info-data">
                          {
                            alert.time
                          }
                        </p>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="card panel">
        <div className="objetos">
          <h2>
            Movimentações recentes
          </h2>
        </div>

        <div
          className="scroll"
          style={{
            padding: 8,
          }}
        >
          <div className="mov-grid">
            {movimentacoes.map(
              (
                movment,
                i
              ) => (
                <div
                  key={i}
                  className="movimentacoes"
                >
                  <div className="mov-left">
                    <span
                      className={`dot dot-${movment.dot}`}
                    />

                    <p className="mov-title">
                      {
                        movment.desc
                      }
                    </p>
                  </div>

                  <div className="mov-right">
                    <p className="mov-valor">
                      R${" "}
                      {movment.value.toFixed(
                        2
                      )}
                    </p>

                    <p className="mov-date">
                      {new Date(
                        movment.date
                      ).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Base>
  );
}