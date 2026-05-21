import "./Notificacao.css";
import Base from "./Base";

import { notificacoes } from "./constantes";

export default function Notificacoes() {
  return (
    <Base>
      <div className="card panel ntf-panel">
        <div className="ntf-header">
          <div>
            <h1>Notificações</h1>

            <p className="muted">
              Acompanhe atualizações importantes
            </p>
          </div>

          <button className="btn-clear">
            Marcar todas como lidas
          </button>
        </div>

        <div className="ntf-list">
          {notificacoes.map((notificacao, i) => (
            <div
              key={i}
              className="ntf-item"
            >
              <div
                className={`ntf-dot`}
              />

              <div className="ntf-content">
                <div className="ntf-top">
                  <strong>
                    {notificacao.titulo}
                  </strong>

                  <span className="ntf-date">
                    {notificacao.data.toLocaleDateString("pt-br")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}