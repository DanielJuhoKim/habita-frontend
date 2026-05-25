// @ts-nocheck
import "./AdicionarImovel.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserPlus, Users } from "lucide-react";

import Base from "./Base";
import { api } from "./apiService/api";

type ModoInquilino = "existente" | "novo";

type Inquilino = {
  id: number;
  name?: string;
  phone?: string;
  observations?: string;
  nome?: string;
  telefone?: string;
  observacoes?: string;
  cpf: string;
  email: string;
};

export default function AdicionarImovel() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // =========================
  // IMÓVEL
  // =========================
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // =========================
  // INQUILINOS
  // =========================
  const [inquilinos, setInquilinos] = useState<Inquilino[]>([]);
  const [modoInquilino, setModoInquilino] =
    useState<ModoInquilino>("existente");

  const [inquilinoSelecionado, setInquilinoSelecionado] = useState("");

  const [novoNome, setNovoNome] = useState("");
  const [novoCpf, setNovoCpf] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [novoObservacoes, setNovoObservacoes] = useState("");

  // =========================
  // BUSCAR INQUILINOS
  // =========================
  useEffect(() => {
    async function carregarInquilinos() {
      try {
        const response = await api.get("/owner/");

        setInquilinos(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (error) {
        console.error(error);
        setInquilinos([]);
      }
    }

    carregarInquilinos();
  }, []);

  // =========================
  // SUBMIT
  // =========================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      let ownerId: number | null = null;

      // =========================
      // NOVO INQUILINO
      // =========================
      if (modoInquilino === "novo") {
        const ownerPayload = {
          name: novoNome,
          cpf: novoCpf,
          phone: novoTelefone,
          email: novoEmail,
          signup_date: new Date()
            .toISOString()
            .split("T")[0],
          observations: novoObservacoes,
          description: "",
        };

        const res = await api.post(
          "/owner/",
          ownerPayload
        );

        ownerId = res.data.id;
      } else {
        // =========================
        // EXISTENTE
        // =========================
        if (!inquilinoSelecionado) {
          alert("Selecione um inquilino.");
          return;
        }

        ownerId = Number(inquilinoSelecionado);
      }

      // =========================
      // VALIDAÇÃO
      // =========================
      if (
        !logradouro ||
        !numero ||
        !cidade ||
        !estado
      ) {
        alert(
          "Preencha todos os campos obrigatórios."
        );
        return;
      }

      // =========================
      // PROPERTY
      // =========================
      const propertyPayload = {
        cep: cep || "",
        street: logradouro,
        number: Number(numero),
        complement: complemento || "",
        description: descricao || "",
        city: cidade,
        state: estado,
        owner_id: ownerId,
        user_id: 1,
      };

      await api.post(
        "/property/",
        propertyPayload
      );

      alert("Imóvel criado com sucesso!");

      navigate("/imoveis");
    } catch (error: any) {
      console.error(
        "ERRO COMPLETO:",
        error?.response?.data
      );

      const err =
        error?.response?.data?.detail;

      alert(
        typeof err === "string"
          ? err
          : JSON.stringify(err)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Base>
      <form
        className="card add-panel"
        onSubmit={handleSubmit}
      >
        {/* HEADER */}
        <div className="add-head">
          <div />

          <div className="add-title-wrap">
            <h2 className="add-title">
              Adicionar imóvel
            </h2>

            <p className="add-sub">
              Preencha os dados do imóvel e
              vincule um inquilino
            </p>
          </div>

          <div className="add-actions">
            <button
              type="button"
              className="btn-secundario"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-primario"
              disabled={loading}
            >
              {loading
                ? "Salvando..."
                : "Salvar imóvel"}
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="add-scroll">
          {/* ========================= */}
          {/* IMÓVEL */}
          {/* ========================= */}
          <section className="bloco">
            <div className="bloco-header">
              <h3>Dados do imóvel</h3>
            </div>

            <div className="bloco-body grid-2">
              <input
                placeholder="Logradouro"
                value={logradouro}
                onChange={(e) =>
                  setLogradouro(
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Número"
                value={numero}
                onChange={(e) =>
                  setNumero(e.target.value)
                }
              />

              <input
                placeholder="Complemento"
                value={complemento}
                onChange={(e) =>
                  setComplemento(
                    e.target.value
                  )
                }
              />

              <input
                placeholder="CEP"
                value={cep}
                onChange={(e) =>
                  setCep(e.target.value)
                }
              />

              <input
                placeholder="Cidade"
                value={cidade}
                onChange={(e) =>
                  setCidade(e.target.value)
                }
              />

              <input
                placeholder="Estado"
                value={estado}
                onChange={(e) =>
                  setEstado(e.target.value)
                }
              />

              <textarea
                className="campo-full"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) =>
                  setDescricao(
                    e.target.value
                  )
                }
              />
            </div>
          </section>

          {/* ========================= */}
          {/* INQUILINO */}
          {/* ========================= */}
          <section className="bloco">
            <div className="bloco-header">
              <h3>Inquilino</h3>
            </div>

            {/* TABS */}
            <div className="tabs-inquilino">
              <button
                type="button"
                className={`tab-inq ${
                  modoInquilino ===
                  "existente"
                    ? "atual"
                    : ""
                }`}
                onClick={() =>
                  setModoInquilino(
                    "existente"
                  )
                }
              >
                <Users size={16} />
                Existente
              </button>

              <button
                type="button"
                className={`tab-inq ${
                  modoInquilino === "novo"
                    ? "atual"
                    : ""
                }`}
                onClick={() =>
                  setModoInquilino("novo")
                }
              >
                <UserPlus size={16} />
                Novo
              </button>
            </div>

            {/* EXISTENTE */}
            {modoInquilino ===
            "existente" ? (
              <div className="bloco-body">
                <select
                  className="inquilino-select"
                  value={
                    inquilinoSelecionado
                  }
                  onChange={(e) =>
                    setInquilinoSelecionado(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Selecione um
                    inquilino
                  </option>

                  {inquilinos.map((i) => (
                    <option
                      key={i.id}
                      value={i.id}
                    >
                      {i.name || i.nome}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              /* NOVO */
              <div className="bloco-body grid-2">
                <input
                  placeholder="Nome"
                  value={novoNome}
                  onChange={(e) =>
                    setNovoNome(
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="CPF"
                  value={novoCpf}
                  onChange={(e) =>
                    setNovoCpf(
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Email"
                  value={novoEmail}
                  onChange={(e) =>
                    setNovoEmail(
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Telefone"
                  value={novoTelefone}
                  onChange={(e) =>
                    setNovoTelefone(
                      e.target.value
                    )
                  }
                />

                <textarea
                  className="campo-full"
                  placeholder="Observações"
                  value={
                    novoObservacoes
                  }
                  onChange={(e) =>
                    setNovoObservacoes(
                      e.target.value
                    )
                  }
                />
              </div>
            )}
          </section>
        </div>
      </form>
    </Base>
  );
}