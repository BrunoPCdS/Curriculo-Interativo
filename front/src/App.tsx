import { useEffect, useMemo, useState } from "react";
import "./styles.css";

type MediaItem = {
    id: number;
    title: string;
    url: string;
};

type Project = {
    title: string;
    description: string;
    tags: string[];
    accent: string;
    url: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const technologies = [
    { name: "Python", group: "Linguagens" },
    { name: "JavaScript", group: "Linguagens" },
    { name: "TypeScript", group: "Linguagens" },
    { name: "SQL", group: "Linguagens" },
    { name: "React", group: "Front-end" },
    { name: "Vite", group: "Front-end" },
    { name: "React Router", group: "Front-end" },
    { name: "React Hook Form", group: "Front-end" },
    { name: "Tailwind CSS", group: "Front-end" },
    { name: "Expo React Native", group: "Mobile" },
    { name: "Node.js", group: "Back-end" },
    { name: "Express", group: "Back-end" },
    { name: "Flask", group: "Back-end" },
    { name: "APIs REST", group: "Back-end" },
    { name: "JWT", group: "Back-end" },
    { name: "PostgreSQL", group: "Banco de dados" },
    { name: "MySQL / MariaDB", group: "Banco de dados" },
    { name: "Prisma ORM", group: "Banco de dados" },
    { name: "Zod", group: "Ferramentas" },
    { name: "Jest", group: "Qualidade" },
    { name: "Pandas", group: "Dados" },
    { name: "Plotly", group: "Dados" },
    { name: "Git & GitHub", group: "DevOps" },
    { name: "Docker", group: "DevOps" },
];

const projects: Project[] = [
    {
        title: "Bidbits",
        description: "Aplicação full stack com autenticação, API documentada e dados relacionais.",
        tags: ["React", "TypeScript", "Prisma", "PostgreSQL"],
        accent: "violet",
        url: "https://github.com/BrunoPCdS/bidbits",
    },
    {
        title: "MeuAuto",
        description: "Interface para gerenciamento de veículos com navegação fluida e persistência local.",
        tags: ["React", "Vite", "JavaScript", "JSON Server"],
        accent: "cyan",
        url: "https://github.com/BrunoPCdS/MeuAuto",
    },
    {
        title: "API relacional",
        description: "API com transações, autorização, envio de e-mails e tabelas relacionadas.",
        tags: ["Node.js", "Express", "MySQL", "JWT"],
        accent: "orange",
        url: "https://github.com/BrunoPCdS/API-com-tabelas-relacionadas-e-transacoes",
    },
    {
        title: "Gerenciamento de veículos",
        description: "Dados transformados em informações visuais para apoiar decisões.",
        tags: ["Python", "Flask", "Pandas", "Plotly"],
        accent: "green",
        url: "https://github.com/BrunoPCdS/Projeto-de-Gerenciamento-de-Ve-culos",
    },
    {
        title: "Incidentes de segurança",
        description: "Análise exploratória e visualização de dados de incidentes.",
        tags: ["Python", "CSV", "Pandas", "Plotly Express"],
        accent: "pink",
        url: "https://github.com/BrunoPCdS/Incidentes-de-Seguranca-da-Informac-o-no-Brasil-2010-a-2019-",
    },
    {
        title: "Jogo Caça ao Pato",
        description: "Jogo de terminal com lógica de grid, aleatoriedade e feedback visual.",
        tags: ["Python", "Colorama", "Random", "Time"],
        accent: "yellow",
        url: "https://github.com/BrunoPCdS/Jogo-Ca-a-ao-Pato-em-GRID",
    },
    {
        title: "Dexter App",
        description: "Aplicativo voltado para gestores, desenvolvido para apoiar organização e acompanhamento de atividades.",
        tags: ["Aplicativo", "Gestão", "React Native"],
        accent: "blue",
        url: "https://github.com/lucasrochaexe/Projeto-de-Desenvolvimento-1",
    },
];

const fallbackVideos: MediaItem[] = [
    { id: 1, title: "TikTok • games & curiosidades", url: "https://www.tiktok.com/@brfox.games" },
    { id: 2, title: "TikTok • conteúdo em destaque", url: "https://www.tiktok.com/@brfox.games" },
    { id: 3, title: "TikTok • bastidores", url: "https://www.tiktok.com/@brfox.games" },
];

const fallbackImages: MediaItem[] = [
    { id: 1, title: "YouTube • músicas e produção", url: "https://www.youtube.com/@BrunoCorreaS" },
    { id: 2, title: "YouTube • produção audiovisual", url: "https://www.youtube.com/@BrunoCorreaS" },
];

function getPlatform(url: string) {
    return url.toLowerCase().includes("tiktok") ? "TikTok" : "YouTube";
}

function getTikTokEmbedUrl(url: string) {
    const videoId = url.match(/\/video\/(\d+)/)?.[1];
    return videoId ? `https://www.tiktok.com/player/v1/${videoId}?description=1&music_info=1` : null;
}

function getYouTubeEmbedUrl(url: string) {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)?.[1] ?? parsedUrl.searchParams.get("v");
    if (!videoId) return null;

    const start = parsedUrl.searchParams.get("t")?.replace(/\D/g, "");
    return `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ""}`;
}

function App() {
    const [activeGroup, setActiveGroup] = useState("Todos");
    const [videos, setVideos] = useState<MediaItem[]>(fallbackVideos);
    const [images, setImages] = useState<MediaItem[]>(fallbackImages);
    const groups = ["Todos", ...new Set(technologies.map((technology) => technology.group))];

    useEffect(() => {
        const loadMedia = async () => {
            try {
                const [videosResponse, imagesResponse] = await Promise.all([
                    fetch(`${API_URL}/videos`),
                    fetch(`${API_URL}/imagens`),
                ]);
                if (videosResponse.ok) setVideos(await videosResponse.json());
                if (imagesResponse.ok) setImages(await imagesResponse.json());
            } catch {
                // O conteúdo de exemplo mantém a experiência útil sem o back-end ligado.
            }
        };
        void loadMedia();
    }, []);

    const filteredTechnologies = useMemo(
        () => technologies.filter((technology) => activeGroup === "Todos" || technology.group === activeGroup),
        [activeGroup],
    );
    const tiktokItems = videos.filter((item) => getPlatform(item.url) === "TikTok").slice(0, 13);
    const youtubeItems = [...images, ...videos.filter((item) => getPlatform(item.url) === "YouTube")].slice(0, 13);

    return (
        <div className="site-shell">
            <header className="topbar">
                <a className="brand" href="#inicio" aria-label="Voltar ao início">
                    <span className="brand-mark">B</span>
                    <span>Bruno <b>Corrêa</b></span>
                </a>
                <nav className="desktop-nav" aria-label="Navegação principal">
                    <a href="#sobre">Sobre</a>
                    <a href="#experiencia">Experiência</a>
                    <a href="#projetos">Projetos</a>
                    <a href="#tecnologias">Tecnologias</a>
                    <a href="#canais">Canais</a>
                </nav>
                <a className="nav-cta" href="#contato">Vamos conversar <span>↗</span></a>
            </header>

            <main>
                <section className="hero section-grid" id="inicio">
                    <div className="hero-copy">
                        <p className="eyebrow"><span className="status-dot" /> Disponível para oportunidades</p>
                        <h1>Ideias que ganham <em>forma</em><br />e chegam mais longe.</h1>
                        <p className="hero-lead">Olá, eu sou <strong>Bruno Pinto Corrêa da Silva</strong>. Desenvolvedor em formação, produtor audiovisual e criador de experiências digitais.</p>
                        <div className="hero-actions">
                            <a className="button button-primary" href="#projetos">Conheça meu trabalho <span>↗</span></a>
                            <a className="button button-ghost" href="#sobre">Mais sobre mim <span>↓</span></a>
                        </div>
                    </div>
                    <div className="hero-art" aria-label="Ilustração abstrata">
                        <div className="orb orb-one" />
                        <div className="orb orb-two" />
                        <div className="art-card card-top">/dev <span>+</span></div>
                        <div className="art-card card-bottom">audio <span>~</span></div>
                        <div className="circle-label">BRUNO<br /><b>CRIA</b></div>
                    </div>
                </section>

                <section className="intro-band" id="sobre">
                    <div className="section-grid intro-content">
                        <div>
                            <p className="eyebrow accent-text">01 — Sobre mim</p>
                            <h2>Entre o código<br />e a <em>criatividade.</em></h2>
                        </div>
                        <div className="intro-text">
                            <p>Estudante de <strong>Análise e Desenvolvimento de Sistemas</strong> na UniSenac Pelotas e formado em Produção Fonográfica pela UCPel.</p>
                            <p>Minha trajetória une mais de 10 anos de produção audiovisual com o desenvolvimento de soluções digitais. Gosto de transformar problemas complexos em experiências claras, funcionais e com personalidade.</p>
                            <div className="stats">
                                <div><strong>10+</strong><span>anos no audiovisual</span></div>
                                <div><strong>7</strong><span>projetos demonstrados</span></div>
                                <div><strong>2</strong><span>áreas que se conectam</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content-section" id="experiencia">
                    <div className="section-heading"><div><p className="eyebrow accent-text">02 — Experiência</p><h2>Uma carreira em <em>movimento.</em></h2></div><span className="section-number">/ 03</span></div>
                    <div className="timeline">
                        <article className="timeline-item"><span className="timeline-year">+10 anos</span><div><h3>Produção audiovisual</h3><p>Experiência em produção de áudio, vídeo, pós-produção, correções, mixagem e masterização para rádio e televisão.</p></div></article>
                        <article className="timeline-item"><span className="timeline-year">UCPel</span><div><h3>Orientação em laboratórios</h3><p>Orientação de estudantes nos laboratórios da Universidade Católica de Pelotas, apoiando o aprendizado prático e o uso de equipamentos.</p></div></article>
                        <article className="timeline-item"><span className="timeline-year">Terrasul</span><div><h3>Câmera e produtor de áudio</h3><p>Atuação pelo programa Terrasul, da Embrapa Clima Temperado, conectando captação de imagem e som na produção de conteúdo.</p></div></article>
                        <article className="timeline-item"><span className="timeline-year">Startstudio</span><div><h3>Produtor de áudio</h3><p>Pós-produção, correções, mixagem e masterização de materiais para rádio e TV.</p></div></article>
                    </div>
                </section>

                <section className="content-section projects-section" id="projetos">
                    <div className="section-heading"><div><p className="eyebrow accent-text">03 — Projetos</p><h2>Construindo para<br /><em>aprender.</em></h2></div><p className="heading-note">Cada projeto é uma oportunidade<br />de transformar teoria em prática.</p></div>
                    <div className="project-grid">{projects.map((project, index) => <a className={`project-card accent-${project.accent}`} href={project.url} target="_blank" rel="noreferrer" key={project.title}><div className="project-top"><span>0{index + 1}</span><span className="arrow">↗</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></a>)}</div>
                </section>

                <section className="skills-section" id="tecnologias">
                    <div className="content-section"><div className="section-heading"><div><p className="eyebrow accent-text">04 — Toolbox</p><h2>Ferramentas para<br /><em>tirar do papel.</em></h2></div></div>
                        <div className="filter-row" role="tablist" aria-label="Filtrar tecnologias">{groups.map((group) => <button className={activeGroup === group ? "active" : ""} onClick={() => setActiveGroup(group)} key={group}>{group}</button>)}</div>
                        <div className="technology-cloud">{filteredTechnologies.map((technology) => <span className="technology-pill" key={technology.name}><i />{technology.name}</span>)}</div>
                    </div>
                </section>

                <section className="content-section channels-section" id="canais">
                    <div className="section-heading"><div><p className="eyebrow accent-text">05 — Canais</p><h2>Conteúdo que também<br /><em>faz parte da jornada.</em></h2></div><p className="heading-note">Acompanhe meus experimentos,<br />games e produções.</p></div>
                    <MediaRail title="TikTok" subtitle="games & curiosidades" items={tiktokItems} channelUrl="https://www.tiktok.com/@brfox.games" />
                    <MediaRail title="YouTube" subtitle="músicas & produção" items={youtubeItems} channelUrl="https://www.youtube.com/@BrunoCorreaS" />
                </section>
            </main>

            <footer id="contato">
                <div><p className="eyebrow accent-text">Vamos criar algo?</p><h2>Seu próximo projeto<br /><em>pode começar aqui.</em></h2></div>
                <div className="footer-contact"><a href="https://www.tiktok.com/@brfox.games" target="_blank" rel="noreferrer">TikTok — @brfox.games <span>↗</span></a>
                <a href="mailto:productbdc@gmail.com" target="_blank" rel="noreferrer">E-mail - productbdc@gmail.com <span>↗</span></a>
                <a href="https://www.youtube.com/@BrunoCorreaS" target="_blank" rel="noreferrer">YouTube — BrunoCorreaS <span>↗</span></a><span className="contact-note">Aberto a conexões e novos projetos.</span></div>
                <div className="footer-bottom"><span>© 2026 Bruno Corrêa</span><span>Pelotas, RS — Brasil</span><a href="#inicio">Voltar ao topo ↑</a>
                </div>
            </footer>
        </div>
    );
}

function MediaRail({ title, subtitle, items, channelUrl }: { title: string; subtitle: string; items: MediaItem[]; channelUrl: string }) {
    return <div className="media-block"><div className="media-heading"><div><h3>{title} <small>{subtitle}</small></h3></div><a href={channelUrl} target="_blank" rel="noreferrer">Ver canal ↗</a></div><div className="media-rail">{items.map((item) => <MediaCard item={item} key={`${item.id}-${item.title}`} />)}</div></div>;
}

function MediaCard({ item }: { item: MediaItem }) {
    const platform = getPlatform(item.url);
    const youtubeUrl = platform === "YouTube" ? getYouTubeEmbedUrl(item.url) : null;
    const tikTokUrl = platform === "TikTok" ? getTikTokEmbedUrl(item.url) : null;

    return <article className={`media-card media-embed-card ${platform.toLowerCase()}`}>
        <div className="embed-frame">
            {youtubeUrl && <iframe src={youtubeUrl} title={item.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
            {tikTokUrl && <iframe src={tikTokUrl} title={item.title} loading="lazy" allow="autoplay; encrypted-media" allowFullScreen />}
            {!youtubeUrl && !tikTokUrl && <a className="embed-fallback" href={item.url} target="_blank" rel="noreferrer">Abrir vídeo ↗</a>}
        </div>
        <div className="media-caption"><span>{platform}</span><strong>{item.title}</strong></div>
    </article>;
}

export default App;
