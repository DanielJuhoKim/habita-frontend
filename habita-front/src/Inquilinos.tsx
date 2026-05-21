import { useMemo, useState } from "react";
import "./Inquilinos.css";
import Base from "./Base";
import {Filter} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { inquilinos, type Inquilino, getImovel, getInitials } from "./constantes";

function Card({ data }: { data: Inquilino }) {
  const navigate = useNavigate();
  return (
    <div className="inq-card">
      <div className="inq-head">
        <div className="inq-avatar">{getInitials(data.nome)}</div>
        <div className="inq-id">
          <div className="inq-name">{data.nome}</div>
          <div className="inq-since">Inquilino desde {data.desde.toLocaleDateString("pt-br")}</div>
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
          {data.imoveis.map((idImovel) => {
            const imovel = getImovel(idImovel);

            return (
              <li key={idImovel}>
                <span className="imovel-ico">⌂</span>

                {imovel?.logradouro} — {imovel?.complemento}
              </li>
            );
          })}
        </ul>
      </div>
        <button className="btn-ghost">Mensagem</button>
        <button className="btn-primary" onClick={() => navigate(`/inquilinos/${data.id}`)}>
          Ver detalhes</button>
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
      <div className="card panel" style={{ gap: 16 }}>
        <div className="inq-toolbar">
          <div className="inq-title">
            <h2>Inquilinos</h2>
            <span className="inq-count">{list.length} encontrados</span>
          </div>

          <div className="inq-tools">
            <div className="search">
              <input
                type="text"
                placeholder=" 🔎 Buscar por nome, e-mail ou telefone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <button className="filtro-bt"><Filter size={14} /> Filtros</button>

            <button className="btn-novo-inq">+ Novo inquilino</button>
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
