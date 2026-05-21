// @ts-nocheck
import "./Configuracoes.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Moon,
  Sun,
  Globe,
  Lock,
  Eye,
  Shield,
  Trash2,
  Download,
  CreditCard,
  HelpCircle,
  Save,
} from "lucide-react";

import Base from "./Base";

type Configuracoes = {
  // Notificações
  notifEmail: boolean;
  notifPush: boolean;
  notifSms: boolean;
  notifPagamentos: boolean;
  notifContratos: boolean;
  notifMarketing: boolean;

  // Aparência
  tema: "claro" | "escuro" | "sistema";
  idioma: "pt-BR" | "en-US" | "es-ES";
  moeda: "BRL" | "USD" | "EUR";

  // Privacidade
  perfilPublico: boolean;
  mostrarEmail: boolean;
  doisFatores: boolean;
};

const configIniciais: Configuracoes = {
  notifEmail: true,
  notifPush: true,
  notifSms: false,
  notifPagamentos: true,
  notifContratos: true,
  notifMarketing: false,
  tema: "claro",
  idioma: "pt-BR",
  moeda: "BRL",
  perfilPublico: false,
  mostrarEmail: false,
  doisFatores: false,
};

export default function Configuracoes() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<Configuracoes>(configIniciais);

  const toggle = (chave: keyof Configuracoes) => {
    setConfig((c) => ({ ...c, [chave]: !c[chave] }));
  };

  const handleSalvar = () => {
    console.log("Configurações salvas:", config);
  };

  const handleExcluirConta = () => {
    if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      console.log("Conta excluída");
    }
  };

  return (
    <Base>
      <section className="config-panel">
        <div className="config-head">
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2>Configurações</h2>
            <p>Personalize sua experiência no Habita</p>
          </div>

          <div className="config-actions">
            <button type="button" className="btn-primary" onClick={handleSalvar}>
              <Save size={16} /> Salvar alterações
            </button>
          </div>
        </div>

        <div className="config-grid">
          {/* Menu lateral */}
          <aside className="config-menu">
            <a href="#notificacoes" className="menu-item">
              <Bell size={16} /> Notificações
            </a>
            <a href="#aparencia" className="menu-item">
              <Sun size={16} /> Aparência
            </a>
            <a href="#privacidade" className="menu-item">
              <Lock size={16} /> Privacidade
            </a>
            <a href="#assinatura" className="menu-item">
              <CreditCard size={16} /> Assinatura
            </a>
            <a href="#ajuda" className="menu-item">
              <HelpCircle size={16} /> Ajuda
            </a>
          </aside>

          {/* Conteúdo */}
          <div className="config-conteudo">
            {/* Notificações */}
            <div id="notificacoes" className="bloco">
              <h3>
                <Bell size={16} /> Notificações
              </h3>
              <p className="sub">Escolha como e quando deseja ser avisado</p>

              <div className="lista-opcoes">
                <div className="opcao">
                  <div className="opcao-info">
                    <Mail size={16} />
                    <div>
                      <strong>Notificações por e-mail</strong>
                      <span>Receba atualizações importantes no seu e-mail</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={config.notifEmail}
                      onChange={() => toggle("notifEmail")}
                    />
                    <span className="slider-toggle" />
                  </label>
                </div>

                <div className="opcao">
                  <div className="opcao-info">
                    <Smartphone size={16} />
                    <div>
                      <strong>Notificações push</strong>
                      <span>Alertas no seu navegador ou celular</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={config.notifPush}
                      onChange={() => toggle("notifPush")}
                    />
                    <span className="slider-toggle" />
                  </label>
                </div>

                <div className="opcao">
                  <div className="opcao-info">
                    <MessageSquare size={16} />
                    <div>
                      <strong>SMS</strong>
                      <span>Mensagens de texto para avisos urgentes</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={config.notifSms}
                      onChange={() => toggle("notifSms")}
                    />
                    <span className="slider-toggle" />
                  </label>
                </div>

                <div className="divisor" />

                <div className="opcao">
                  <div className="opcao-info">
                    <div>
                      <strong>Pagamentos e vencimentos</strong>
                      <span>Avisos sobre aluguéis recebidos e contas a vencer</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={config.notifPagamentos}
                      onChange={() => toggle("notifPagamentos")}
                    />
                    <span className="slider-toggle" />
                  </label>
                </div>

                <div className="opcao">
                  <div className="opcao-info">
                    <div>
                      <strong>Contratos</strong>
                      <span>Renovações, encerramentos e novos contratos</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={config.notifContratos}
                      onChange={() => toggle("notifContratos")}
                    />
                    <span className="slider-toggle" />
                  </label>
                </div>

                <div className="opcao">
                  <div className="opcao-info">
                    <div>
                      <strong>Novidades e promoções</strong>
                      <span>Receba dicas, novidades e ofertas especiais</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={config.notifMarketing}
                      onChange={() => toggle("notifMarketing")}
                    />
                    <span className="slider-toggle" />
                  </label>
                </div>
              </div>
            </div>

            {/* Aparência */}
            <div id="aparencia" className="bloco">
              <h3>
                <Sun size={16} /> Aparência e idioma
              </h3>
              <p className="sub">Personalize a aparência do sistema</p>

              <div className="grid-2">
                <div className="campo">
                  <label>Tema</label>
                  <div className="tema-opcoes">
                    <button
                      type="button"
                      className={`tema-btn ${config.tema === "claro" ? "ativo" : ""}`}
                      onClick={() => setConfig({ ...config, tema: "claro" })}
                    >
                      <Sun size={16} /> Claro
                    </button>
                    <button
                      type="button"
                      className={`tema-btn ${config.tema === "escuro" ? "ativo" : ""}`}
                      onClick={() => setConfig({ ...config, tema: "escuro" })}
                    >
                      <Moon size={16} /> Escuro
                    </button>
                    <button
                      type="button"
                      className={`tema-btn ${config.tema === "sistema" ? "ativo" : ""}`}
                      onClick={() => setConfig({ ...config, tema: "sistema" })}
                    >
                      <Globe size={16} /> Sistema
                    </button>
                  </div>
                </div>

                <div className="campo">
                  <label>Idioma</label>
                  <select
                    value={config.idioma}
                    onChange={(e) =>
                      setConfig({ ...config, idioma: e.target.value as Configuracoes["idioma"] })
                    }
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>

                <div className="campo">
                  <label>Moeda</label>
                  <select
                    value={config.moeda}
                    onChange={(e) =>
                      setConfig({ ...config, moeda: e.target.value as Configuracoes["moeda"] })
                    }
                  >
                    <option value="BRL">Real (R$)</option>
                    <option value="USD">Dólar (US$)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacidade */}
            <div id="privacidade" className="bloco">
              <h3>
                <Lock size={16} /> Privacidade e segurança
              </h3>
              <p className="sub">Controle como suas informações são exibidas</p>

              <div className="lista-opcoes">
                <div className="opcao">
                  <div className="opcao-info">
                    <Eye size={16} />
                    <div>
                      <strong>Perfil público</strong>
                      <span>Permitir que outros usuários encontrem seu perfil</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={config.perfilPublico}
                      onChange={() => toggle("perfilPublico")}
                    />
                    <span className="slider-toggle" />
                  </label>
                </div>

                <div className="opcao">
                  <div className="opcao-info">
                    <Mail size={16} />
                    <div>
                      <strong>Mostrar e-mail no perfil</strong>
                      <span>Exibir seu e-mail para inquilinos cadastrados</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={config.mostrarEmail}
                      onChange={() => toggle("mostrarEmail")}
                    />
                    <span className="slider-toggle" />
                  </label>
                </div>

                <div className="opcao">
                  <div className="opcao-info">
                    <Shield size={16} />
                    <div>
                      <strong>Verificação em duas etapas</strong>
                      <span>Adicione uma camada extra de segurança ao login</span>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={config.doisFatores}
                      onChange={() => toggle("doisFatores")}
                    />
                    <span className="slider-toggle" />
                  </label>
                </div>

                <div className="divisor" />

                <button type="button" className="btn-ghost">
                  Alterar senha
                </button>
              </div>
            </div>

            {/* Assinatura */}
            <div id="assinatura" className="bloco">
              <h3>
                <CreditCard size={16} /> Assinatura
              </h3>
              <p className="sub">Gerencie seu plano e forma de pagamento</p>

              <div className="plano-atual">
                <div className="plano-info">
                  <span className="plano-badge">Plano Premium</span>
                  <strong>R$ 49,90 / mês</strong>
                  <span className="plano-sub">
                    Próxima cobrança em 15/06/2026
                  </span>
                </div>
                <div className="plano-acoes">
                  <button type="button" className="btn-ghost">
                    Alterar plano
                  </button>
                  <button type="button" className="btn-danger">
                    Cancelar assinatura
                  </button>
                </div>
              </div>

              <div className="divisor" />

              <div className="lista-opcoes">
                <div className="opcao">
                  <div className="opcao-info">
                    <CreditCard size={16} />
                    <div>
                      <strong>Forma de pagamento</strong>
                      <span>Mastercard •••• 4321 — venc. 09/28</span>
                    </div>
                  </div>
                  <button type="button" className="btn-ghost">
                    Atualizar
                  </button>
                </div>

                <div className="opcao">
                  <div className="opcao-info">
                    <Download size={16} />
                    <div>
                      <strong>Histórico de faturas</strong>
                      <span>Veja e baixe suas faturas anteriores</span>
                    </div>
                  </div>
                  <button type="button" className="btn-ghost">
                    Ver faturas
                  </button>
                </div>
              </div>
            </div>

            {/* Ajuda */}
            <div id="ajuda" className="bloco">
              <h3>
                <HelpCircle size={16} /> Ajuda e suporte
              </h3>
              <p className="sub">Tire suas dúvidas e fale com a gente</p>

              <div className="lista-opcoes">
                <a className="opcao opcao-link" href="#">
                  <div className="opcao-info">
                    <HelpCircle size={16} />
                    <div>
                      <strong>Central de ajuda</strong>
                      <span>Artigos e tutoriais sobre o Habita</span>
                    </div>
                  </div>
                  <span className="opcao-seta">›</span>
                </a>

                <a className="opcao opcao-link" href="mailto:suporte@habita.com">
                  <div className="opcao-info">
                    <Mail size={16} />
                    <div>
                      <strong>Falar com o suporte</strong>
                      <span>suporte@habita.com — respondemos em até 24h</span>
                    </div>
                  </div>
                  <span className="opcao-seta">›</span>
                </a>

                <a className="opcao opcao-link" href="#">
                  <div className="opcao-info">
                    <MessageSquare size={16} />
                    <div>
                      <strong>Chat ao vivo</strong>
                      <span>Seg a Sex, das 9h às 18h</span>
                    </div>
                  </div>
                  <span className="opcao-seta">›</span>
                </a>

                <div className="divisor" />

                <a className="opcao opcao-link" href="#">
                  <div className="opcao-info">
                    <Shield size={16} />
                    <div>
                      <strong>Termos de uso e privacidade</strong>
                      <span>Leia nossas políticas</span>
                    </div>
                  </div>
                  <span className="opcao-seta">›</span>
                </a>
              </div>

              <div className="versao-app">
                Habita v1.0.0
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
