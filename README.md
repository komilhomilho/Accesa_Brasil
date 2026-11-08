# Accesa Brasil

**Accesa Brasil** é uma plataforma web desenvolvida para centralizar e facilitar o acesso a links de serviços públicos, benefícios sociais e informações essenciais para famílias e cuidadores. O sistema prioriza a acessibilidade e oferece suporte dedicado a pacientes e parceiros da AACD.

A aplicação reúne serviços oficiais do governo e das prefeituras (saúde, transporte, documentação e benefícios) em uma interface única, leve e otimizada para dispositivos móveis.

---

## Funcionalidades

- **Acesso categorizado** a serviços públicos: Documentos, Transporte, Saúde e Benefícios
- **Busca global** em todos os links armazenados (título, URL e tags)
- **Comportamento offline-first** com armazenamento local dos dados sincronizados
- **Histórico de links visitados** com data e horário de acesso
- **Ferramentas de acessibilidade**:
  - Controle de tamanho da fonte (A+ / A−)
  - Modo escuro
  - VLibras (tradutor de Libras)
- **API de sincronização** para verificação de atualizações e sincronização de dados
- **SPA em JavaScript Vanilla** (sem frameworks frontend pesados)

---

## Stack Tecnológica

| Camada     | Tecnologia                          |
|------------|-------------------------------------|
| Backend    | Node.js, Express 5, Mongoose        |
| Banco de Dados | MongoDB                         |
| Frontend   | JavaScript Vanilla (ES Modules)     |
| Interface  | Bootstrap 5, Bootstrap Icons        |
| Cliente HTTP | Axios (CDN)                       |
| Ferramentas de Desenvolvimento | Nodemon, dotenv     |

---

## Estrutura do Projeto
Accesa_Brasil/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── connectionDB.js      # Conexão com o MongoDB
│   │   ├── modules/
│   │   │   └── mobile/              # Endpoints de verificação e sincronização
│   │   │       ├── chkUpdate.controller.js
│   │   │       ├── chkUpdate.service.js
│   │   │       ├── sync.controller.js
│   │   │       ├── sync.service.js
│   │   │       ├── mobile.routes.js
│   │   │       └── wrapper.js       # Middleware de tratamento de erros
│   │   ├── shared/
│   │   │   ├── models/
│   │   │   │   └── link.model.js    # Schema de links
│   │   │   └── utils/
│   │   ├── app.js                   # Aplicação Express
│   │   └── server.js                # Ponto de entrada
│   ├── package.json
│   └── nodemon.json
│
└── frontend/
├── public/
│   └── index.html               # Shell HTML principal
└── src/
├── assets/
│   ├── css/                 # Estilos dos componentes
│   └── img/                 # Logos e ícones
├── components/
│   ├── app.js               # Roteador SPA e bootstrap da aplicação
│   ├── componentController.js
│   ├── home/
│   ├── faq/
│   ├── global_search/
│   ├── history/
│   ├── welcome/
│   ├── redirect/
│   └── specify_category/    # benefits, doc, health, transit
└── services/
├── api.js               # Instância do Axios
├── mobile.service.js    # Sincronização e verificação de atualizações
└── storage.service.js   # Abstração do localStoragetext

---

## Visão Geral da Arquitetura

### Backend
O backend expõe uma API REST minimalista focada na sincronização com o cliente:

| Método | Endpoint                      | Descrição                                              |
|--------|-------------------------------|--------------------------------------------------------|
| GET    | `/api/mobile/check-update`    | Verifica se existem dados mais recentes desde `last_sync` |
| GET    | `/api/mobile/sync-service`    | Retorna os links atualizados após o timestamp informado |

Ambos os endpoints exigem o parâmetro de consulta `last_sync` (timestamp Unix em milissegundos).

### Frontend
O frontend é uma **Single Page Application** que:

1. Carrega o shell HTML a partir de `public/index.html`
2. Injeta dinamicamente os templates e scripts dos componentes de acordo com a página atual
3. Persiste os dados de links e o histórico do usuário no `localStorage`
4. Na inicialização, verifica atualizações pela API mobile e mescla os novos registros localmente

A navegação é controlada pela função `switchPage()` e pela History API do navegador (`pushState` / `popstate`).

---

## Modelo de Dados

Coleção: `link`

| Campo         | Tipo       | Obrigatório | Descrição                              |
|---------------|------------|-------------|----------------------------------------|
| `name`        | String     | Sim         | Título de exibição do link             |
| `description` | String     | Não         | Descrição curta (opcional)             |
| `url`         | String     | Sim         | URL de destino                         |
| `tags`        | [String]   | Não         | Palavras-chave para filtro e busca     |
| `lastUpdated` | Date       | Automático  | Data da última atualização             |

**Índices**: `tags`, `lastUpdated`

---

## Instalação e Execução Local

### Pré-requisitos

- Node.js **v18** ou superior
- npm
- Instância do MongoDB em execução (local ou remota)

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/alexpietro2007/AACD_Accela.git
   cd AACD_Accela
2. **Instale as dependências do backend**
   ```bash
      cd backend
      npm install
3. **Configure as variáveis de ambiente**

   *Crie um arquivo .env dentro da pasta backend:*
   ```bash
      MONGODB_USERNAME="mongo"
      MONGODB_PASSWORD="password"
      MONGODB_URI="mongodb+srv://"
      REDIS_URL="redis://xxxxxxxxxxxxxxx:xxxx"

4. **Inicie o servidor de Desenvolvimento**
   ```bash
      npm start
      ```

   A aplicação estará disponível em http://localhost:3000.
      
   O backend serve tanto a API quanto os arquivos estáticos do frontend.

## Notas de Desenvolvimento
- O projeto utiliza ES Modules ("type": "module").
Os módulos do frontend são carregados dinamicamente por meio do import() nativo.

- Os textos da interface permanecem em português, de acordo com o público-alvo.

- Os identificadores de código (variáveis, funções, nomes de arquivos e comentários) estão padronizados em inglês.

- Os recursos de acessibilidade (ajuste de fonte, modo escuro e VLibras) estão disponíveis no menu flutuante de acessibilidade.

## Licença

Este projeto está sob a licença [MIT](LICENSE).

Copyright (c) 2026 Instituto Mauá de Tecnologia (IMT)