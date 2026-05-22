// @ts-nocheck
import "./PerfilUsuario.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CreditCard,
  LogOut,
  Pencil,
  Save,
  X,
  Home,
  Users,
  DollarSign,
} from "lucide-react";

import Base from "./Base";

type Usuario = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  dataNascimento: string;
  bio: string;
  avatarUrl?: string;
  plano: "Free" | "Premium" | "Pro";
  cadastroData: string;
};

const usuarioInicial: Usuario = {
  nome: "Silvia Mendes",
  email: "silvia.mendes@habita.com",
  telefone: "(11) 98765-4321",
  cpf: "123.456.789-77",
  endereco: "Rua das Flores, 123 - São Paulo, SP",
  dataNascimento: "1985-04-12",
  bio: "Proprietária de imóveis há mais de 10 anos. Apaixonada por gestão e organização.",
  plano: "Premium",
  cadastroData: "Janeiro de 2022",
};

export default function PerfilUsuario() {
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [usuario, setUsuario] = useState<Usuario>(usuarioInicial);
  const [rascunho, setRascunho] = useState<Usuario>(usuarioInicial);

  const handleEditar = () => {
    setRascunho(usuario);
    setEditando(true);
  };

  const handleCancelar = () => {
    setRascunho(usuario);
    setEditando(false);
  };

  const handleSalvar = () => {
    setUsuario(rascunho);
    setEditando(false);
    console.log("Perfil atualizado:", rascunho);
  };

  const handleLogout = () => {
    console.log("Logout realizado");
    navigate("/login");
  };

  const dados = editando ? rascunho : usuario;

  return (
    <Base>
      <section className="perfil-panel">
        <div className="perfil-head">
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2>Meu Perfil</h2>
            <p>Gerencie suas informações pessoais e preferências</p>
          </div>

          <div className="perfil-actions">
            {!editando ? (
              <button type="button" className="btn-primary" onClick={handleEditar}>
                <Pencil size={16} /> Editar perfil
              </button>
            ) : (
              <>
                <button type="button" className="btn-ghost" onClick={handleCancelar}>
                  <X size={16} /> Cancelar
                </button>
                <button type="button" className="btn-primary" onClick={handleSalvar}>
                  <Save size={16} /> Salvar
                </button>
              </>
            )}
          </div>
        </div>

        <div className="perfil-grid">
          {/* Cartão lateral */}
          <aside className="perfil-card">
            <div className="avatar-wrap">
              <div className="avatar-circle">
                {dados.avatarUrl ? (
                  <img src={dados.avatarUrl} alt={dados.nome} />
                ) : (
                  <span>
                    {dados.nome
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
              </div>
              {editando && (
                <button type="button" className="avatar-edit" aria-label="Trocar foto">
                  <Camera size={16} />
                </button>
              )}
            </div>

            <h3 className="perfil-nome">{dados.nome}</h3>
            <p className="perfil-email">{dados.email}</p>

            <span className={`badge badge-${dados.plano.toLowerCase()}`}>
              <Shield size={12} /> Plano {dados.plano}
            </span>

            <ul className="perfil-info-lista">
              <li>
                <Calendar size={14} />
                <span>Cadastro realizado em {dados.membroDesde}</span>
              </li>
              <li>
                <MapPin size={14} />
                <span>{dados.endereco}</span>
              </li>
            </ul>

            <div className="perfil-stats">
              <div className="stat">
                <Home size={13} />
                12
                <span>-Imóveis</span>
              </div>
              <div className="stat">
                <Users size={13} />
                9
                <span>-Inquilinos</span>
              </div>
            </div>

            <button type="button" className="btn-logout" onClick={handleLogout}>
              <LogOut size={16} /> Sair da conta
            </button>
          </aside>

          {/* Conteúdo */}
          <div className="perfil-conteudo">
            <div className="bloco">
              <h3>Informações pessoais</h3>

              <div className="grid-2">
                <div className="campo">
                  <label>Nome completo</label>
                  <input
                    type="text"
                    value={dados.nome}
                    readOnly={!editando}
                    onChange={(e) => setRascunho({ ...rascunho, nome: e.target.value })}
                  />
                </div>

                <div className="campo">
                  <label>CPF</label>
                  <input
                    type="text"
                    value={dados.cpf}
                    readOnly={!editando}
                    onChange={(e) => setRascunho({ ...rascunho, cpf: e.target.value })}
                  />
                </div>

                <div className="campo">
                  <label>
                    <Mail size={12} /> E-mail
                  </label>
                  <input
                    type="email"
                    value={dados.email}
                    readOnly={!editando}
                    onChange={(e) => setRascunho({ ...rascunho, email: e.target.value })}
                  />
                </div>

                <div className="campo">
                  <label>
                    <Phone size={12} /> Telefone
                  </label>
                  <input
                    type="tel"
                    value={dados.telefone}
                    readOnly={!editando}
                    onChange={(e) => setRascunho({ ...rascunho, telefone: e.target.value })}
                  />
                </div>
              </div>

              <div className="campo">
                <label>Descrição</label>
                <textarea
                  rows={3}
                  value={dados.bio}
                  readOnly={!editando}
                  onChange={(e) => setRascunho({ ...rascunho, bio: e.target.value })}
                />
              </div>
            </div>

            <div className="bloco">
              <h3>Plano e assinatura</h3>
              <div className="plano-box">
                <div>
                  <strong>Plano {usuario.plano}</strong>
                  <p>Renovação automática em 15/06/2026</p>
                </div>
                <button type="button" className="btn-ghost">
                  <CreditCard size={16} /> Gerenciar plano
                </button>
              </div>
            </div>

            <div className="bloco">
              <h3>Segurança</h3>
              <div className="acoes-seg">
                <button type="button" className="btn-ghost">
                  Alterar senha
                </button>
                <button type="button" className="btn-ghost">
                  Ativar verificação em duas etapas
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
