import "./Imoveis.css";

import Base from "./Base";

import { Filter } from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { api } from "./apiService/api";

import type {
  Property,
  Bill,
} from "./types";

type Status =
  | "ok"
  | "pendente"
  | "atrasado";

function formatarId(id?: number) {
  return String(id ?? 0).padStart(
    4,
    "0"
  );
}

function pagamentoStatus(
  pagamento: Bill
): Status {
  if (pagamento.payment_date) {
    return "ok";
  }

  const hoje = new Date();

  const vencimento = new Date(
    pagamento.due_date
  );

  if (hoje > vencimento) {
    return "atrasado";
  }

  return "pendente";
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

function getStatusImovel(
  imovel: Property
): Status {
  const bills =
    imovel.bills ?? [];

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

function getAdimplencia(
  imovel: Property
) {
  const bills =
    imovel.bills ?? [];

  if (bills.length === 0) {
    return "0%";
  }

  const pagos =
    bills.filter(
      (bill) =>
        pagamentoStatus(
          bill
        ) === "ok"
    ).length;

  const porcentagem =
    (pagos / bills.length) *
    100;

  return `${porcentagem.toFixed(
    0
  )}%`;
}

function getPagamentosPrioridadeLista(
  imovel: Property,
  limite = 4
) {
  return (
    [...(imovel.bills ?? [])]
      .sort((a, b) => {
        const statusA =
          pagamentoStatus(a);

        const statusB =
          pagamentoStatus(b);

        if (
          statusA ===
            "atrasado" &&
          statusB !==
            "atrasado"
        ) {
          return -1;
        }

        if (
          statusB ===
            "atrasado" &&
          statusA !==
            "atrasado"
        ) {
          return 1;
        }

        return (
          new Date(
            a.due_date
          ).getTime() -
          new Date(
            b.due_date
          ).getTime()
        );
      })
      .slice(0, limite)
  );
}

function FilterBtn() {
  return (
    <button className="filtro-bt">
      <Filter size={14} />{" "}
      Filtros
    </button>
  );
}

function Card({
  data,
}: {
  data: Property;
}) {
  const navigate =
    useNavigate();

  const bills =
    data.bills ?? [];

  const qtdAtrasados =
    bills.filter(
      (pag) =>
        pagamentoStatus(
          pag
        ) === "atrasado"
    ).length;

  const qtdPendentes =
    bills.filter(
      (pag) =>
        pagamentoStatus(
          pag
        ) === "pendente"
    ).length;

  return (
    <div className="card rel-card">
      <div className="rel-head">
        <div>
          <p className="rel-title">
            (
            {formatarId(
              data.id
            )}
            ){" "}
            {data.street},{" "}
            {data.number} -{" "}
            {data.complement}
          </p>

          <p className="rel-tenant">
            Proprietário:{" "}
            {data.owner
              ?.name ??
              "Não definido"}
          </p>
        </div>

        <button
          className="btn-detalhes"
          onClick={() =>
            navigate(
              `/imoveis/${encodeURIComponent(
                data.id ?? 0
              )}`
            )
          }
        >
          Ver detalhes
        </button>
      </div>

      <div className="rel-body">
        <div className="rel-metric">
          <p className="metric-label">
            Gasto no mês
          </p>

          <p className="metric-value">
            R${" "}
            {gastoMensal(
              data
            ).toFixed(2)}
          </p>

          <p
            className={
              getStatusImovel(
                data
              ) === "atrasado"
                ? "metric-atraso"
                : "metric-ok"
            }
          >
            {getStatusImovel(
              data
            ) === "atrasado"
              ? "Acima da média"
              : "Dentro do previsto"}
          </p>
        </div>

        <div className="rel-metric">
          <p className="metric-label">
            Pendente
          </p>

          <p className="metric-value">
            R${" "}
            {pendenciaTotal(
              data
            ).toFixed(2)}
          </p>

          <div className="metric-inline">
            <p
              className={
                qtdAtrasados ===
                0
                  ? "metric-ok"
                  : "metric-atraso"
              }
            >
              {qtdAtrasados}{" "}
              atrasos
            </p>

            <p
              className={
                qtdPendentes ===
                0
                  ? "metric-ok"
                  : "metric-pendente"
              }
            >
              {qtdPendentes}{" "}
              pendências
            </p>
          </div>
        </div>

        <div className="rel-metric">
          <p className="metric-label">
            Adimplência
          </p>

          <p className="metric-value">
            {getAdimplencia(
              data
            )}
          </p>

          <p className="metric-note">
            Últimos 12 meses
          </p>
        </div>

        <div className="prioridades">
          <p className="metric-label">
            Prioridades
          </p>

          <ul>
            {getPagamentosPrioridadeLista(
              data,
              4
            ).map((p) => (
              <li key={p.id}>
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

                {p.bill_type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Imoveis() {
  const [imoveis, setImoveis] =
    useState<Property[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const response =
          await api.get(
            "/property/"
          );

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

  if (loading) {
    return (
      <Base>
        <p>Carregando...</p>
      </Base>
    );
  }

  return (
    <Base>
      <div className="card panel">
        <div className="objetos">
          <h2>
            Relatórios por
            imóvel
          </h2>

          <FilterBtn />
        </div>

        <div className="scroll cards-scroll">
          {imoveis.map(
            (it) => (
              <Card
                key={it.id}
                data={it}
              />
            )
          )}
        </div>
      </div>
    </Base>
  );
}