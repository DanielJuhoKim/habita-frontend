import "./Imoveis.css";
import Base from "./Base";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Prioridade = { tone: "late" | "pending"; text: string };
type Imovel = {
  id: number,
  title: string;
  tenant: string;
  gasto: string;
  gastoStatus: "atraso" | "ok";
  pendente: string;
  adimplencia: string;
  status: string[];
  prioridades: Prioridade[];
};

const imoveis: Imovel[] = [
  {
    id: 7,
    title: "Rua das Palmeiras, 210 — Casa",
    tenant: "João Silva",
    gasto: "R$ 312,40",
    gastoStatus: "ok",
    pendente: "R$ 0,00",
    adimplencia: "98%",
    status: ["------"],
    prioridades: [
      { tone: "pending", text: "Conta de água vence em 8 dias" },
    ],
  },
  {
    id: 7,
    title: "Av. Central, 890 — Apt 45",
    tenant: "Ana Costa",
    gasto: "R$ 482,12",
    gastoStatus: "atraso",
    pendente: "R$ 982,71",
    adimplencia: "82%",
    status: ["2 atrasos", "4 pendências"],
    prioridades: [
      { tone: "late", text: "Aluguel atrasado há 3 dias" },
      { tone: "pending", text: "Conta de luz vence amanhã" },
    ],
  },
  {
    id: 7,
    title: "Rua João Pedro, 700 — Apt 203",
    tenant: "Fernanda Ribeira",
    gasto: "R$ 627,80",
    gastoStatus: "atraso",
    pendente: "R$ 1.207,67",
    adimplencia: "61%",
    status: ["4 atrasos", "6 pendências"],
    prioridades: [
      { tone: "late", text: "Aluguel vencido em 03/06/26" },
      { tone: "late", text: "Multa por atraso aplicada" },
    ],
  },
  {
    id: 7,
    title: "Av. Ribeiro, 861",
    tenant: "Carlos Mendes",
    gasto: "R$ 198,55",
    gastoStatus: "ok",
    pendente: "R$ 0,00",
    adimplencia: "100%",
    status: ["------"],
    prioridades: [
      { tone: "pending", text: "Manutenção agendada para 22/07" },
    ],
  },
  {
    id: 7,
    title: "Rua Verde, 312 — Apt 12",
    tenant: "Marina Souza",
    gasto: "R$ 354,00",
    gastoStatus: "ok",
    pendente: "R$ 890,00",
    adimplencia: "91%",
    status: ["2 atrasos", "2 pendências"],
    prioridades: [
      { tone: "pending", text: "Aluguel vence em 15/07/26" },
    ],
  },
];

function FilterBtn() {
  return <button className="filtro-bt"><Filter size={14} /> Filtros</button>;
}

function Card({ data }: { data: Imovel }) {
  const navigate = useNavigate();
  return (
    <div className="card rel-card">
      <div className="rel-head">
        <div>
          <p className="rel-title">{data.title}</p>
          <p className="rel-tenant">Inquilino: {data.tenant}</p>
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
            {data.gasto}
          </p>
          <p className="metric-note">
            {data.gastoStatus === "atraso" ? "Acima da média" : "Dentro do previsto"}
          </p>
        </div>
        <div className="rel-metric">
          <p className="metric-label">Pendente</p>
          <p className={`metric-value`}>
            {data.pendente}
          </p>
          {data.status.map((item, index) => (
          <p key={index} className="metric-note">
            {item}
          </p>
          ))}
        </div>
        <div className="rel-metric">
          <p className="metric-label">Adimplência</p>
          <p className="metric-value">{data.adimplencia}</p>
          <p className="metric-note">Últimos 12 meses</p>
        </div>

        <div className="prioridades">
          <p className="metric-label">Prioridades</p>
          <ul>
            {data.prioridades.map((p, i) => (
              <li key={i}>
                <span className={`dot dot-${p.tone}`} />
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
      <div className="card panel" style={{ flex: 1, minHeight: 0 }}>
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
