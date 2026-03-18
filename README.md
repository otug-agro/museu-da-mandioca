# Museu da Mandioca — Site Oficial

Site institucional de página única do Museu da Mandioca.
Hospedado via **GitHub Pages** (gratuito, sem servidor necessário).

---

## Estrutura do repositório

```
museu-da-mandioca/
│
├── index.html                  ← página principal (tudo aqui)
│
├── assets/
│   ├── images/
│   │   ├── logo.png            ← logotipo do museu
│   │   ├── hero/
│   │   │   ├── hero-desktop.jpg   ← imagem de fallback se não usar vídeo
│   │   │   └── hero-mobile.jpg
│   │   ├── blog/
│   │   │   ├── post-mandioca-culinaria.jpg
│   │   │   ├── post-exposicao.jpg
│   │   │   └── post-educacao.jpg
│   │   └── partners/
│   │       ├── governo-para.svg
│   │       ├── ufpa.svg
│   │       ├── sebrae.svg
│   │       └── ... (logos em SVG sempre que possível)
│   └── videos/
│       └── hero-loop.mp4       ← opcional: vídeo local em vez de YouTube
│
└── README.md                   ← este arquivo
```

---

## Como publicar no GitHub Pages (passo a passo)

1. Crie um repositório no GitHub com o nome `museu-da-mandioca`
2. Suba todos os arquivos para a branch `main`
3. Vá em **Settings → Pages**
4. Em *Source*, selecione **Deploy from a branch → main → / (root)**
5. Clique em **Save**
6. Em alguns minutos o site estará disponível em:
   `https://SEU-USUARIO.github.io/museu-da-mandioca/`

Para domínio próprio (ex: `museudemandioca.com.br`):
- Vá em Settings → Pages → Custom domain
- Aponte o DNS do seu domínio para o GitHub Pages

---

## Como editar o conteúdo

| O que mudar | Onde no `index.html` |
|---|---|
| Vídeo do hero | `src` do `<iframe>` dentro de `.yt-wrap` |
| Imagens do blog | `src` dos `.post-card .thumb` |
| Logos dos parceiros | `<span class="partner-logo">` (ou troque por `<img>`) |
| Endereço no mapa | `src` do `<iframe>` dentro de `.map-wrap` |
| Número do WhatsApp | `href` do `.btn-wpp` — formato: `wa.me/55DDDNUMERO` |
| E-mail de contato | `href` do `.btn-email` e no footer |
| Textos das publicações | `.post-card h3` e `.post-card p` |
| Horários de funcionamento | `.info-row span` na seção #agende |

---

## Como configurar o formulário

**Opção 1 — Netlify (recomendado se hospedar no Netlify)**
- Faça deploy pelo Netlify em vez do GitHub Pages
- Remova o `onsubmit="handleSubmit(event)"` e o `e.preventDefault()` do JS
- Os envios chegam no painel em app.netlify.com → Forms

**Opção 2 — Formspree (funciona com GitHub Pages)**
1. Crie uma conta em https://formspree.io
2. Crie um novo formulário e copie o ID gerado
3. No `<form>`, altere:
   ```html
   action="https://formspree.io/f/SEU_ID_AQUI"
   ```
4. Remova o `onsubmit="handleSubmit(event)"` do `<form>`
5. Remova a função `handleSubmit` do `<script>`

---

## Tecnologias utilizadas

- HTML5 + CSS3 puro (sem frameworks)
- Google Fonts: Libre Baskerville + Lora
- Google Maps Embed (gratuito, sem chave de API)
- YouTube Embed para o vídeo hero
- Formulário via Netlify Forms ou Formspree

Nenhuma dependência de npm, bundler ou build step.
Abra `index.html` direto no navegador para ver localmente.
