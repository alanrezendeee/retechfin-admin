# ReTechFin Admin

Sistema de gestão financeira familiar desenvolvido com React e Vite. Uma solução moderna, intuitiva e eficiente para gerenciar as finanças pessoais e familiares.

## 🚀 Tecnologias

Este projeto utiliza as melhores tecnologias do mercado para desenvolvimento front-end:

- **[React 18](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces
- **[Vite](https://vitejs.dev/)** - Build tool rápida e moderna
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[MUI (Material-UI)](https://mui.com/)** - Biblioteca de componentes React com Material Design
- **[Emotion](https://emotion.sh/)** - Biblioteca CSS-in-JS (usada pelo MUI)
- **[React Query (TanStack Query)](https://tanstack.com/query/latest)** - Gerenciamento de estado do servidor e cache
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado global leve e simples
- **[React Hook Form](https://react-hook-form.com/)** - Formulários performáticos com validação
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[React Router](https://reactrouter.com/)** - Roteamento declarativo para React
- **[Axios](https://axios-http.com/)** - Cliente HTTP baseado em Promises
- **[MUI Icons](https://mui.com/material-ui/material-icons/)** - Biblioteca de ícones Material Design
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos para React
- **[date-fns](https://date-fns.org/)** - Utilitários para manipulação de datas

## 📋 Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd retechfin-admin
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

## 🚀 Como executar

### Desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para produção
```bash
npm run build
# ou
yarn build
# ou
pnpm build
```

### Preview da build de produção
```bash
npm run preview
# ou
yarn preview
# ou
pnpm preview
```

### Docker (Produção)
```bash
# Build e executar com Docker Compose
docker-compose up --build

# A aplicação estará disponível em http://localhost:3000
```

Para mais detalhes sobre Docker, consulte [DOCKER.md](./DOCKER.md)

## 📁 Estrutura do Projeto

```
retechfin-admin/
├── public/                 # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens, fontes, etc.
│   ├── components/        # Componentes reutilizáveis
│   │   ├── ui/           # Componentes de UI base
│   │   └── ...
│   ├── features/          # Features organizadas por domínio
│   │   ├── transactions/  # Módulo de transações
│   │   ├── categories/   # Módulo de categorias
│   │   ├── dashboard/    # Módulo de dashboard
│   │   └── ...
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilitários e configurações
│   │   ├── api/          # Configuração do cliente API
│   │   ├── utils/        # Funções utilitárias
│   │   └── ...
│   ├── pages/            # Páginas/rotas
│   ├── store/            # Estado global (Zustand)
│   ├── types/            # Tipos TypeScript
│   ├── App.tsx           # Componente raiz
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # Tipos do Vite
├── .env.example          # Exemplo de variáveis de ambiente
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── theme.ts              # Configuração do tema MUI
├── vite.config.ts
└── README.md
```

## ✨ Funcionalidades Principais

### 📊 Dashboard
- Visão geral das finanças
- Gráficos e estatísticas
- Resumo de receitas e despesas
- Balanço mensal

### 💰 Transações
- Cadastro de receitas e despesas
- Categorização de transações
- Filtros e buscas avançadas
- Histórico completo

### 📁 Categorias
- Gerenciamento de categorias
- Personalização de cores e ícones
- Organização hierárquica

### 👥 Gestão Familiar
- Múltiplos usuários por família
- Controle de permissões
- Compartilhamento de informações

### 📈 Relatórios
- Relatórios mensais e anuais
- Exportação de dados
- Análises de gastos

## 🎨 Padrões de Código

### Componentes
- Componentes funcionais com TypeScript
- Uso de custom hooks para lógica reutilizável
- Separação de responsabilidades

### Estado
- **Zustand**: Estado global da aplicação
- **React Query**: Estado do servidor e cache
- **React Hook Form**: Estado de formulários

### Estilização
- MUI (Material-UI) para componentes base
- Emotion para estilização customizada
- Sistema de temas personalizável
- Design system consistente e responsivo

### Validação
- Zod para validação de schemas
- React Hook Form para validação de formulários

## 🧪 Testes

```bash
npm run test
# ou
yarn test
# ou
pnpm test
```

## 📝 Scripts Disponíveis

- `dev` - Inicia o servidor de desenvolvimento
- `build` - Cria a build de produção
- `preview` - Preview da build de produção
- `lint` - Executa o linter
- `type-check` - Verifica tipos TypeScript
- `format` - Formata o código com Prettier

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

ReTech - Soluções em Tecnologia

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2026
