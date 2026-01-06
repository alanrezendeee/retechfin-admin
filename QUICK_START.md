# 🚀 Quick Start - ReTechFin Admin

## Instalação Rápida

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🔑 Login de Demonstração

- **Email:** `demo@retechfin.com`
- **Senha:** `demo123`

## 📁 Estrutura Criada

```
src/
├── components/
│   └── auth/
│       └── LoginIllustration.tsx
├── lib/
│   ├── api/
│   │   ├── auth.mock.ts    ← Autenticação mockada
│   │   └── auth.ts         ← Pronto para backend real
│   └── theme.ts            ← Tema MUI
├── pages/
│   ├── LoginPage.tsx       ← Tela de login
│   └── DashboardPage.tsx   ← Dashboard (básico)
├── store/
│   └── authStore.ts        ← Estado de autenticação
├── types/
│   └── auth.ts             ← Tipos TypeScript
├── App.tsx                 ← Rotas principais
└── main.tsx               ← Entry point
```

## 🎨 Características da Tela de Login

- ✅ Layout split-screen (dividido ao meio)
- ✅ Gradiente azul/rosa/roxo no lado esquerdo
- ✅ Formulário completo com validação
- ✅ Toggle de visibilidade de senha
- ✅ Links de ajuda e recuperação de senha
- ✅ Design responsivo
- ✅ Autenticação mockada (plug and play)

## 🔌 Conectar com Backend Real

Veja o arquivo `MOCK_AUTH.md` para instruções detalhadas.

Resumidamente:
1. Edite `src/store/authStore.ts`
2. Troque `auth.mock.ts` por `auth.ts`
3. Configure `VITE_API_URL` no `.env`

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview da build
- `npm run type-check` - Verificar tipos TypeScript
- `npm run lint` - Executar linter
- `npm run format` - Formatar código

