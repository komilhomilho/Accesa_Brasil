# Accela 🚀

O **Accela** é uma plataforma web desenvolvida para otimizar e centralizar o acesso a links de serviços públicos, benefícios e informações essenciais para famílias e cuidadores. O sistema possui foco em acessibilidade e suporte aos pacientes e parceiros da AACD.

## 🏗️ Arquitetura do Projeto

O repositório utiliza um modelo de separação de responsabilidades, dividido em dois ecossistemas principais:

### Backend (Node.js)
Responsável por gerenciar a API, regras de negócio e a persistência de dados.
- **`/src/config`**: Estabelece os parâmetros de conexão com o banco de dados (`connectionDB.js`)[cite: 1].
- **`/src/modules/mobile`**: Controladores e serviços dedicados à verificação de atualizações e sincronização de dados com dispositivos móveis (`chkUpdate`, `sync`)[cite: 1].
- **`/src/shared/models`**: Definição dos esquemas de dados da aplicação, incluindo o gerenciamento de links úteis (`link.model.js`)[cite: 1].

### Frontend (Single Page Application)
Interface do usuário construída de forma modular, sem frameworks pesados, utilizando JavaScript Vanilla e uma estrutura própria de controle de componentes.
- **Componentes Principais**: Módulos globais estruturados em diretórios como `home`, `faq`, `global_search` e `history`[cite: 1].
- **Categorias Específicas (`specify_category`)**: Interfaces segmentadas para roteamento de serviços vitais, divididas em `benefits`, `doc`, `health` e `transit`[cite: 1].
- **Serviços (`/services`)**: Camada de comunicação responsável por requisições (`api.js`) e persistência local (`storage.service.js`)[cite: 1].

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (v18 ou superior recomendado)
- Gerenciador de pacotes (NPM)
- Instância do MongoDB configurada

### Passos para rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/alexpietro2007/AACD_Accela.git](https://github.com/alexpietro2007/AACD_Accela.git)
