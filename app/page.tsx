"use client";

import { useCallback, useEffect, useState } from "react";

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
    https://drive.google.com/uc?export=view&id=ID_DA_IMAGEM
  • Preencha o texto `alt` descrevendo a foto (acessibilidade e SEO).
*/
const albums = [
  {
    title: "Presença",
    filter: "Retratos",
    category: "Retrato corporativo",
    cover: "https://images-pw.pixieset.com/elementfield/K5eA0zp/MikaLarsonPhotography_259-edit-35b94e2a-1000.jpg",
    alt: "Retrato profissional em fundo escuro",
    images: [
      "https://images-pw.pixieset.com/elementfield/K5eA0zp/MikaLarsonPhotography_259-edit-35b94e2a-1000.jpg",
      "https://images.squarespace-cdn.com/content/v1/568f7d367086d7ca717fc389/1645082214600-JG2ZMWLYZVHFFT3CPFL5/safripol%2B2020_9170.jpg",
    ],
  },
  {
    title: "Essência",
    filter: "Produtos",
    category: "Produto & gastronomia",
    cover: "https://format.creatorcdn.com/810e1661-cb2a-4632-b346-a371ecb003db/0/0/0/0%2C353%2C707%2C1060%2C760%2C760/0-0-0/1ea946d3-788f-4087-a47e-b52d6868836b/1/2/Props-1.jpg?fjkss=exp%3D2085856741~hmac%3D38774f697d63ed2d8218b4bc88768a93b853cae738133db57091672e2e66f0d5",
    alt: "Composição gastronômica escura com cerâmicas",
    images: [
      "https://format.creatorcdn.com/810e1661-cb2a-4632-b346-a371ecb003db/0/0/0/0%2C353%2C707%2C1060%2C760%2C760/0-0-0/1ea946d3-788f-4087-a47e-b52d6868836b/1/2/Props-1.jpg?fjkss=exp%3D2085856741~hmac%3D38774f697d63ed2d8218b4bc88768a93b853cae738133db57091672e2e66f0d5",
      "https://www.productionparadise.com/newsletters/2093/photos/27236/web_original/black-v1.jpg",
    ],
  },
  {
    title: "Estrutura",
    filter: "Ambientes",
    category: "Arquitetura & espaços",
    cover: "https://images.unsplash.com/photo-1683275147274-50526d63bb1d?auto=format&fit=crop&q=85&w=1600",
    alt: "Arquitetura moderna em preto e branco",
    images: [
      "https://images.unsplash.com/photo-1683275147274-50526d63bb1d?auto=format&fit=crop&q=85&w=1800",
      "https://images.unsplash.com/photo-1762008312967-beaf3f59984e?auto=format&fit=crop&q=85&w=1800",
    ],
  },
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [albumIndex, setAlbumIndex] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [portfolioFilter, setPortfolioFilter] = useState("Todos");
  const activeAlbum = albumIndex === null ? null : albums[albumIndex];
  const closeAlbum = useCallback(() => setAlbumIndex(null), []);
  const changePhoto = useCallback((direction: number) => {
    if (!activeAlbum) return;
    setPhotoIndex((current) => (current + direction + activeAlbum.images.length) % activeAlbum.images.length);
  }, [activeAlbum]);

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

  const openAlbum = (index: number) => { setAlbumIndex(index); setPhotoIndex(0); };

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
      <div className="portfolio-filters" aria-label="Filtrar portfólio">{["Todos", "Retratos", "Produtos", "Ambientes"].map(filter => <button className={portfolioFilter === filter ? "active" : ""} key={filter} onClick={() => setPortfolioFilter(filter)}>{filter}</button>)}</div>
      <div className="projects">{albums.map((album, index) => portfolioFilter === "Todos" || portfolioFilter === album.filter ? <article className="project" key={album.title}>
        <button className="image-wrap" onClick={() => openAlbum(index)} aria-label={`Abrir álbum ${album.title}`}><img src={album.cover} alt={album.alt} loading={index ? "lazy" : "eager"}/><span>Ver álbum ↗</span></button>
        <div className="project-meta"><h2>{album.title}</h2><p>{album.category}</p></div>
      </article> : null)}</div>
    </section>

    <section id="sobre" className="manifesto section-pad">
      <div className="section-label"><span>02</span><span>Nosso olhar</span></div>
      <p className="manifesto-copy">Toda marca tem uma versão que ainda <em>não foi vista.</em> Nosso trabalho é encontrá-la — e colocá-la diante das pessoas certas.</p>
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
      <div className="lightbox-stage"><button className="arrow prev" onClick={() => changePhoto(-1)} aria-label="Foto anterior">←</button><img src={activeAlbum.images[photoIndex]} alt={`${activeAlbum.alt} — foto ${photoIndex + 1}`} /><button className="arrow next" onClick={() => changePhoto(1)} aria-label="Próxima foto">→</button></div>
      <div className="lightbox-bottom"><span>{String(photoIndex + 1).padStart(2,"0")} / {String(activeAlbum.images.length).padStart(2,"0")}</span><div>{activeAlbum.images.map((_,i) => <button key={i} className={i === photoIndex ? "active" : ""} onClick={() => setPhotoIndex(i)} aria-label={`Ir para foto ${i+1}`} />)}</div></div>
    </div>}
  </main>;
}
