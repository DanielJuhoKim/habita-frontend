import "./Imoveis.css";
import Base from "./Base";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { imoveis, type Imovel, pendenciaTotal, getInquilino, formatarId, getAdimplencia } from "./constantes"

function FilterBtn() {
  return <button className="filtro-bt"><Filter size={14} /> Filtros</button>;
}

function Card({ data }: { data: Imovel }) {
  const navigate = useNavigate();

  const qtd_atrasados = data.pagamentos.filter(
  (pag) => pag.status === "atrasado"
).length;

const qtd_pendentes = data.pagamentos.filter(
  (pag) => pag.status === "pendente"
).length;

  return (
    <div className="card rel-card">
      <div className="rel-head">
        <div>
          <p className="rel-title">({formatarId(data.id)}) {data.logradouro + " - " + data.complemento}</p>
          <p className="rel-tenant">Inquilino: {getInquilino(data.inquilino)?.nome}</p>
        </div>
        <button
          className="btn-detalhes"
          onClick={() =>
            navigate(
              `/imoveis/${encodeURIComponent(data.id)}`
            )
          }
        >
          Ver detalhes
        </button>
      </div>

      <div className="rel-body">
        <div className="rel-metric">
          <p className="metric-label">Gasto no mês</p>
          <p className={`metric-value`}>
            {"R$ " + data.relatorio.gasto}
          </p>
          <p className={
            data.relatorio.gastoStatus === "atraso"
              ? "metric-atraso"
              : "metric-ok"
          }>

          {data.relatorio.gastoStatus === "atraso"
            ? "Acima da média"
            : "Dentro do previsto"}
        </p>
        </div>
        <div className="rel-metric">
          <p className="metric-label">Pendente</p>
          <p className={`metric-value`}>
            {"R$ " + pendenciaTotal(data)}
          </p>
          <p className = {
            qtd_atrasados === 0
              ? "metric-ok"
              : "metric-atraso"
          }> {qtd_atrasados} atrasos
        </p>

        <p
          className = {
            qtd_pendentes === 0
              ? "metric-ok"
              : "metric-pendente"
          }> {qtd_pendentes} pendências
        </p>
        </div>
        <div className="rel-metric">
          <p className="metric-label">Adimplência</p>
          <p className="metric-value">{getAdimplencia(data)}</p>
          <p className="metric-note">Últimos 12 meses</p>
        </div>

        <div className="prioridades">
          <p className="metric-label">Prioridades</p>
          <ul>
            {data.relatorio.prioridades.map((p, i) => (
              <li key={i}>
                <span className={`dot dot-${p.corStat}`} />
                {p.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Imoveis() {
  return (
    <Base>
      <div className="card panel">
        <div className="objetos">
          <h2>Relatórios por imóvel</h2>
          <FilterBtn />
        </div>
        <div className="scroll cards-scroll">
          {imoveis.map((it, i) => <Card key={i} data={it} />)}
        </div>
      </div>
    </Base>
  );
}
