import Base from "./Base";
import "./Pagamentos.css";

import {
  Filter, Search, ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useState } from "react";

import { imoveis, type PagamentoInfo, totalPendencias, custoTotal, getInquilino, formatarId, qtd_atrasados, qtd_pendentes, qtd_efetuados, pagamentoStatus } from "./constantes";

type Pag_imovel = 
  PagamentoInfo 
  & {
  id: number;

  logradouro: string;
  numero: number
  complemento: string;
  inquilino: number;
};

function PagamentoCard({ info }: { info: Pag_imovel }) {
  const status = pagamentoStatus(info);

  return (
    <div className="pay-card">
      <div className="pay-info">
        <p className="pay-title">
          ({formatarId(info.id)}) {info.tipo_pagamento} - {info.logradouro}, {info.numero}/{info.complemento}
        </p>

        <p className="pay-tenant">
          Inquilino: {getInquilino(info.inquilino)?.nome}
        </p>

        {
          status !== "ok" ? (
            <p className={`pay-date ${status}`}>
              Data de vencimento: {info.data_vencimento.toLocaleDateString("pt-BR")}
            </p>
          ) : (
            <p className={`pay-date ${status}`}>
              Data do pagamento: {info.data_pagamento?.toLocaleDateString("pt-BR")}
            </p>
          )
        }
      </div>

      <div className="pay-actions">
        <p className="pay-value">R$ {info.total}</p>

        {status !== "ok" && (
          <button className="pay-btn">
            Pagar agora
          </button>
        )}
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
  const pendentes = imoveis.flatMap((imovel) => imovel.pagamentos.map(
    (pagamento) => ({
    ...pagamento,
    id: imovel.id,
    logradouro: imovel.logradouro,
    numero: imovel.numero,
    complemento: imovel.complemento,
    inquilino: imovel.inquilino

  }))).filter((pagamento) => pagamentoStatus(pagamento) == "pendente" || pagamentoStatus(pagamento) == "atrasado")

  const efetuados = imoveis.flatMap((imovel) => imovel.pagamentos.map(
    (pagamento) => ({
    ...pagamento,
    id: imovel.id,
    logradouro: imovel.logradouro,
    numero: imovel.numero,
    complemento: imovel.complemento,
    inquilino: imovel.inquilino
    
  }))).filter((pagamento) => pagamentoStatus(pagamento) == "ok")

  const valorPago = custoTotal - totalPendencias;

  const progresso = (valorPago / custoTotal) * 100;
  
  return (
    <Base>
        <div className="banner">
          <div>
            <p className="banner-label">Total a pagar</p>
            <p className="banner-value">R$ {totalPendencias.toFixed(2)}</p>
            <p className="banner-desc">{qtd_efetuados}/{qtd_atrasados + qtd_pendentes + qtd_efetuados} pagamentos efetuados</p>
          </div>
          <div className="progress-block">
            <p className="progress-label">Progresso</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progresso}%` }}
              />
            </div>
            <p className="progress-sub">R$ {(custoTotal - totalPendencias).toFixed(2)} pago de R$ {custoTotal.toFixed(2)}</p>
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
