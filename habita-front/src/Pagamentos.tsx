import Base from "./Base";
import "./Pagamentos.css";

import {
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { api } from "./apiService/api";
import type { Property, Bill } from "./types";

type Status = "ok" | "pendente" | "atrasado";

type PagamentoImovel = Bill & {
  propertyId: number;
  street: string;
  numberProperty: number;
  complement: string;
  ownerName: string;
};

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

/* =========================
   CARD
========================= */

function PagamentoCard({ info }: { info: PagamentoImovel }) {
  const status = pagamentoStatus(info);

  return (
    <div className="pay-card">
      <div className="pay-info">
        <p className="pay-title">
          ({formatarId(info.id)}) Conta de {info.bill_type} -{" "} ({formatarId(info.propertyId)}) 
          {" "} {info.street}, {info.numberProperty}/{info.complement}
        </p>

        <p className="pay-tenant">
          Inquilino: {info.ownerName}
        </p>

        {status !== "ok" ? (
          <p className={`pay-date ${status}`}>
            Data de vencimento:{" "}
            {new Date(info.due_date).toLocaleDateString("pt-BR")}
          </p>
        ) : (
          <p className={`pay-date ${status}`}>
            Data do pagamento:{" "}
            {info.payment_date
              ? new Date(info.payment_date).toLocaleDateString("pt-BR")
              : ""}
          </p>
        )}
      </div>

      <div className="pay-actions">
        <p className="pay-value">R$ {info.total.toFixed(2)}</p>

        {status !== "ok" && (
          <button className="pay-btn">Pagar agora</button>
        )}
      </div>
    </div>
  );
}

/* =========================
   SECTION
========================= */

function Section({
  title,
  items,
  bg,
}: {
  title: string;
  items: PagamentoImovel[];
  bg: "pendente" | "efetuado";
}) {
  const [qtdPayment, setQtdPayment] = useState(4);

  function mostrarMaisPagamentos() {
    setQtdPayment((p) => p + 4);
  }

  function mostrarMenosPagamentos() {
    setQtdPayment((p) => Math.max(4, p - 4));
  }

  const pagamentosVisiveis = items.slice(0, qtdPayment);

  return (
    <div className={`section section-${bg}`}>
      <div className="section-head">
        <h3>{title}</h3>
      </div>

      <div className="section-list">
        {pagamentosVisiveis.map((infoP) => (
          <PagamentoCard key={infoP.id} info={infoP} />
        ))}

        {qtdPayment < items.length && (
          <div className="ver-mais-wrap">
            <button className="ver-mais" onClick={mostrarMaisPagamentos}>
              Ver mais <ChevronDown size={14} />
            </button>
          </div>
        )}

        {qtdPayment > 4 && (
          <div className="ver-menos-wrap">
            <button className="ver-menos" onClick={mostrarMenosPagamentos}>
              Ver menos <ChevronUp size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   PAGE
========================= */

export default function Pagamentos() {
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

  /* =========================
     FLATTEN + SEARCH
  ========================= */

  const pagamentos = useMemo(() => {
    const q = query.toLowerCase().trim();

    return imoveis.flatMap((imovel) =>
      (imovel.bills ?? [])
        .map((pagamento) => ({
          ...pagamento,
          propertyId: imovel.id ?? 0,
          street: imovel.street,
          numberProperty: imovel.number,
          complement: imovel.complement,
          ownerName: imovel.owner?.name ?? "Não definido",
        }))
        .filter((p) => {
          if (!q) return true;

          return (
            String(p.propertyId).includes(q) ||
            p.bill_type?.toLowerCase().includes(q) ||
            p.street?.toLowerCase().includes(q) ||
            String(p.numberProperty).includes(q) ||
            p.complement?.toLowerCase().includes(q) ||
            p.ownerName?.toLowerCase().includes(q)
          );
        })
    );
  }, [imoveis, query]);

  /* =========================
     STATUS SPLIT
  ========================= */

  const pendentes = useMemo(
    () =>
      pagamentos.filter(
        (p) =>
          pagamentoStatus(p) === "pendente" ||
          pagamentoStatus(p) === "atrasado"
      ),
    [pagamentos]
  );

  const efetuados = useMemo(
    () => pagamentos.filter((p) => pagamentoStatus(p) === "ok"),
    [pagamentos]
  );

  /* =========================
     METRICS
  ========================= */

  const totalPendencias = pendentes.reduce(
    (t, p) => t + p.total,
    0
  );

  const custoTotal = pagamentos.reduce(
    (t, p) => t + p.total,
    0
  );

  const valorPago = custoTotal - totalPendencias;

  const progresso =
    custoTotal > 0 ? (valorPago / custoTotal) * 100 : 0;

  if (loading) {
    return (
      <Base>
        <p>Carregando...</p>
      </Base>
    );
  }

  return (
    <Base>
      {/* BANNER */}
      <div className="banner">
        <div>
          <p className="banner-label">Total a pagar</p>

          <p className="banner-value">
            R$ {totalPendencias.toFixed(2)}
          </p>

          <p className="banner-desc">
            {efetuados.length}/
            {pagamentos.length} pagamentos efetuados
          </p>
        </div>

        <div className="progress-block">
          <p className="progress-label">Progresso</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progresso}%` }}
            />
          </div>

          <p className="progress-sub">
            R$ {valorPago.toFixed(2)} pago de R${" "}
            {custoTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content">
        <div className="content-toolbar">
          <div className="search-pag">
            <input
              className="search-pag-input"
              placeholder="🔎 Buscar por pagamento"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button className="filtro-bt">
            <Filter size={14} /> Filtro
          </button>
        </div>

        <div className="lista-pagamentos">
          <Section title="Pendentes" items={pendentes} bg="pendente" />
          <Section title="Efetuados" items={efetuados} bg="efetuado" />
        </div>
      </div>
    </Base>
  );
}