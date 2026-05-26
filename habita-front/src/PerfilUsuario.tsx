// @ts-nocheck
import "./PerfilUsuario.css";
import { useUser } from "./UserInfo";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ArrowLeft,
  Camera,
  Mail,
  Phone,
  Calendar,
  Shield,
  CreditCard,
  LogOut,
  Pencil,
  Save,
  X,
  Users,
} from "lucide-react";

import Base from "./Base";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  descricao: string;
  avatarUrl?: string;
  plano: "Free" | "Premium" | "Pro";
  cadastroData: string;
};

const API_URL = "http://localhost:8000/user";
const USER_ID = 1;

function mapPlano(plan: number): "Free" | "Premium" | "Pro" {
  switch (plan) {
    case 1:
      return "Free";
    case 2:
      return "Premium";
    case 3:
      return "Pro";
    default:
      return "Free";
  }
}

export default function PerfilUsuario() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const [editando, setEditando] = useState(false);

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [rascunho, setRascunho] = useState<Usuario | null>(null);

  const [ownersCount, setOwnersCount] = useState(0);

  // =========================
  // GET USER
  // =========================
  async function carregarUsuario() {
    try {
      setLoading(true);
      setErro("");

      const [resUser, resOwners] = await Promise.all([
        axios.get(`${API_URL}/${USER_ID}`),
        axios.get(`http://localhost:8000/owner`),
      ]);

      const u = Array.isArray(resUser.data)
        ? resUser.data[0]
        : resUser.data;

      const formatado: Usuario = {
        id: u.id,
        nome: u.name || "",
        email: u.email || "",
        telefone: u.phone || "",
        descricao: u.description || "",
        avatarUrl: "",
        plano: mapPlano(u.plan),
        cadastroData: u.signup_date || "Não informado",
      };

      setUsuario({ ...formatado });
      setRascunho({ ...formatado });

      setUser({
        id: formatado.id,
        nome: formatado.nome,
        email: formatado.email,
        plano: formatado.plano,
      });

      const owners = Array.isArray(resOwners.data) ? resOwners.data : [];
      setOwnersCount(owners.length);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar perfil.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  // =========================
  // EDITAR
  // =========================
  function handleEditar() {
    if (!usuario) return;

    setRascunho({ ...usuario });
    setEditando(true);
  }

  function handleCancelar() {
    if (!usuario) return;

    setRascunho({ ...usuario });
    setEditando(false);
  }

  // =========================
  // SALVAR
  // =========================
  async function handleSalvar() {
    if (!usuario || !rascunho) return;

    try {
      setSalvando(true);
      setErro("");

      const body = {
        name: rascunho.nome,
        email: rascunho.email,
        phone: rascunho.telefone,
        description: rascunho.descricao,
        plan:
          rascunho.plano === "Free"
            ? 1
            : rascunho.plano === "Premium"
            ? 2
            : 3,
        signup_date: rascunho.cadastroData,
      };

      const res = await axios.put(`${API_URL}/${usuario.id}`, body);

      const u = Array.isArray(res.data) ? res.data[0] : res.data;

      const atualizado: Usuario = {
        id: u.id,
        nome: u.name,
        email: u.email,
        telefone: u.phone,
        descricao: u.description,
        avatarUrl: "",
        plano: mapPlano(u.plan),
        cadastroData: u.signup_date,
      };

      setUsuario({ ...atualizado });
      setRascunho({ ...atualizado });
      setEditando(false);
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <Base>
        <div className="perfil-loading">
          <h2>Carregando perfil...</h2>
        </div>
      </Base>
    );
  }

  if (!usuario || !rascunho) {
    return (
      <Base>
        <div className="perfil-loading">
          <h2>Usuário não encontrado.</h2>
        </div>
      </Base>
    );
  }

  const dados = editando ? rascunho : usuario;

  return (
    <Base>
      <section className="perfil-panel">

        {/* HEADER */}
        <div className="perfil-head">
          <button className="btn-ghost" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </button>

          <div>
            <h2>Meu Perfil</h2>
            <p>Gerencie suas informações pessoais</p>
          </div>

          <div className="perfil-actions">
            {!editando ? (
              <button className="btn-ghost" onClick={handleEditar}>
                <Pencil size={16} /> Editar
              </button>
            ) : (
              <>
                <button className="btn-ghost" onClick={handleCancelar}>
                  <X size={16} /> Cancelar
                </button>

                <button
                  className="btn-ghost"
                  onClick={handleSalvar}
                  disabled={salvando}
                >
                  <Save size={16} />
                  {salvando ? "Salvando..." : "Salvar"}
                </button>
              </>
            )}
          </div>
        </div>

        {erro && <div className="perfil-erro">{erro}</div>}

        <div className="perfil-grid">

          {/* SIDEBAR */}
          <aside className="perfil-card">

            <div className="avatar-wrap">
              <div className="avatar-circle">
                {dados.avatarUrl ? (
                  <img src={dados.avatarUrl} />
                ) : (
                  <span>
                    {dados.nome
                      ?.split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
              </div>

              {editando && (
                <button className="avatar-edit">
                  <Camera size={16} />
                </button>
              )}
            </div>

            <h3 className="perfil-nome">{dados.nome}</h3>
            <p className="perfil-email">{dados.email}</p>

            <span className={`badge badge-${dados.plano?.toLowerCase()}`}>
              <Shield size={12} /> Plano {dados.plano}
            </span>

            <ul className="perfil-info-lista">
              <li>
                <Calendar size={14} />
                <span>{dados.cadastroData}</span>
              </li>
            </ul>

            <div className="perfil-stat">
              <Users size={13} />
              <strong>{ownersCount}</strong>
              <span>Inquilinos</span>
            </div>

            <button className="btn-logout" onClick={handleLogout}>
              <LogOut size={16} /> Sair
            </button>

          </aside>

          {/* CONTEÚDO */}
          <div className="perfil-conteudo">

            <div className="bloco">
              <h3>Informações pessoais</h3>

              <div className="grid-2">

                <div className="campo">
                  <label>Nome</label>
                  <input
                    value={dados.nome}
                    readOnly={!editando}
                    onChange={(e) =>
                      setRascunho((p) =>
                        p ? { ...p, nome: e.target.value } : p
                      )
                    }
                  />
                </div>

                <div className="campo">
                  <label>Email</label>
                  <input
                    value={dados.email}
                    readOnly={!editando}
                    onChange={(e) =>
                      setRascunho((p) =>
                        p ? { ...p, email: e.target.value } : p
                      )
                    }
                  />
                </div>

                <div className="campo">
                  <label>Telefone</label>
                  <input
                    value={dados.telefone}
                    readOnly={!editando}
                    onChange={(e) =>
                      setRascunho((p) =>
                        p ? { ...p, telefone: e.target.value } : p
                      )
                    }
                  />
                </div>

              </div>

              <div className="campo">
                <label>Descrição</label>
                <textarea
                  rows={4}
                  value={dados.descricao}
                  readOnly={!editando}
                  onChange={(e) =>
                    setRascunho((p) =>
                      p ? { ...p, descricao: e.target.value } : p
                    )
                  }
                />
              </div>
            </div>

          </div>
        </div>

        {/* 🔥 BLOCO PLANO (FORA DO GRID, CORRETO) */}
        <div className="bloco">
          <h3>Plano</h3>

          <div className="plano-box">
            <div>
              <strong>{dados.plano}</strong>
              <p>Renovação automática em 15/06/2026</p>
            </div>

            <button className="btn-ghost">
              <CreditCard size={16} />
              Gerenciar plano
            </button>
          </div>
        </div>

        {/* 🔥 SEGURANÇA */}
        <div className="bloco">
          <h3>Segurança</h3>

          <div className="acoes-seg">
            <button className="btn-ghost">
              Alterar senha
            </button>
          </div>
        </div>

      </section>
    </Base>
  );
}