// @ts-nocheck
import "./AdicionarImovel.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, UserPlus, Users } from "lucide-react";

import Base from "./Base";
import { inquilinos, type Inquilino } from "./constantes";

type Pagamento = {
  tipo: string;
  valor: string;
  diaVencimento: string;
};

type ModoInquilino = "existente" | "novo";

export default function AdicionarImovel() {
  const navigate = useNavigate();

  // Dados do imóvel
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [descricao, setDescricao] = useState("");

  // Contrato
  const [inicioContrato, setInicioContrato] = useState("");
  const [fimContrato, setFimContrato] = useState("");
  const [valorContrato, setValorContrato] = useState("");
  const [diaPagamento, setDiaPagamento] = useState("");
  const [observacoesContrato, setObservacoesContrato] = useState("");

  // Pagamentos
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([
    { tipo: "Aluguel", valor: "", diaVencimento: "" },
  ]);

  const addPagamento = () =>
    setPagamentos([...pagamentos, { tipo: "", valor: "", diaVencimento: "" }]);

  const removePagamento = (i: number) =>
    setPagamentos(pagamentos.filter((_, idx) => idx !== i));

  const updatePagamento = (i: number, campo: keyof Pagamento, val: string) =>
    setPagamentos(
      pagamentos.map((p, idx) => (idx === i ? { ...p, [campo]: val } : p)),
    );

  // Inquilino
  const [modoInquilino, setModoInquilino] = useState<ModoInquilino>("existente");
  const [inquilinoSelecionado, setInquilinoSelecionado] = useState<string>("");

  const [novoNome, setNovoNome] = useState("");
  const [novoCpf, setNovoCpf] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [novoObservacoes, setNovoObservacoes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você integra com sua API / estado global
    console.log({
      imovel: { logradouro, complemento, descricao },
      contrato: {
        inicioContrato,
        fimContrato,
        valorContrato,
        diaPagamento,
        observacoesContrato,
      },
      pagamentos,
      inquilino:
        modoInquilino === "existente"
          ? { tipo: "existente", id: inquilinoSelecionado }
          : {
              tipo: "novo",
              nome: novoNome,
              cpf: novoCpf,
              email: novoEmail,
              telefone: novoTelefone,
              observacoes: novoObservacoes,
            },
    });
    navigate("/imoveis");
  };

  return (
    <Base>
      <form className="card add-panel" onSubmit={handleSubmit}>
        <div className="add-head">
          <div>
            <button
              type="button"
              className="btn-voltar"
              onClick={() => navigate(-1)}
            >
              ← Voltar
            </button>
          </div>
          <div className="add-title-wrap">
            <h2 className="add-title">Adicionar imóvel</h2>
            <p className="add-sub">
              Preencha os dados do imóvel e vincule um inquilino
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
            <button type="submit" className="btn-primario">
              Salvar imóvel
            </button>
          </div>
        </div>

        <div className="add-scroll">
          {/* IMÓVEL */}
          <section className="bloco">
            <div className="bloco-header">
              <h3>Dados do imóvel</h3>
            </div>
            <div className="bloco-body grid-2">
              <div className="campo">
                <label>Logradouro</label>
                <input
                  type="text"
                  placeholder="Ex: Av. Central, 890"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  required/>
              </div>
              <div className="campo">
                <label>Complemento</label>
                <input
                  type="text"
                  placeholder="Ex: Apt 45"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>
              <div className="campo campo-full">
                <label>Descrição</label>
                <textarea
                  rows={3}
                  placeholder="Detalhes sobre o imóvel..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* CONTRATO */}
          <section className="bloco">
            <div className="bloco-header">
              <h3>Informações do contrato</h3>
            </div>
            <div className="bloco-body grid-2">
              <div className="campo">
                <label>Início do contrato</label>
                <input
                  type="date"
                  value={inicioContrato}
                  onChange={(e) => setInicioContrato(e.target.value)}
                />
              </div>
              <div className="campo">
                <label>Fim do contrato</label>
                <input
                  type="date"
                  value={fimContrato}
                  onChange={(e) => setFimContrato(e.target.value)}
                />
              </div>
              <div className="campo">
                <label>Valor do contrato (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={valorContrato}
                  onChange={(e) => setValorContrato(e.target.value)}
                />
              </div>
              <div className="campo">
                <label>Dia do pagamento</label>
                <input
                  type="number"
                  min={1}
                  max={31}
                  placeholder="Ex: 10"
                  value={diaPagamento}
                  onChange={(e) => setDiaPagamento(e.target.value)}
                />
              </div>
              <div className="campo campo-full">
                <label>Observações do contrato</label>
                <textarea
                  rows={2}
                  placeholder="Cláusulas, garantias, etc."
                  value={observacoesContrato}
                  onChange={(e) => setObservacoesContrato(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* PAGAMENTOS */}
          <section className="bloco">
            <div className="bloco-header">
              <h3>Pagamentos</h3>
              <button
                type="button"
                className="btn-add"
                onClick={addPagamento}
              >
                <Plus size={14} /> Adicionar
              </button>
            </div>
            <div className="bloco-body">
              <div className="pagamentos-lista">
                {pagamentos.map((p, i) => (
                  <div key={i} className="pagamento-row">
                    <div className="campo">
                      <label>Tipo</label>
                      <input
                        type="text"
                        placeholder="Aluguel, luz, água..."
                        value={p.tipo}
                        onChange={(e) =>
                          updatePagamento(i, "tipo", e.target.value)
                        }
                      />
                    </div>
                    <div className="campo">
                      <label>Valor (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={p.valor}
                        onChange={(e) =>
                          updatePagamento(i, "valor", e.target.value)
                        }
                      />
                    </div>
                    <div className="campo">
                      <label>Dia venc.</label>
                      <input
                        type="number"
                        min={1}
                        max={31}
                        placeholder="Ex: 10"
                        value={p.diaVencimento}
                        onChange={(e) =>
                          updatePagamento(i, "diaVencimento", e.target.value)
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removePagamento(i)}
                      aria-label="Remover pagamento"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {pagamentos.length === 0 && (
                  <p className="vazio">Nenhum pagamento adicionado.</p>
                )}
              </div>
            </div>
          </section>

          {/* INQUILINO */}
          <section className="bloco">
            <div className="bloco-header">
              <h3>Inquilino</h3>
            </div>
            <div className="bloco-body">
              <div className="tabs-inquilino">
                <button
                  type="button"
                  className={`tab-inq ${modoInquilino === "existente" ? "atual" : ""}`}
                  onClick={() => setModoInquilino("existente")}
                >
                  <Users size={16} /> Existente
                </button>
                <button
                  type="button"
                  className={`tab-inq ${modoInquilino === "novo" ? "atual" : ""}`}
                  onClick={() => setModoInquilino("novo")}
                >
                  <UserPlus size={16} /> Cadastrar novo
                </button>
              </div>

              {modoInquilino === "existente" ? (
                <div className="grid-2 mt-16">
                  <div className="campo campo-full">
                    <label>Selecione um inquilino</label>
                    <select
                      value={inquilinoSelecionado}
                      onChange={(e) => setInquilinoSelecionado(e.target.value)}
                    >
                      <option value="">— Escolher inquilino —</option>
                      {(inquilinos as Inquilino[]).map((inq) => (
                        <option key={inq.id} value={inq.id}>
                          {inq.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid-2 mt-16">
                  <div className="campo">
                    <label>Nome</label>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                    />
                  </div>
                  <div className="campo">
                    <label>CPF</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      value={novoCpf}
                      onChange={(e) => setNovoCpf(e.target.value)}
                    />
                  </div>
                  <div className="campo">
                    <label>E-mail</label>
                    <input
                      type="email"
                      placeholder="email@exemplo.com"
                      value={novoEmail}
                      onChange={(e) => setNovoEmail(e.target.value)}
                    />
                  </div>
                  <div className="campo">
                    <label>Telefone</label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={novoTelefone}
                      onChange={(e) => setNovoTelefone(e.target.value)}
                    />
                  </div>
                  <div className="campo campo-full">
                    <label>Observações</label>
                    <textarea
                      rows={3}
                      placeholder="Anotações sobre o inquilino..."
                      value={novoObservacoes}
                      onChange={(e) => setNovoObservacoes(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </form>
    </Base>
  );
}
