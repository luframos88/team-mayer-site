# Team Mayer · Assessoria Esportiva

Landing page estática (HTML/CSS/JS puro, sem framework) com deploy automático no GitHub Pages a cada push na branch `main`.

## Estrutura

```
index.html
assets/
  css/style.css
  js/main.js
  img/            (imagens reais, sem base64 embutido)
.github/workflows/deploy.yml   (pipeline de deploy)
```

## Rodar localmente

Não precisa de build. Basta abrir `index.html` no navegador, ou subir um servidor simples:

```
python3 -m http.server 8000
```

e acessar `http://localhost:8000`.

## Deploy

1. No repositório do GitHub: **Settings → Pages → Source → GitHub Actions**.
2. Qualquer push em `main` publica automaticamente via `.github/workflows/deploy.yml`.
3. Domínio próprio (opcional): crie um arquivo `CNAME` na raiz com o domínio (ex: `www.teammayer.com.br`) e aponte um registro `CNAME` do seu DNS para `<seu-usuario>.github.io`.

## Pendências antes de publicar

- Trocar os números de WhatsApp (`5500000000000`) pelo número real em todos os links.
- Preencher `og:url` e `og:image` no `<head>` do `index.html` quando o domínio final estiver definido.
- Substituir o e-mail de contato no rodapé, se necessário.
