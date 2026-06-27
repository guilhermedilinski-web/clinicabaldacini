# Clínica Baldacini — Site

Site institucional da **Dra. Iara Baldacini** (Ginecologia · CRM-SP 83.291 · RQE 62140).
Site estático (HTML, CSS e JavaScript), sem necessidade de servidor ou build.

## Estrutura

```
index.html              → conteúdo de todas as seções
assets/css/styles.css   → estilos e paleta (magenta → roxo da logo)
assets/js/main.js       → WhatsApp, menu, indicador de progresso
assets/img/             → logo e fotos
```

## Como visualizar

Abra o arquivo `index.html` no navegador (duplo clique). Pronto.

## Como editar o essencial

### Número do WhatsApp
Em `assets/js/main.js`, no topo:
```js
const WHATSAPP = {
  numero: "5511940121589",   // DDI + DDD + número, só dígitos
  mensagem: "Olá! Gostaria de agendar uma consulta com a Dra. Iara Baldacini."
};
```
Esse número é aplicado automaticamente em todos os botões de WhatsApp do site.

### Fotos da equipe (parceiros)
Na seção **Equipe** (`index.html`), cada parceiro é um bloco `<article class="member">`.
1. Coloque a foto em `assets/img/` (ex.: `equipe-1.jpg`).
2. Troque `src="assets/img/logo.png"` pela foto e remova a classe `placeholder`.
3. Atualize nome, especialidade/CRM e descrição.
4. Se houver site, ajuste o link `Visitar site`; se não, apague essa linha.
   Duplique um bloco `<article>` para adicionar mais profissionais.

### Fotos do espaço
Na seção **Conheça o nosso espaço**, troque cada bloco por:
```html
<figure class="gphoto reveal"><img src="assets/img/espaco-1.jpg" alt="Recepção" /></figure>
```

### Contato
Endereço, telefones, e-mail e Instagram estão na seção **Localização** e no rodapé do `index.html`.

## Como publicar (grátis)

Qualquer uma destas opções hospeda o site sem custo:

- **Netlify**: acesse app.netlify.com → "Add new site" → "Deploy manually" → arraste a pasta do projeto.
- **Vercel**: importe o repositório do GitHub em vercel.com (framework: "Other").
- **GitHub Pages**: suba o repositório no GitHub → Settings → Pages → branch `main` (raiz).

Depois é possível apontar um domínio próprio (ex.: clinicabaldacini.com.br) nas configurações da hospedagem.
