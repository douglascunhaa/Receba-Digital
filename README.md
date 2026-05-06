# Recebe Digital — Protótipo (MVP)

Protótipo navegável em HTML + CSS + JavaScript puro, fiel ao design fornecido.

## Como abrir

Basta abrir o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).
Não precisa de servidor — todos os links funcionam via filesystem local.

## Estrutura de arquivos

```
projeto/
├── index.html                       Home (listagem de eventos)
├── quem-somos.html                  Página institucional "Quem somos"
├── organizadores.html               Para Organizadores
├── detalhe-evento.html              Detalhe de um evento (com countdown ao vivo)
├── login.html                       Login do Atleta
│
├── cadastro-1.html                  Cadastro etapa 1 — CPF
├── cadastro-2.html                  Cadastro etapa 2 — E-mail e senha
├── cadastro-3.html                  Cadastro etapa 3 — Termos de uso
│
├── perfil-meus-dados.html           Plataforma — Meus Dados
├── perfil-alterar-senha.html        Plataforma — Alterar Senha
├── perfil-privacidade.html          Plataforma — Privacidade
├── perfil-saude.html                Plataforma — Perfil de Saúde (vazio)
├── perfil-saude-preenchida.html     Plataforma — Perfil de Saúde (após preenchimento)
│
├── ficha-saude-1.html               Ficha — Boas-vindas
├── ficha-saude-2.html               Ficha — Guia
├── ficha-saude-3.html               Ficha — Sinais do corpo
├── ficha-saude-4.html               Ficha — Fatores de risco
├── ficha-saude-5.html               Ficha — Cuidados importantes
├── ficha-saude-6.html               Ficha — PAR-Q (avaliação final)
│
├── css/
│   ├── global.css                   Variáveis, header, footer, botões e formulários
│   ├── home.css                     Estilos da Home
│   ├── quem-somos.css               Quem Somos
│   ├── organizadores.css            Para Organizadores
│   ├── detalhe-evento.css           Detalhe do Evento
│   ├── login.css                    Login
│   ├── cadastro.css                 Cadastro (3 etapas)
│   └── plataforma.css               Plataforma do Atleta + Ficha de Saúde
│
├── js/
│   └── global.js                    Toasts, ripple effect, loading states
│
└── assets/                          Imagens, ícones e logo (todos do design original)
```

## Fluxos navegáveis (clique e veja)

**Fluxo institucional (visitante):**
Home → Quem Somos / Para Organizadores → Detalhe do Evento → Login

**Fluxo de cadastro:**
Login → Criar conta → Cadastro 1 → Cadastro 2 → Cadastro 3 → Plataforma do Atleta

**Fluxo da plataforma logada:**
Login → Meus Dados (sidebar permite navegar entre todas as seções)

**Fluxo da ficha de saúde (6 etapas):**
Perfil de Saúde → Ficha 1 → Ficha 2 → Ficha 3 → Ficha 4 → Ficha 5 → Ficha 6 → Perfil de Saúde Preenchida

## Micro-interações implementadas

- Countdown timer ao vivo no Detalhe do Evento (segundos descem de verdade)
- Animação dos números na página "Quem Somos" (contagem progressiva ao rolar)
- Progress bar de cadastro animando entre as 3 etapas
- Máscara automática de CPF
- Toggle "Sou estrangeiro" desabilita campo CPF
- Botão "Criar minha conta" desbloqueia ao aceitar termos
- Toggles de privacidade com toast informando ativação/desativação
- Botões de "Continuar" da ficha desbloqueiam ao confirmar checkbox
- Botão "Finalizar" do PAR-Q desbloqueia ao responder todas as 7 perguntas
- Loading fictício nos botões (spinner) ao submeter formulários
- Toasts de feedback no canto inferior direito
- Efeito ripple ao clicar em botões
- Hover effects e transições suaves em cards de eventos, ícones sociais, etc.

## Paleta e tipografia

- Fonte: Montserrat (Google Fonts, carregada via CDN)
- Laranja principal: `#FF6600`
- Laranja apoio (50% opacidade): botões "Voltar"
- Cyan: `#58C6C7` — botões de suporte ("Central de Suporte", "Regulamento Oficial")
- Preto cinza: `#242424` — Footer e Header
- Cinza claro: `#F4F4F4` — fundos de seções

## Observações

- Todas as ações são **fictícias**: nada é gravado, enviado ou persistido.
- Otimizado apenas para **desktop** (1280px+).
- Os ícones usam Font Awesome 6 (carregado via CDN).
- Todos os assets gráficos vieram exatamente do zip fornecido.
