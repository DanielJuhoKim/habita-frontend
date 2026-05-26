import "./Imoveis.css";

import Base from "./Base";
import { Filter } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "./apiService/api";
import type { Property, Bill } from "./types";

type Status = "ok" | "pendente" | "atrasado";

/* =========================
   HELPERS
========================= */

function formatarId(id?: number) {
  return String(id ?? 0).padStart(4, "0");
}

function pagamentoStatus(pagamento: Bill): Status {
  if (pagamento.payment_date) return "ok";

  const hoje = new Date();
  const vencimento = new Date(pagamento.due_date);

  if (hoje > vencimento) return "atrasado";

  return "pendente";
}

function pendenciaTotal(imovel: Property) {
  return (
    imovel.bills
      ?.filter((bill) => {
        const status = pagamentoStatus(bill);
        return status === "pendente" || status === "atrasado";
      })
      .reduce((total, bill) => total + bill.total, 0) ?? 0
  );
}

function gastoMensal(imovel: Property) {
  return (
    imovel.bills
      ?.filter((bill) => pagamentoStatus(bill) === "ok")
      .reduce((total, bill) => total + bill.total, 0) ?? 0
  );
}

function getStatusImovel(imovel: Property): Status {
  const bills = imovel.bills ?? [];

  if (bills.some((b) => pagamentoStatus(b) === "atrasado")) {
    return "atrasado";
  }

  if (bills.some((b) => pagamentoStatus(b) === "pendente")) {
    return "pendente";
  }

  return "ok";
}

function getAdimplencia(imovel: Property) {
  const bills = imovel.bills ?? [];

  if (bills.length === 0) return "0%";

  const pagos = bills.filter((b) => pagamentoStatus(b) === "ok").length;

  return `${((pagos / bills.length) * 100).toFixed(0)}%`;
}

function getPagamentosPrioridadeLista(imovel: Property, limite = 4) {
  return [...(imovel.bills ?? [])]
    .sort((a, b) => {
      const statusA = pagamentoStatus(a);
      const statusB = pagamentoStatus(b);

      if (statusA === "atrasado" && statusB !== "atrasado") return -1;
      if (statusB === "atrasado" && statusA !== "atrasado") return 1;

      return (
        new Date(a.due_date).getTime() -
        new Date(b.due_date).getTime()
      );
    })
    .slice(0, limite);
}

/* =========================
   COMPONENTES
========================= */

function FilterBtn() {
  return (
    <button className="filtro-bt">
      <Filter size={14} /> Filtros
    </button>
  );
}

function Card({ data }: { data: Property }) {
  const navigate = useNavigate();

  const bills = data.bills ?? [];

  const qtdAtrasados = bills.filter(
    (b) => pagamentoStatus(b) === "atrasado"
  ).length;

  const qtdPendentes = bills.filter(
    (b) => pagamentoStatus(b) === "pendente"
  ).length;

  return (
    <div className="card rel-card">
      <div className="rel-head">
        <div>
          <p className="rel-title">
            ({formatarId(data.id)}) {data.street},{" "}
            {data.number} - {data.complement}
          </p>

          <p className="rel-tenant">
            Inquilino: {data.owner?.name ?? "Não definido"}
          </p>
        </div>

        <button
          className="btn-detalhes"
          onClick={() =>
            navigate(`/imoveis/${data.id ?? 0}`)
          }
        >
          Ver detalhes
        </button>
      </div>

      <div className="rel-body">
        <div className="rel-metric">
          <p className="metric-label">Gasto no mês</p>
          <p className="metric-value">
            R$ {gastoMensal(data).toFixed(2)}
          </p>
        </div>

        <div className="rel-metric">
          <p className="metric-label">Pendente</p>
          <p className="metric-value">
            R$ {pendenciaTotal(data).toFixed(2)}
          </p>

          <div className="metric-inline">
            <p className={qtdAtrasados ? "metric-atraso" : "metric-ok"}>
              {qtdAtrasados} atrasos
            </p>

            <p className={qtdPendentes ? "metric-pendente" : "metric-ok"}>
              {qtdPendentes} pendências
            </p>
          </div>
        </div>

        <div className="rel-metric">
          <p className="metric-label">Adimplência</p>
          <p className="metric-value">{getAdimplencia(data)}</p>
        </div>

        <div className="prioridades">
          <p className="metric-label">Prioridades</p>

          <ul>
            {getPagamentosPrioridadeLista(data).map((p) => (
              <li key={p.id}>
                <span
                  className={`dot dot-${
                    pagamentoStatus(p) === "atrasado"
                      ? "late"
                      : pagamentoStatus(p)
                  }`}
                />
                Conta de {p.bill_type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* =========================
   PAGE
========================= */

export default function Imoveis() {
  const [imoveis, setImoveis] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get("/property/");
        setImoveis(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  const list = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return imoveis;

    return imoveis.filter((imovel) => {
      return (
        String(imovel.id).includes(q) ||
        imovel.street?.toLowerCase().includes(q) ||
        String(imovel.number).includes(q) ||
        imovel.complement?.toLowerCase().includes(q)
      );
    });
  }, [imoveis, query]);

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
          <div>
            <h2>Relatórios por imóvel</h2>
            <span>{list.length} encontrados</span>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="🔎 Buscar por imóvel"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <FilterBtn />
        </div>

        <div className="scroll cards-scroll">
          {list.map((it) => (
            <Card key={it.id} data={it} />
          ))}

          {list.length === 0 && (
            <div className="empty">
              Nenhum imóvel encontrado.
            </div>
          )}
        </div>
      </div>
    </Base>
  );
}