import { useState } from "react";
import "./DetalhesImovel.css";
import Base from "./Base";
import { useNavigate, useParams } from "react-router-dom";
import { getImovel, statusImovel, pendenciaTotal, gastoMensal, getInitials, getInquilino } from "./constantes";

type Status = "ok" | "atraso" | "pendente";

type Pagamento = {
  mes: string;
  valor: number;
  status: "pago" | "pendente" | "atraso";
  data?: string;
};

type Manutencao = {
  data: string;
  titulo: string;
  custo: number;
  status: "concluida" | "em-andamento" | "agendada";
};

type Documento = {
  nome: string;
  tipo: string;
  tamanho: string;
};

type Imovel2 = {
  endereco: string;
  tipo: string;
  inquilino: {
    nome: string;
    email: string;
    telefone: string;
    desde: string;
  };
  contrato: {
    inicio: string;
    fim: string;
    valor: number;
    reajuste: string;
    caucao: number;
  };
  metricas: {
    gastoMes: number;
    pendente: number;
    adimplencia: number;
    receitaAno: number;
  };
  status: Status;
  caracteristicas: {
    area: string;
    quartos: number;
    banheiros: number;
    vagas: number;
  };
  pagamentos: Pagamento[];
  manutencoes: Manutencao[];
  documentos: Documento[];
};

const imovel_: Imovel2 = {
  endereco: "Rua das Palmeiras, 210",
  tipo: "Casa",
  inquilino: {
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    desde: "Mar 2023",
  },
  contrato: {
    inicio: "01/03/2023",
    fim: "28/02/2026",
    valor: 2800,
    reajuste: "IGP-M anual",
    caucao: 8400,
  },
  metricas: {
    gastoMes: 312.4,
    pendente: 0,
    adimplencia: 98,
    receitaAno: 33600,
  },
  status: "ok",
  caracteristicas: {
    area: "120 m²",
    quartos: 3,
    banheiros: 2,
    vagas: 2,
  },
  pagamentos: [
    { mes: "Mai 2026", valor: 2800, status: "pendente" },
    { mes: "Abr 2026", valor: 2800, status: "pago", data: "05/04" },
    { mes: "Mar 2026", valor: 2800, status: "pago", data: "03/03" },
    { mes: "Fev 2026", valor: 2800, status: "pago", data: "04/02" },
    { mes: "Jan 2026", valor: 2800, status: "pago", data: "06/01" },
    { mes: "Dez 2025", valor: 2800, status: "pago", data: "05/12" },
  ],
  manutencoes: [
    { data: "12/04/2026", titulo: "Reparo no encanamento", custo: 280, status: "concluida" },
    { data: "28/03/2026", titulo: "Pintura externa", custo: 1500, status: "em-andamento" },
    { data: "20/05/2026", titulo: "Limpeza de caixa d'água", custo: 350, status: "agendada" },
  ],
  documentos: [
    { nome: "Contrato de locação.pdf", tipo: "PDF", tamanho: "1.2 MB" },
    { nome: "RG do inquilino.pdf", tipo: "PDF", tamanho: "320 KB" },
    { nome: "Comprovante de renda.pdf", tipo: "PDF", tamanho: "180 KB" },
    { nome: "Vistoria inicial.pdf", tipo: "PDF", tamanho: "2.4 MB" },
  ],
};

function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// type Aba = "visao" | "pagamentos" | "manutencoes" | "documentos";
type Aba = "visao" | "pagamentos" | "documentos";

export default function DetalhesImovel() {
  const [aba, setAba] = useState<Aba>("visao");
  const navigate = useNavigate();
  const { id_imovel } = useParams();
  const imovel = getImovel(Number(id_imovel));
  const status = statusImovel(imovel);
  const inquilino = getInquilino(imovel?.inquilino)
  const iniciais = getInitials(inquilino?.nome)

  return (
    <Base>
      <div className="card panel id-panel" >
        <div className="id-header">
          <div className="id-title-block">
            <div className="id-title-row">
              <div className="id-titles">
                <h2>{imovel?.logradouro}</h2>
                <h3>{imovel?.complemento}</h3>
              </div>

              <span className={`id-badge id-badge--${status}`}>
                {status === "ok" && "Em dia"}
                {status === "atrasado" && "Em atraso"}
                {status === "pendente" && "Pendente"}
              </span>
            </div>
          </div>
          <div className="id-actions">
            <button className="btn-editar">Editar</button>
            
            <button className="btn-inquilino" onClick={() => navigate(
              `/inquilinos/${imovel?.inquilino}`
            )
          }>Ver inquilino</button>
          </div>
        </div>

        <div className="scroll id-scroll">
          <div className="id-metrics">
            <div className="id-metric">
              <span className="id-metric-label">GASTO NO MÊS</span>
              <strong>R$ {gastoMensal(imovel)}</strong>
              <span className="id-metric-foot">Dentro do previsto</span>
            </div>
            <div className="id-metric">
              <span className="id-metric-label">PENDENTE</span>
              <strong>{pendenciaTotal(imovel)}</strong>
              <span className="id-metric-foot">——</span>
            </div>
            <div className="id-metric">
              <span className="id-metric-label">ADIMPLÊNCIA</span>
              <strong>{imovel_.metricas.adimplencia}%</strong>
              <span className="id-metric-foot">Últimos 12 meses</span>
            </div>
            <div className="id-metric">
              <span className="id-metric-label">RECEITA / ANO</span>
              <strong>{brl(imovel_.metricas.receitaAno)}</strong>
              <span className="id-metric-foot">Projeção 2026</span>
            </div>
          </div>

          <div className="id-grid">
            <section className="id-box">
              <h3>Inquilino</h3>
              <div className="id-tenant">
                <div className="id-avatar">{iniciais}</div>
                <div>
                  <strong>{inquilino?.nome}</strong>
                </div>
              </div>
              <ul className="id-list">
                <li><span>E-mail</span><span>{inquilino?.email}</span></li>
                <li><span>Telefone</span><span>{inquilino?.telefone}</span></li>
              </ul>
            </section>

            <section className="id-box">
              <h3>Contrato</h3>
              <ul className="id-list">
                <li><span>Início</span><span>{imovel_.contrato.inicio}</span></li>
                <li><span>Fim</span><span>{imovel_.contrato.fim}</span></li>
                <li><span>Aluguel</span><span>{brl(imovel_.contrato.valor)}</span></li>
                <li><span>Reajuste</span><span>{imovel_.contrato.reajuste}</span></li>
                <li><span>Caução</span><span>{brl(imovel_.contrato.caucao)}</span></li>
              </ul>
            </section>
          </div>

          <div className="id-tabs">
            <button className={aba === "visao" ? "active" : ""} onClick={() => setAba("visao")}>Visão geral</button>
            <button className={aba === "pagamentos" ? "active" : ""} onClick={() => setAba("pagamentos")}>Pagamentos</button>
            <button className={aba === "documentos" ? "active" : ""} onClick={() => setAba("documentos")}>Documentos</button>
          </div>

          <section className="id-box id-tab-content">
            {aba === "visao" && (
              <div className="id-overview">
                <div>
                  <h4>Próximos eventos</h4>
                  <ul className="id-events">
                    <li><span className="dot dot-pending" /> Conta de água vence em 8 dias</li>
                    <li><span className="dot dot-ok" /> Aluguel de Maio em 5 dias</li>
                    <li><span className="dot dot-pending" /> Vistoria semestral em 22 dias</li>
                  </ul>
                </div>
                <div>
                  <h4>Resumo financeiro</h4>
                  <ul className="id-list">
                    <li><span>Receita acumulada</span><span>{brl(14000)}</span></li>
                    <li><span>Despesas (ano)</span><span>{brl(2180)}</span></li>
                    <li><span>Resultado líquido</span><span>{brl(11820)}</span></li>
                  </ul>
                </div>
              </div>
            )}

            {aba === "pagamentos" && (
              <table className="id-table">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {imovel?.pagamentos.map((p, i) => (
                    <tr key={i}>
                      <td>{p.desc}</td>

                      <td>{brl(p.value)}</td>

                      <td>
                        {p.date.toLocaleDateString("pt-BR")}
                      </td>

                      <td>
                        <span className={`pill pill-${p.status}`}>
                          {p.status === "ok" && "Pago"}
                          {p.status === "pendente" && "Pendente"}
                          {p.status === "atrasado" && "Atrasado"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {aba === "documentos" && (
              <ul className="id-docs">
                {imovel_.documentos.map((d, i) => (
                  <li key={i}>
                    <div className="id-doc-icon">{d.tipo}</div>
                    <div className="id-doc-info">
                      <strong>{d.nome}</strong>
                      <span>{d.tamanho}</span>
                    </div>
                    <button className="btn-ghost">Baixar</button>
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
