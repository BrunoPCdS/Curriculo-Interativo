# Currículo interativo — Bruno Corrêa

Currículo web de **Bruno Pinto Corrêa da Silva**, estudante de Análise e
Desenvolvimento de Sistemas na UniSenac Pelotas e formado em Produção
Fonográfica pela UCPel.

O projeto reúne desenvolvimento de software e mais de dez anos de experiência
em produção audiovisual em uma página interativa, responsiva e conectada a uma
API própria.

## Funcionalidades

- Apresentação profissional, formação e experiência audiovisual.
- Seção de projetos com links diretos para os repositórios no GitHub.
- Filtro interativo de tecnologias por categoria.
- Carrossel horizontal de conteúdos.
- Vídeos TikTok executados pelo player oficial da plataforma.
- YouTube Shorts convertidos automaticamente para o formato de embed.
- Conteúdos carregados do PostgreSQL por meio da API.
- Fallback visual para a seção de canais quando a API não está disponível.
- Layout responsivo para desktop, tablet e celular.

## Tecnologias

### Front-end

- React 19
- TypeScript
- Vite
- CSS responsivo
- `fetch` para comunicação com a API

### Back-end

- Node.js
- Express
- TypeScript
- CORS
- Zod
- Prisma ORM
- PostgreSQL

## Estrutura do projeto

```text
curriculo/
├── front/
│   ├── index.html              # Entrada do Vite e metadados da página
│   ├── public/                 # Arquivos públicos
│   └── src/
│       ├── App.tsx             # Interface, dados, filtros e players
│       ├── styles.css          # Layout, tema e responsividade
│       ├── index.tsx           # Inicialização do React
│       └── vite-env.d.ts       # Tipos do Vite
├── back/
│   ├── lib/prisma.ts           # Cliente Prisma com adaptador PostgreSQL
│   ├── prisma/
│   │   ├── schema.prisma       # Modelos Video e Imagem
│   │   └── migrations/         # Histórico de migrações
│   └── src/
│       ├── server.ts           # Servidor Express
│       └── routes/
│           ├── videos.ts       # Endpoints de vídeos
│           └── imagens.ts      # Endpoints de imagens
├── docs/
│   └── guia-tecnico-curriculo-interativo.pdf
├── .gitignore
└── README.md
```

## Como executar

### Pré-requisitos

- Node.js em versão LTS;
- npm;
- PostgreSQL;
- Git.

### 1. Instalar dependências

```powershell
cd C:\Users\bruno\Senac\curriculo\front
npm install

cd ..\back
npm install
```

### 2. Configurar variáveis de ambiente

Crie `front/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Crie `back/.env` com a URL do PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@servidor:5432/banco?sslmode=require"
```

O arquivo `.env` não deve ser versionado. Use os arquivos `.env.example`
quando precisar compartilhar apenas o formato da configuração.

### 3. Preparar o banco

Na pasta `back`, aplique as migrações:

```powershell
cd C:\Users\bruno\Senac\curriculo\back
npx prisma migrate deploy
npx prisma generate
```

Para desenvolvimento e criação de uma nova migração:

```powershell
npx prisma migrate dev --name nome-da-alteracao
```

### 4. Iniciar os servidores

Abra dois terminais.

Terminal do back-end:

```powershell
cd C:\Users\bruno\Senac\curriculo\back
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

Terminal do front-end:

```powershell
cd C:\Users\bruno\Senac\curriculo\front
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente
`http://localhost:5173`.

## API

### Rotas disponíveis

| Método | Rota | Função |
| --- | --- | --- |
| GET | `/` | Verifica se a API está ativa |
| GET | `/videos` | Lista os vídeos cadastrados |
| GET | `/videos/:id` | Busca um vídeo pelo ID |
| POST | `/videos` | Cadastra um vídeo |
| DELETE | `/videos/:id` | Remove um vídeo |
| GET | `/imagens` | Lista os conteúdos da tabela de imagens |
| GET | `/imagens/:id` | Busca um conteúdo pelo ID |
| POST | `/imagens` | Cadastra um conteúdo |
| DELETE | `/imagens/:id` | Remove um conteúdo |

### Exemplo de cadastro

```powershell
Invoke-RestMethod `
  -Uri http://localhost:3000/videos `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"title":"Dica Nintendo Switch","url":"https://www.tiktok.com/@brfox.games/video/ID"}'
```

Os registros utilizam o formato:

```json
{
  "id": 1,
  "title": "Dica Nintendo Switch",
  "url": "https://www.tiktok.com/@brfox.games/video/ID",
  "createdAt": "2026-10-03T02:08:47.139Z"
}
```

## Como os vídeos funcionam

O front-end identifica a plataforma a partir da URL e limita cada canal a
treze conteúdos:

```ts
const tiktokItems = videos
  .filter((item) => getPlatform(item.url) === "TikTok")
  .slice(0, 13);
```

### TikTok

O ID numérico é extraído do trecho `/video/ID`. Depois, o sistema monta a URL
do player oficial:

```text
https://www.tiktok.com/player/v1/ID
```

Essa URL é usada em um `iframe`, permitindo que o vídeo seja reproduzido dentro
do currículo.

### YouTube

Para URLs como:

```text
https://www.youtube.com/shorts/bM_ov7qLVxM?t=9
```

o front-end extrai o ID e converte para:

```text
https://www.youtube.com/embed/bM_ov7qLVxM?start=9
```

O tempo inicial (`t`) é preservado como `start`.

### Carrossel

Os cards são mantidos em uma única linha com CSS:

```css
.media-rail {
  display: flex;
  overflow-x: auto;
}

.media-card {
  flex: 0 0 245px;
}
```

Assim, o usuário pode rolar horizontalmente pelos vídeos sem aumentar
excessivamente a altura da página. Em telas menores, a largura dos cards é
reduzida por media query.

## Projetos apresentados

- [Bidbits](https://github.com/BrunoPCdS/bidbits)
- [MeuAuto](https://github.com/BrunoPCdS/MeuAuto)
- [API com tabelas relacionadas e transações](https://github.com/BrunoPCdS/API-com-tabelas-relacionadas-e-transacoes)
- [Gerenciamento de veículos](https://github.com/BrunoPCdS/Projeto-de-Gerenciamento-de-Ve-culos)
- [Incidentes de Segurança](https://github.com/BrunoPCdS/Incidentes-de-Seguranca-da-Informac-o-no-Brasil-2010-a-2019-)
- [Jogo Caça ao Pato em GRID](https://github.com/BrunoPCdS/Jogo-Ca-a-ao-Pato-em-GRID)
- [Dexter App](https://github.com/lucasrochaexe/Projeto-de-Desenvolvimento-1)

## Canais

- [TikTok — @brfox.games](https://www.tiktok.com/@brfox.games)
- [YouTube — BrunoCorreaS](https://www.youtube.com/@BrunoCorreaS)

## Documento técnico

O guia detalhado, com explicação do código, API, banco, embeds e carrossel,
está disponível em
[docs/guia-tecnico-curriculo-interativo.pdf](docs/guia-tecnico-curriculo-interativo.pdf).

## Validação

Executar na pasta `front`:

```powershell
npm exec tsc -- --noEmit
npm exec vite build
```

Os dois comandos validam a tipagem TypeScript e o build de produção.

## Publicação

Antes de publicar no GitHub, verifique:

```powershell
git status
git diff -- .gitignore README.md
```

Arquivos `.env`, `node_modules`, builds, ambientes Python locais e arquivos
gerados do Prisma estão protegidos pelo `.gitignore`. As migrações do Prisma e
o PDF em `docs/` podem ser versionados normalmente.
