import { useMemo, useState } from "react";
import "./Inquilinos.css";
import Base from "./Base";
import {Filter} from "lucide-react";

type Inquilino = {
  nome: string;
  email: string;
  telefone: string;
  desde: string;
  imoveis: string[];
};

const inquilinos: Inquilino[] = [
  {
    nome: "Ana Beatriz Souza",
    email: "ana.souza@email.com",
    telefone: "(11) 98765-4321",
    desde: "Mar 2023",
    imoveis: ["Rua das Flores, 120 — Apto 32", "Av. Paulista, 1500 — Sala 8"],
  },
  {
    nome: "Carlos Henrique Lima",
    email: "carlos.lima@email.com",
    telefone: "(21) 99812-3344",
    desde: "Ago 2022",
    imoveis: ["Rua Marechal, 45 — Casa"],
  },
  {
    nome: "Marina Oliveira Costa",
    email: "marina.costa@email.com",
    telefone: "(31) 99700-1122",
    desde: "Jan 2024",
    imoveis: ["Edifício Aurora — Apto 1102"],
  },
  {
    nome: "Pedro Almeida Rocha",
    email: "pedro.rocha@email.com",
    telefone: "(48) 99123-7788",
    desde: "Mai 2023",
    imoveis: ["Rua das Acácias, 88", "Galpão Industrial — Distrito Sul"],
  },
  {
    nome: "Juliana Pereira Mendes",
    email: "juliana.mendes@email.com",
    telefone: "(11) 98800-5566",
    desde: "Out 2021",
    imoveis: ["Cobertura Vista Verde — Apto 2001"],
  },
  {
    nome: "Rafael Nogueira",
    email: "rafael.nog@email.com",
    telefone: "(85) 99411-2200",
    desde: "Fev 2024",
    imoveis: ["Studio Centro — 504"],
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function Card({ data }: { data: Inquilino }) {
  return (
    <div className="inq-card">
      <div className="inq-head">
        <div className="inq-avatar">{initials(data.nome)}</div>
        <div className="inq-id">
          <div className="inq-name">{data.nome}</div>
          <div className="inq-since">Inquilino desde {data.desde}</div>
        </div>
      </div>

      <div className="inq-contact">
        <div className="contact-row">
          <span className="contact-ico">✉</span>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </div>
        <div className="contact-row">
          <span className="contact-ico">📞</span>
          <a href={`tel:${data.telefone.replace(/\D/g, "")}`}>{data.telefone}</a>
        </div>
      </div>

      <div className="inq-imoveis">
        <div className="imoveis-label">Imóveis vinculados ({data.imoveis.length})</div>
        <ul className="imoveis-list">
          {data.imoveis.map((im, i) => (
            <li key={i}>
              <span className="imovel-ico">⌂</span>
              {im}
            </li>
          ))}
        </ul>
      </div>

      <div className="inq-actions">
        <button className="btn-ghost">Mensagem</button>
        <button className="btn-primary">Ver detalhes</button>
      </div>
    </div>
  );
}

export default function Inquilinos() {
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    return inquilinos.filter((i) => {
      const matchQ =
        !query ||
        i.nome.toLowerCase().includes(query.toLowerCase()) ||
        i.email.toLowerCase().includes(query.toLowerCase()) ||
        i.telefone.includes(query);
      return matchQ;
    });
  }, [query]);

  return (
    <Base>
      <div className="card panel" style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="inq-toolbar">
          <div className="inq-title">
            <h2>Inquilinos</h2>
            <span className="inq-count">{list.length} encontrados</span>
          </div>

          <div className="inq-tools">
            <div className="search">
              <span className="search-ico">🔎</span>
              <input
                type="text"
                placeholder="Buscar por nome, e-mail ou telefone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <button className="filtro-bt"><Filter size={14} /> Filtros</button>

            <button className="btn-primary">+ Novo inquilino</button>
          </div>
        </div>

        <div className="scroll inq-grid">
          {list.map((it, i) => (
            <Card key={i} data={it} />
          ))}
          {list.length === 0 && (
            <div className="empty">Nenhum inquilino encontrado.</div>
          )}
        </div>
      </div>
    </Base>
  );
}
