import { useEffect, useState } from "react";
import { startMotion } from "./motion";
import { DESTAQUES, PROJETOS } from "./data/projetos.js";

const WHATSAPP = "5517974007400";
const LIGHT_SURFACES = new Set(["clinica-estetica", "clara-mendes", "folio", "vao-estudio"]);
const SHOT_ORDER = [
  "forja-academia",
  "vao-estudio",
  "folio",
  "geekdom",
  "resenha",
  "clinica-estetica",
  "clara-mendes",
  "obsidiana",
];
const SHOTS = SHOT_ORDER.map((slug) => DESTAQUES.find((item) => item.slug === slug)).filter(Boolean);
const RADAR_BLIPS = [
  [28, 30],
  [71, 22],
  [78, 58],
  [24, 68],
  [62, 76],
  [40, 16],
];

const SERVICES = [
  {
    name: "Processos",
    text: "Aprovações, controle e tarefa que ainda passa de pessoa em pessoa. Mapeamos o fluxo e colocamos a rotina no automático.",
  },
  {
    name: "Sistemas",
    text: "Quando a planilha não segura. Um sistema do tamanho do problema — painéis, cadastros, operação no ar.",
  },
  {
    name: "Integração",
    text: "WhatsApp, ERP, planilha e o sistema de vocês falando a mesma língua. Menos copia e cola. Dado no lugar certo.",
  },
];

const SOCIAL = [
  {
    name: "WhatsApp",
    href: `https://wa.me/${WHATSAPP}`,
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/shinkatechh/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shinka-techh",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

const METHOD = [
  ["01", "Descobrir", "Onde a operação trava e o que vale automatizar primeiro."],
  ["02", "Desenhar", "O fluxo certo antes do sistema. No tamanho do problema."],
  ["03", "Construir", "Entrega curta. Você vê o sistema, não só um slide."],
  ["04", "Evoluir", "Medir o ganho, ajustar e crescer junto com a empresa."],
];

function projectHref(projeto) {
  return projeto.url || "#projetos";
}

function ShotCard({ projeto }) {
  const surface = LIGHT_SURFACES.has(projeto.slug) ? "light" : "dark";

  return (
    <a
      className={`shot shot--${surface}`}
      href={projectHref(projeto)}
      aria-label={`${projeto.titulo}, ${projeto.segmento}`}
      {...(projeto.url ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <div className="shot__board">
        <div className="shot__chrome">
          <div className="shot__bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <img src={projeto.imagem} alt="" />
        </div>
      </div>
      <div className="shot__meta">
        <span>{projeto.titulo}</span>
        <small>{projeto.segmento}</small>
      </div>
    </a>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();
    const text = `Olá, sou ${nome}.\nE-mail: ${email}\n\n${mensagem}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return <p className="lu-form__ok">Abrimos o WhatsApp com a sua mensagem.</p>;
  }

  return (
    <form className="lu-form" onSubmit={handleSubmit}>
      <label>
        <span>Nome</span>
        <input type="text" name="nome" required autoComplete="name" />
      </label>
      <label>
        <span>E-mail</span>
        <input type="email" name="email" required autoComplete="email" />
      </label>
      <label>
        <span>O problema</span>
        <textarea name="mensagem" rows="3" required />
      </label>
      <button className="lu-btn lu-btn--fill" type="submit">
        Enviar no WhatsApp
      </button>
    </form>
  );
}

const HeroMark = () => (
  <div className="lu-orb lu-hero__mark" aria-hidden="true">
    <div className="lu-radar">
      <div className="lu-radar__scope">
        <i className="lu-radar__ring" />
        <i className="lu-radar__ring" />
        <i className="lu-radar__ring" />
        <i className="lu-radar__cross" />
        <i className="lu-radar__sweep" />
        {RADAR_BLIPS.map(([x, y], index) => (
          <b
            key={`${x}-${y}`}
            className="lu-radar__blip"
            style={{ left: `${x}%`, top: `${y}%`, "--d": `${index * 1.05}s` }}
          />
        ))}
      </div>
      <p className="lu-radar__core">進</p>
    </div>
  </div>
);

export default function App() {
  useEffect(() => startMotion(), []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="progress" aria-hidden="true">
        <span className="progress__bar" />
      </div>

      <div className="loader" aria-hidden="true">
        <div className="loader__veil" />
        <div className="loader__flash" />
        <div className="loader__inner">
          <p className="loader__kanji">
            <span>進</span>
            <span>化</span>
          </p>
          <p className="loader__word">
            SHINK<span>A</span>
          </p>
          <div className="loader__row">
            <span className="loader__count">00</span>
            <span className="loader__line">
              <i />
            </span>
            <span className="loader__tag">進化</span>
          </div>
        </div>
      </div>

      <header className="nav lu-nav">
        <div className="lu-wrap lu-nav__bar">
          <a className="nav__brand" href="#topo">
            <span className="wordmark">
              SHINK<span>A</span>
            </span>
          </a>
          <nav className="lu-nav__links" aria-label="Seções">
            <a href="#projetos">Projetos</a>
            <a href="#servicos">Serviços</a>
            <a href="#metodo">Método</a>
            <a href="#contato">Contato</a>
          </nav>
          <div className="lu-nav__end">
            <a className="lu-btn lu-btn--fill" href="#contato">
              Iniciar projeto
            </a>
            <button className="nav__toggle" type="button" aria-label="Abrir menu">
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <nav className="menu" aria-hidden="true">
        <div className="menu__bg" />
        <div className="menu__inner">
          <p className="menu__label">Navegar</p>
          <ul className="menu__list">
            <li>
              <a href="#projetos" data-index="01">
                Projetos
              </a>
            </li>
            <li>
              <a href="#servicos" data-index="02">
                Serviços
              </a>
            </li>
            <li>
              <a href="#metodo" data-index="03">
                Método
              </a>
            </li>
            <li>
              <a href="#contato" data-index="04">
                Contato
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main id="topo">
        <section className="lu-hero">
          <div className="lu-wrap lu-hero__grid">
            <div className="lu-hero__copy">
              <p className="lu-kicker">Agência de automação</p>
              <h1 className="lu-hero__title">
                <span className="line">Sistemas do tamanho</span>
                <span className="line">do problema.</span>
              </h1>
              <p className="lu-hero__lead">
                Entramos na operação, recortamos o que dá para automatizar agora e construímos o sistema.
              </p>
              <div className="lu-hero__actions">
                <a className="lu-btn lu-btn--fill" href="#contato">
                  Iniciar projeto
                </a>
                <a className="lu-btn" href="#projetos">
                  Ver projetos
                </a>
              </div>
              <p className="lu-hero__meta">
                {PROJETOS.filter((item) => !item.exemplo).length} projetos no ar
                <i />
                3 frentes
                <i />
                1 conversa para começar
              </p>
            </div>
            <HeroMark />
          </div>
        </section>

        <section className="lu-work" id="projetos">
          <div className="lu-wrap">
            <div className="lu-head">
              <p className="lu-kicker">Selecionados</p>
              <h2>Trabalho no ar.</h2>
            </div>
            <ul className="lu-work__grid">
              {SHOTS.map((projeto) => (
                <li key={projeto.slug}>
                  <ShotCard projeto={projeto} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lu-services" id="servicos">
          <div className="lu-wrap">
            <div className="lu-head">
              <p className="lu-kicker">Serviços</p>
              <h2>Três frentes. Sem pacote.</h2>
            </div>
            <ul className="lu-svc">
              {SERVICES.map((item, index) => (
                <li key={item.name}>
                  <a href="#contato">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.text}</p>
                    </div>
                    <em>Conversar</em>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lu-method" id="metodo">
          <div className="lu-wrap">
            <div className="lu-head">
              <p className="lu-kicker">Método</p>
              <h2>Do problema ao sistema.</h2>
            </div>
            <ol className="lu-steps">
              {METHOD.map(([num, title, text]) => (
                <li key={num}>
                  <span>{num}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
            <p className="lu-line">A tecnologia que não evolui morre em silêncio.</p>
          </div>
        </section>

        <section className="lu-cta" id="contato">
          <div className="lu-wrap lu-cta__grid">
            <div>
              <p className="lu-kicker">Contato</p>
              <h2>Conta o que trava.</h2>
              <p className="lu-cta__lead">A gente responde com um recorte honesto e o caminho. Sem teatro.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <a
        className="lu-wa"
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp +55 17 97400-7400"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={SOCIAL[0].path} />
        </svg>
      </a>

      <footer className="lu-foot">
        <div className="lu-wrap lu-foot__row">
          <div className="lu-foot__brand">
            <p className="wordmark">
              SHINK<span>A</span>
            </p>
            <p className="lu-foot__copy">© 2026</p>
          </div>
          <div className="lu-foot__social">
            {SOCIAL.map((item) => (
              <a
                key={item.name}
                className="lu-foot__icon"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
