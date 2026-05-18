import Base from "./Base";
import "./Pagamentos.css";

import {
  Filter, Search, ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useState } from "react";

type Status = "pending-soon" | "late" | "paid";

type Pagamento_info = {
  title: string;
  tenant: string;
  info: string;
  status: Status;
  value: string;
};

const pendentes: Pagamento_info[] = [
  { title: "Aluguel - R. das Palmeiras, 210/Casa", tenant: "João Silva", info: "Vence em 28/06/2026", status: "pending-soon", value: "R$ 3.795,15" },
  { title: "Conta de luz - R. Floripa, 892/Apt 97 (Canva)", tenant: "Pedro Carvalho - Enel", info: "Vence em 28/06/2026", status: "pending-soon", value: "R$ 208,03" },
  { title: "Conta de gás - R. Floripa, 892/Apt 61 (Jamal)", tenant: "Pedro Carvalho - ComGás", info: "Venceu em 03/06/2026", status: "late", value: "R$ 295,75" },
  { title: "Aluguel - Av. Central, 890/Apt 45", tenant: "Ana Costa", info: "Vence em 21/07/2026", status: "pending-soon", value: "R$ 982,71" },
  { title: "Condomínio - R. Bela Vista, 06", tenant: "Marina Souza", info: "Vence em 15/07/2026", status: "pending-soon", value: "R$ 420,00" },
  { title: "IPTU - Av. Brasil, 1500", tenant: "Pedro Lima", info: "Venceu em 10/06/2026", status: "late", value: "R$ 612,40" },
];

const efetuados: Pagamento_info[] = [
  { title: "Aluguel - R. Bela Vista, 920/Casa", tenant: "Marcio Oliveira", info: "Data: 30/05/2026 - Pago em 28/05/2026", status: "paid", value: "R$ 2.481,06" },
  { title: "Conta de luz - Av. Ribeiro, 861/Apt 97", tenant: "Carlos Mendes - Enel", info: "Data: 25/05/2026 - Pago em 22/05/2026", status: "paid", value: "R$ 187,32" },
  { title: "Aluguel - Rua das Palmeiras, 210", tenant: "João Silva", info: "Data: 01/06/2026 - Pago em 31/05/2026", status: "paid", value: "R$ 1.087,91" },
  { title: "Condomínio - Av. Central, 890", tenant: "Ana Costa", info: "Data: 05/06/2026 - Pago em 04/06/2026", status: "paid", value: "R$ 380,00" },
];

function PagamentoCard({ pagamento }: { pagamento: Pagamento_info }) {
  return (
    <div className="pay-card">
      <div className="pay-info">
        <p className="pay-title">{pagamento.title}</p>
        <p className="pay-tenant">Inquilino: {pagamento.tenant}</p>
        <p className={`pay-date ${pagamento.status}`}>{pagamento.info}</p>
      </div>
      <div className="pay-actions">
        <p className="pay-value">{pagamento.value}</p>
        <button className="pay-btn">Pagar agora</button>
      </div>
    </div>
  );
}

function Section({
  title, items, bg,
}: { 
  title: string; 
  items: Pagamento_info[]; 
  bg: "pendente" | "efetuado" 
  }) {
  const [qtd_payment, qtd_payment_visivel] = useState(4);

  function mostrarMaisPagamentos() {
    qtd_payment_visivel((anterior) => anterior + 4);
  }

  function mostrarMenosPagamentos() {
    qtd_payment_visivel((anterior) => anterior - 4);
  }

  const pagamentos_visiveis = items.slice(0, qtd_payment);

  return (
    <div className={`section section-${bg}`}>
      <div className="section-head">
        <h3>{title}</h3>
      </div>

      <div className="section-list">
        {
        pagamentos_visiveis.map((p, i) => (
          <PagamentoCard key={i} pagamento={p} />
        ))
        }

        {
        qtd_payment < items.length && (
          <div className="ver-mais-wrap">
              <button className="ver-mais" onClick={mostrarMaisPagamentos}>
                Ver mais <ChevronDown size={14} />
              </button>
            </div>
          )
        }
        {
          qtd_payment >= 2 && (
          <div className="ver-menos-wrap">
              <button className="ver-menos" onClick={mostrarMenosPagamentos}>
                Ver menos <ChevronUp size={14} />
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default function Pagamentos() {
  return (
    <Base>
        <div className="banner">
          <div>
            <p className="banner-label">Total a pagar</p>
            <p className="banner-value">R$ 6.095,15</p>
            <p className="banner-desc">10 pagamentos pendentes - 14 pagamentos efetuados</p>
          </div>
          <div className="progress-block">
            <p className="progress-label">Progresso</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "63%" }} />
            </div>
            <p className="progress-sub">R$ 3.876,90 pago de R$ 4.095,15</p>
          </div>
        </div>

        {/* Conteúdo com scroll */}
        <div className="content">
          <div className="content-toolbar">
            <div /> {/* spacer */}
            <div className="barra-filtro-right">
              <button className="filtro-bt"><Filter size={14} /> Filtro</button>
              <button className="filtro-bt"><Search size={14} /> Buscar</button>
            </div>
          </div>

          <div className="lista-pagamentos">
            <Section title="Pendente" items={pendentes} bg="pendente" />
            <Section title="Efetuado" items={efetuados} bg="efetuado" />
          </div>
        </div>
    </Base>
  );
}
