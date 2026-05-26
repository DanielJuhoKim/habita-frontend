import { useEffect, useMemo, useState } from "react";
import "./Inquilinos.css";
import Base from "./Base";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { api } from "./apiService/api";

import type {
  Owner,
  Property,
} from "./types";

function getInitials(nome: string) {
  return nome
    .split(" ")
    .map((parte) => parte[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getImoveisFromOwner(
  ownerId: number,
  imoveis: Property[]
) {
  return imoveis.filter(
    (imovel) =>
      imovel.owner_id === ownerId
  );
}

function Card({
  data,
  imoveis,
}: {
  data: Owner;
  imoveis: Property[];
}) {
  const navigate = useNavigate();

  const imoveisOwner =
    getImoveisFromOwner(
      data.id ?? 0,
      imoveis
    );

  return (
    <div className="inq-card">
      <div className="inq-head">
        <div className="inq-avatar">
          {getInitials(data.name)}
        </div>

        <div className="inq-id">
          <div className="inq-name">
            {data.name}
          </div>

          <div className="inq-since">
            Cadastrado em{" "}
            {new Date(
              data.signup_date
            ).toLocaleDateString(
              "pt-BR"
            )}
          </div>
        </div>
      </div>

      <div className="inq-contact">
        <div className="contact-row">
          <span className="contact-ico">
            ✉
          </span>

          <a
            href={`mailto:${data.email}`}
          >
            {data.email}
          </a>
        </div>

        <div className="contact-row">
          <span className="contact-ico">
            📞
          </span>

          <a
            href={`tel:${data.phone.replace(
              /\D/g,
              ""
            )}`}
          >
            {data.phone}
          </a>
        </div>
      </div>

      <div className="inq-imoveis">
        <div className="imoveis-label">
          Imóveis vinculados (
          {imoveisOwner.length})
        </div>

        <ul className="imoveis-list">
          {imoveisOwner.map(
            (imovel) => (
              <li key={imovel.id}>
                <span className="imovel-ico">
                  ⌂
                </span>

                {imovel.street},{" "}
                {imovel.number} —{" "}
                {imovel.complement}
              </li>
            )
          )}
        </ul>
      </div>

      <button className="btn-ghost">
        Mensagem
      </button>

      <button
        className="btn-primary"
        onClick={() =>
          navigate(
            `/inquilinos/${data.id}`
          )
        }
      >
        Ver detalhes
      </button>
    </div>
  );
}

export default function Inquilinos() {
  const [query, setQuery] =
    useState("");

  const [owners, setOwners] =
    useState<Owner[]>([]);

  const [imoveis, setImoveis] =
    useState<Property[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [
          ownersResponse,
          propertiesResponse,
        ] = await Promise.all([
          api.get("/owner"),
          api.get("/property"),
        ]);

        setOwners(
          ownersResponse.data
        );

        setImoveis(
          propertiesResponse.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  const list = useMemo(() => {
    return owners.filter((owner) => {
      const matchQ =
        !query ||
        owner.name
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        owner.email
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        owner.phone.includes(query);

      return matchQ;
    });
  }, [query, owners]);

  if (loading) {
    return (
      <Base>
        <p>Carregando...</p>
      </Base>
    );
  }

  return (
    <Base>
      <div
        className="card panel"
        style={{ gap: 16 }}
      >
        <div className="inq-toolbar">
          <div className="inq-title">
            <h2>Inquilinos</h2>

            <span className="inq-count">
              {list.length} encontrados
            </span>
          </div>

          <div className="inq-tools">
            <div className="search">
              <input
                type="text"
                placeholder=" 🔎 Buscar por inquilino"
                value={query}
                onChange={(e) =>
                  setQuery(
                    e.target.value
                  )
                }
              />
            </div>

            <button className="filtro-bt">
              <Filter size={14} />
              Filtros
            </button>
          </div>
        </div>

        <div className="scroll inq-grid">
          {list.map((owner) => (
            <Card
              key={owner.id}
              data={owner}
              imoveis={imoveis}
            />
          ))}

          {list.length === 0 && (
            <div className="empty">
              Nenhum inquilino
              encontrado.
            </div>
          )}
        </div>
      </div>
    </Base>
  );
}