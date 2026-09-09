"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./about-section.module.css";

/*
  ================================================================
  COMO TROCAR OU ADICIONAR IMAGENS NOS ÁLBUNS
  ================================================================
  • Para trocar uma capa: altere `cover` no álbum desejado.
  • Para adicionar fotos: inclua novas linhas dentro de `images`.
  • Para criar um álbum: copie um objeto completo entre { ... }.
    Exemplo de um novo álbum:

    {
      title: "Nome do álbum",               // Nome exibido no site
      category: "Tipo de fotografia",       // Categoria abaixo do nome
      cover: "URL_DA_FOTO_DE_CAPA",         // Imagem que aparece na página
      alt: "Descrição objetiva da imagem",  // Texto para acessibilidade
      images: [                              // Fotos abertas dentro do álbum
        "URL_DA_FOTO_1",
        "URL_DA_FOTO_2",
        "URL_DA_FOTO_3",
      ],
    },

  • Para editar: localize o álbum pelo `title` e altere seus campos.
  • Para remover uma foto: apague somente a linha da URL em `images`.
  • Para excluir um álbum: apague seu bloco inteiro, da abertura { ao },.
  • Google Drive: deixe a foto como "Qualquer pessoa com o link".
    Pegue o ID entre /d/ e /view e monte a URL assim:
    https://drive.google.com/thumbnail?id=ID_DA_IMAGEM&sz=w2000
  • Preencha o texto `alt` descrevendo a foto (acessibilidade e SEO).
*/
const albums = [
  {
    title: "Essência",
    filter: "Posicionamento",
    category: "Retato de Posicionamento",
    cover: "https://drive.google.com/thumbnail?id=1_8D1eMt7w1ZcD93f8q6KzXBZQdhDzS4u&sz=w2000",
    coverPosition: "center 1%",
    alt: "Retrato de posicionamento",
    images: [
      "https://drive.google.com/thumbnail?id=1_8D1eMt7w1ZcD93f8q6KzXBZQdhDzS4u&sz=w2000",
      "https://drive.google.com/thumbnail?id=1uFWbmwz3y9nqeCBb9nqpdEwCn-c-ssdl&sz=w2000",
      "https://drive.google.com/thumbnail?id=1WGVXRFwM7v0m42bk5_vSg6ekpPV_w-lq&sz=w2000",
      "https://drive.google.com/thumbnail?id=1Vu1mJL_7TktNzHfe3v_xzDkcoBzEjMZy&sz=w2000",
      "https://drive.google.com/thumbnail?id=1e6l2GVqMq-Snc8TH4VJURixJCAq27Vcf&sz=w2000",
    ],
  },
  {
    title: "Comprometimento",
    filter: "Corporativo",
    category: "Retato Corporativo",
    cover: "https://drive.google.com/thumbnail?id=1VpgqhbJ-ZGAaXPtzTO1-PdfW-jIi_rV5&sz=w2000",
    alt: "Retato Corporativo",
    images: [
      "https://drive.google.com/thumbnail?id=1JpxGQrS6t8TxqdWSqxnHCAPpD2xUs0vx&sz=w2000",
      "https://drive.google.com/thumbnail?id=1lhVTDI5pXpDR-jEFtzDV0eZtYZDbA9ZU&sz=w2000",
      "https://drive.google.com/thumbnail?id=13dlIo7845tVp6om6D7NwF_YTEjHclycU&sz=w2000",
      "https://drive.google.com/thumbnail?id=1L895S5qE2tQld7A-5cbHJ1BKzGzJjqtK&sz=w2000",
    ],
  },
  {
    title: "Afeto",
    filter: "Casal",
    category: "Ensaio de Casal",
    cover: "https://drive.google.com/thumbnail?id=1o-3PYRGCL-NG-jFY1wtdg0xsIAcaPSXF&sz=w2000",
    alt: "Ensaio de Casal",
    images: [
      "https://drive.google.com/thumbnail?id=1SgRQ6FYdPA6CGdnlLAmY2jAQIFFFIv0V&sz=w2000",
      "https://drive.google.com/thumbnail?id=15p7q-tSDELZqUW76prBFxg7AZbsvIXOn&sz=w2000",
      "https://drive.google.com/thumbnail?id=1FTRZr6I9zSgkdH2Mqp3NJnF8ZqR6Z0Aj&sz=w2000",
      "https://drive.google.com/thumbnail?id=1VBiam_h3OM0FQbAaqmaZB0Zj5tT0XNQJ&sz=w2000",
      "https://drive.google.com/thumbnail?id=1Qq9-N2LihLY3M3au-1y9aFE8J0BH_mfL&sz=w2000",
    ],
  },
  {
    title: "Autenticidade",
    filter: "Criativo",
    category: "Ensaio Criativo",
    cover: "https://drive.google.com/thumbnail?id=1IcK8RvZ3B6OX_Q1-PqnMMlDLDGLWO_jn&sz=w2000",
    alt: "Ensaio Criativo",
    images: [
      "https://drive.google.com/thumbnail?id=1IcK8RvZ3B6OX_Q1-PqnMMlDLDGLWO_jn&sz=w2000",
      "https://drive.google.com/thumbnail?id=1iwViHDrnesefAnWhkd11l4cGwCQZfdNp&sz=w2000",
      "https://drive.google.com/thumbnail?id=1vsoBioyFt6G99aXUSGpz_aYAGb3Fc2VJ&sz=w2000",
      "https://drive.google.com/thumbnail?id=1be_UCtU0RZytGYkG2JqiUb4aCbpaJl5X&sz=w2000",
      "https://drive.google.com/thumbnail?id=1BuQYAP_lllzFMO0jOrSudbUF78Y3Rggi&sz=w2000",
    ],
  }
];

const services = [
  ["01", "Retratos de marca", "Imagens que traduzem postura, personalidade e confiança."],
  ["02", "Conteúdo para redes", "Ensaios planejados para alimentar sua comunicação com consistência."],
  ["03", "Produtos & ambientes", "Fotografia que evidencia detalhes, atmosfera e valor percebido."],
];

/* VALORES PROVISÓRIOS: altere nome, preço e itens diretamente nesta lista. */
const packages = [
  { name: "Essencial", price: "R$ 490", note: "Para começar com uma imagem profissional", items: ["1 hora de ensaio", "10 fotos tratadas", "1 cenário ou ambiente"] },
  { name: "Presença", price: "R$ 890", note: "Para marcas que precisam de variedade", items: ["2 horas de ensaio", "25 fotos tratadas", "Até 2 ambientes"], featured: true },
  { name: "Conteúdo", price: "R$ 1.490", note: "Para abastecer suas redes com consistência", items: ["Até 4 horas de produção", "50 fotos tratadas", "Planejamento visual"] },
];

const getPreviewSrc = (src: string) => {
  if (!src.includes("drive.google.com/thumbnail")) return src;
  return src.replace(/([?&]sz=)w\d+/i, "$1w320");
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [albumIndex, setAlbumIndex] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [portfolioFilter, setPortfolioFilter] = useState("Todos");
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [currentPhotoLoaded, setCurrentPhotoLoaded] = useState(false);
  const [previousPhotoSrc, setPreviousPhotoSrc] = useState<string | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const activeAlbum = albumIndex === null ? null : albums[albumIndex];

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimer.current !== null) {
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = null;
    }
  }, []);

  const closeAlbum = useCallback(() => {
    clearTransitionTimer();
    setAlbumIndex(null);
    setPreviousPhotoSrc(null);
    setCurrentPhotoLoaded(false);
    setIsPhotoLoading(false);
  }, [clearTransitionTimer]);

  const goToPhoto = useCallback((nextIndex: number) => {
    if (!activeAlbum || isPhotoLoading) return;

    const total = activeAlbum.images.length;
    const normalizedIndex = (nextIndex + total) % total;
    if (normalizedIndex === photoIndex) return;

    const nextSrc = activeAlbum.images[normalizedIndex];
    const currentSrc = activeAlbum.images[photoIndex];
    setIsPhotoLoading(true);

    const image = new window.Image();
    image.decoding = "async";
    image.onload = async () => {
      try {
        await image.decode();
      } catch {
        // O onload já confirma que a imagem está disponível mesmo se decode falhar.
      }
      clearTransitionTimer();
      setPreviousPhotoSrc(currentSrc);
      setCurrentPhotoLoaded(false);
      setPhotoIndex(normalizedIndex);
    };
    image.onerror = () => setIsPhotoLoading(false);
    image.src = nextSrc;
  }, [activeAlbum, clearTransitionTimer, isPhotoLoading, photoIndex]);

  const changePhoto = useCallback((direction: number) => {
    goToPhoto(photoIndex + direction);
  }, [goToPhoto, photoIndex]);

  const handleCurrentPhotoLoad = useCallback(() => {
    setCurrentPhotoLoaded(true);
    setIsPhotoLoading(false);

    if (previousPhotoSrc) {
      clearTransitionTimer();
      transitionTimer.current = window.setTimeout(() => {
        setPreviousPhotoSrc(null);
        transitionTimer.current = null;
      }, 420);
    }
  }, [clearTransitionTimer, previousPhotoSrc]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!activeAlbum) return;
      if (event.key === "Escape") closeAlbum();
      if (event.key === "ArrowRight") changePhoto(1);
      if (event.key === "ArrowLeft") changePhoto(-1);
    };
    document.body.style.overflow = activeAlbum || menuOpen ? "hidden" : "";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [activeAlbum, menuOpen, changePhoto, closeAlbum]);

  useEffect(() => {
    if (!activeAlbum) return;

    activeAlbum.images.forEach((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
    });
  }, [activeAlbum]);

  useEffect(() => () => clearTransitionTimer(), [clearTransitionTimer]);

  const openAlbum = (index: number) => {
    clearTransitionTimer();
    setAlbumIndex(index);
    setPhotoIndex(0);
    setPreviousPhotoSrc(null);
    setCurrentPhotoLoaded(false);
    setIsPhotoLoading(true);
  };

  const currentPhotoSrc = activeAlbum ? activeAlbum.images[photoIndex] : "";

  return <main>
    <header className="site-header">
      <a className="logo" href="#inicio" aria-label="CSR Fotografia — início">C<span>S</span>R</a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}><span>{menuOpen ? "FECHAR" : "MENU"}</span><i /></button>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
        {[['trabalhos','Trabalhos'],['sobre','Sobre'],['servicos','Serviços'],['valores','Valores'],['contato','Contato']].map(([id,label]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
    </header>

    <section id="inicio" className="hero">
      <h1>Não é só<br />uma <em>foto.</em></h1>
      <div className="hero-bottom"><p>É a forma como o seu negócio<br />será lembrado.</p><a className="circle-link" href="#trabalhos" aria-label="Ver trabalhos">↓</a></div>
      <div className="wine-orbit" aria-hidden="true" />
    </section>

    <section id="trabalhos" className="work section-pad compact-showcase">
      <div className="portfolio-heading"><span>Portfólio</span><h2>Trabalhos recentes</h2><p>Clique em um trabalho para visualizar todas as fotos do ensaio.</p></div>
      <div className="portfolio-filters" aria-label="Filtrar portfólio">{["Todos", "Corporativo", "Posicionamento", "Externo", "Casal", "Criativo"].map(filter => <button className={portfolioFilter === filter ? "active" : ""} key={filter} onClick={() => setPortfolioFilter(filter)}>{filter}</button>)}</div>
      <div className="projects">{albums.map((album, index) => portfolioFilter === "Todos" || portfolioFilter === album.filter ? <article className="project" key={album.title}>
        <button className="image-wrap" onClick={() => openAlbum(index)} aria-label={`Abrir álbum ${album.title}`}><img src={album.cover} alt={album.alt} loading={index ? "lazy" : "eager"} style={{ objectPosition: album.coverPosition || "center center" }}/><span>Ver álbum ↗</span></button>
        <div className="project-meta"><h2>{album.title}</h2><p>{album.category}</p></div>
      </article> : null)}</div>
    </section>

    <section id="sobre" className="manifesto section-pad">
      <div className="section-label"><span>02</span><span>Nosso olhar</span></div>
      <div className={styles.grid}>
        <p className={styles.copy}>Toda marca tem uma versão que ainda <em>não foi vista.</em> Nosso trabalho é encontrá-la — e colocá-la diante das pessoas certas.</p>
        <aside className={styles.profile} aria-label="Fotógrafo responsável">
          <div className={styles.identity}>
            <h2 className={styles.name}>Cesar Nietupski</h2>
            <p className={styles.role}>Fotógrafo responsável</p>
          </div>
          <div className={styles.photoFrame}>
            <img
              className={styles.photo}
              src="https://avatars.githubusercontent.com/u/44011116?v=4"
              alt="Cesar Nitupski, fotógrafo responsável pela CSR"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
      <div className="manifesto-foot"><p>Direção, sensibilidade e intenção em cada enquadramento.</p><span>CSR / 2026</span></div>
    </section>

    <section id="servicos" className="services section-pad"><div className="section-label"><span>03</span><span>Serviços</span></div><div className="service-list">
      {services.map(([n,t,p]) => <article key={n}><span>{n}</span><h2>{t}</h2><p>{p}</p></article>)}
    </div></section>

    <section id="valores" className="pricing section-pad">
      <div className="pricing-intro"><span>Pacotes</span><h2>Planos para diferentes<br/><em>momentos</em></h2><p>Escolha a opção que mais combina com o seu momento.</p></div>
      <div className="package-list">
        {packages.map((pack, index) => <article className={pack.featured ? "featured" : ""} key={pack.name}>
          <div className="package-title"><span>0{index + 1}</span><h3>{pack.name}</h3>{pack.featured && <b>Mais escolhido</b>}</div>
          <p>{pack.note}</p><strong>{pack.price}<small> a partir de</small></strong>
          <ul>{pack.items.map(item => <li key={item}>{item}</li>)}</ul>
          <a href={`https://wa.me/5547999999999?text=Olá%20CSR,%20tenho%20interesse%20no%20pacote%20${encodeURIComponent(pack.name)}.`} target="_blank" rel="noreferrer">Quero este pacote <span>↗</span></a>
        </article>)}
        <article className="custom-package"><div className="package-title"><span>04</span><h3>Personalizado</h3></div><p>Seu projeto pede outro formato? Montamos uma proposta sob medida para sua necessidade, prazo e volume.</p><strong>Sob consulta</strong><ul><li>Escopo personalizado</li><li>Produção flexível</li><li>Orçamento individual</li></ul><a href="https://wa.me/5547999999999?text=Olá%20CSR,%20quero%20montar%20um%20pacote%20personalizado." target="_blank" rel="noreferrer">Montar meu pacote <span>↗</span></a></article>
      </div>
      {/* TROQUE os valores na lista `packages` no início deste arquivo. O pacote personalizado está logo acima deste comentário. */}
    </section>

    <section id="contato" className="contact section-pad"><p>Tem uma ideia em mente?</p><h2>Vamos dar<br /><em>imagem</em> a ela.</h2>
      {/* TROQUE o número abaixo pelo seu WhatsApp: DDI + DDD + número, sem espaços. */}
      <a href="https://wa.me/5547999999999?text=Olá%20CSR,%20quero%20solicitar%20um%20orçamento." target="_blank" rel="noreferrer">Solicitar orçamento <span>↗</span></a>
    </section>

    <footer><a className="logo" href="#inicio">C<span>S</span>R</a><p>Fotografia estratégica<br/>Joinville, Santa Catarina</p><div><a href="#">Instagram</a><a href="#contato">WhatsApp</a></div><small>© 2026 CSR Fotografia</small></footer>

    {activeAlbum && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Álbum ${activeAlbum.title}`}>
      <div className="lightbox-top"><div><strong>{activeAlbum.title}</strong><span>{activeAlbum.category}</span></div><button onClick={closeAlbum} aria-label="Fechar álbum">Fechar ×</button></div>
      <div className="lightbox-stage">
        <button className="arrow prev" onClick={() => changePhoto(-1)} aria-label="Foto anterior" disabled={isPhotoLoading}>←</button>
        <div className={`lightbox-image-stack${isPhotoLoading ? " is-loading" : ""}`}>
          <img className="lightbox-image lightbox-image-preview" src={getPreviewSrc(currentPhotoSrc)} alt="" aria-hidden="true" />
          {previousPhotoSrc && <img className="lightbox-image lightbox-image-previous" src={previousPhotoSrc} alt="" aria-hidden="true" />}
          <img
            key={`${albumIndex}-${photoIndex}`}
            className={`lightbox-image lightbox-image-current${currentPhotoLoaded ? " is-loaded" : ""}`}
            src={currentPhotoSrc}
            alt={`${activeAlbum.alt} — foto ${photoIndex + 1}`}
            onLoad={handleCurrentPhotoLoad}
            decoding="async"
          />
          {isPhotoLoading && <div className="lightbox-loader" role="status" aria-live="polite"><i /><span>Carregando</span></div>}
        </div>
        <button className="arrow next" onClick={() => changePhoto(1)} aria-label="Próxima foto" disabled={isPhotoLoading}>→</button>
      </div>
      <div className="lightbox-bottom"><span>{String(photoIndex + 1).padStart(2,"0")} / {String(activeAlbum.images.length).padStart(2,"0")}</span><div>{activeAlbum.images.map((_,i) => <button key={i} className={i === photoIndex ? "active" : ""} onClick={() => goToPhoto(i)} disabled={isPhotoLoading} aria-label={`Ir para foto ${i+1}`} />)}</div></div>
    </div>}

    <style>{`
      .lightbox-image-stack {
        position: relative;
        min-width: 0;
        width: 100%;
        height: 78vh;
        display: grid;
        place-items: center;
        overflow: hidden;
      }

      .lightbox-stage .lightbox-image {
        grid-area: 1 / 1;
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 78vh;
        margin: auto;
        object-fit: contain;
      }

      .lightbox-image-preview {
        z-index: 1;
        opacity: .72;
        filter: blur(18px) brightness(.62);
        transform: scale(1.035);
      }

      .lightbox-image-previous {
        z-index: 2;
        opacity: 1;
      }

      .lightbox-image-current {
        z-index: 3;
        opacity: 0;
        filter: blur(5px);
        transition: opacity .38s ease, filter .38s ease, transform .38s ease;
      }

      .lightbox-image-current.is-loaded {
        opacity: 1;
        filter: blur(0);
      }

      .lightbox-image-stack.is-loading .lightbox-image-current.is-loaded {
        opacity: .88;
        filter: blur(1px) brightness(.86);
        transform: scale(.997);
      }

      .lightbox-loader {
        position: absolute;
        z-index: 5;
        left: 50%;
        bottom: 22px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 9px 13px;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 999px;
        background: rgba(4,4,4,.68);
        backdrop-filter: blur(8px);
        color: rgba(255,255,255,.82);
        font-size: .58rem;
        letter-spacing: .14em;
        text-transform: uppercase;
        pointer-events: none;
      }

      .lightbox-loader i {
        width: 12px;
        height: 12px;
        border: 1px solid rgba(255,255,255,.28);
        border-top-color: #fff;
        border-radius: 50%;
        animation: albumLoaderSpin .7s linear infinite;
      }

      .lightbox .arrow:disabled,
      .lightbox-bottom button:disabled {
        cursor: default;
        opacity: .45;
      }

      @keyframes albumLoaderSpin {
        to { transform: rotate(360deg); }
      }

      @media (max-width: 760px) {
        .lightbox-image-stack {
          height: 70vh;
        }

        .lightbox-stage .lightbox-image {
          max-height: 70vh;
        }

        .lightbox-loader {
          bottom: 74px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .lightbox-image-current {
          transition: none;
        }

        .lightbox-loader i {
          animation: none;
        }
      }
    `}</style>
  </main>;
}
