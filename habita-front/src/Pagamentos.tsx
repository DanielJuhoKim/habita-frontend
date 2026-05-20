import Base from "./Base";
import "./Pagamentos.css";

import {
  Filter, Search, ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useState } from "react";

import { imoveis, type PagamentoInfo, totalPendencias } from "./constantes";

type Pag_imovel = 
  PagamentoInfo & {
  id: number;

  logradouro: string;
  complemento: string;
  inquilino: string;
};

function PagamentoCard({ info }: { info: Pag_imovel }) {
  return (
    <div className="pay-card">
      <div className="pay-info">
        <p className="pay-title">{info.desc} — {info.logradouro}/{info.complemento}</p>
        <p className="pay-tenant">Inquilino: {info.inquilino}</p>
        <p className={`pay-date ${info.status}`}>Data de vencimento: {info.date.toLocaleDateString("pt-BR")}</p>
      </div>
      <div className="pay-actions">
        <p className="pay-value">R$ {info.value}</p>
        <button className="pay-btn">Pagar agora</button>
      </div>
    </div>
  );
}

function Section({
  title, items, bg,
}: { 
  title: string; 
  items: Pag_imovel[]; 
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
        pagamentos_visiveis.map((info_p, i) => (
          <PagamentoCard key={i} info={info_p} />
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
// pagamento.status == "pendente" || pagamento.status == "atrasado"
  const pendentes = imoveis.flatMap((imovel) => imovel.pagamentos.map(
    (pagamento) => ({
    ...pagamento,
    id: imovel.id,
    logradouro: imovel.logradouro,
    complemento: imovel.complemento,
    inquilino: imovel.inquilino

  }))).filter((pagamento) => pagamento.status == "pendente" || pagamento.status == "atrasado")

  const efetuados = imoveis.flatMap((imovel) => imovel.pagamentos.map(
    (pagamento) => ({
    ...pagamento,
    id: imovel.id,
    logradouro: imovel.logradouro,
    complemento: imovel.complemento,
    inquilino: imovel.inquilino
    
  }))).filter((pagamento) => pagamento.status == "ok")
  
  return (
    <Base>
        <div className="banner">
          <div>
            <p className="banner-label">Total a pagar</p>
            <p className="banner-value">R$ {totalPendencias}</p>
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
            <Section title="Pendente" items = {pendentes} bg="pendente" />
            <Section title="Efetuado" items = {efetuados} bg="efetuado" />
          </div>
        </div>
    </Base>
  );
}
