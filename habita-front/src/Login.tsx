import { useState, type FormEvent} from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navegador = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Preencha e-mail e senha.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    alert(`Login simulado para ${email}`);
  };

  return (
    <div className="page">
        <div className="logo-container">
            <div className="logo_habita">H</div>
            <span className="titulo">Habita</span>
        </div>
      <div className="form-side">
        <div className="form-wrap">
          <div className="brand brand-mobile">
          </div>

          <h2>Entrar na sua conta</h2>
          <p className="muted">
            Não tem conta? <a href="#">Criar conta</a>
          </p>

          <form onSubmit={onSubmit} className="form">
            <label className="field">
              <span>E-mail</span>
              <div className="input">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="field">
              <span>Senha</span>
              <div className="input">
                <Lock size={18} />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="row">
              <label className="check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Lembrar de mim</span>
              </label>
              <a href="#" className="link">
                Esqueci minha senha
              </a>
            </div>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="btn-primary" disabled={loading} onClick={() => navegador('/dashboard')}>
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <div className="divider"><span>ou</span></div>

            <button type="button" className="btn-google">
              <GoogleIcon />
              Entrar com Google
            </button>
          </form>

          <p className="footer-note">
            Ao continuar, você concorda com os <a href="#">Termos</a> e a{" "}
            <a href="#">Política de Privacidade</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.6-3.4-11.3-8l-6.6 5.1C9.6 39.7 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C41.6 35.6 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}
