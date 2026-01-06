# 🔌 Sistema de Autenticação Mockado - Plug and Play

Este documento explica como o sistema de autenticação mockado funciona e como conectar com o backend real.

## 📋 Como Funciona

O sistema está configurado para usar dados mockados, mas **totalmente preparado** para ser conectado ao backend real sem mudanças na interface ou na lógica de negócio.

## 🔑 Credenciais de Demonstração

Para testar o sistema, use as seguintes credenciais:

- **Email:** `demo@retechfin.com`
- **Senha:** `demo123`

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
src/
├── lib/
│   └── api/
│       ├── auth.mock.ts    ← Serviço MOCKADO (ativo)
│       └── auth.ts          ← Serviço REAL (pronto para usar)
├── store/
│   └── authStore.ts        ← Store Zustand (usa auth.mock.ts)
└── types/
    └── auth.ts             ← Tipos TypeScript
```

### Como Trocar para Backend Real

#### Passo 1: Atualizar o Import no Store

Edite `src/store/authStore.ts`:

```typescript
// ANTES (Mockado)
import { authService } from '@/lib/api/auth.mock'

// DEPOIS (Real)
import { authService } from '@/lib/api/auth'
```

#### Passo 2: Configurar URL da API

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

#### Passo 3: Implementar Endpoints no Backend

O backend deve implementar os seguintes endpoints:

- `POST /api/auth/login` - Recebe `{ email, password }` e retorna `{ user, token, refreshToken }`
- `GET /api/auth/me` - Recebe header `Authorization: Bearer {token}` e retorna `{ user }`
- `POST /api/auth/logout` - Invalida o token
- `POST /api/auth/forgot-password` - Recebe `{ email }` e envia email de recuperação

## 📝 Interface do Serviço

O serviço de autenticação deve implementar esta interface:

```typescript
interface AuthService {
  login(credentials: LoginCredentials): Promise<LoginResponse>
  validateToken(token: string): Promise<User>
  logout(): Promise<void>
  forgotPassword(email: string): Promise<void>
}
```

## 🎯 Usuários Mockados

Atualmente, os seguintes usuários estão disponíveis:

1. **João Silva** (Admin)
   - Email: `demo@retechfin.com`
   - Senha: `demo123`
   - Role: `admin`

2. **Maria Santos** (Membro)
   - Email: `maria@retechfin.com`
   - Senha: `demo123`
   - Role: `member`

## 🔄 Fluxo de Autenticação

1. Usuário preenche email e senha
2. Formulário valida com Zod
3. `authStore.login()` chama `authService.login()`
4. Serviço retorna `{ user, token }`
5. Store salva no localStorage (via Zustand persist)
6. Usuário é redirecionado para `/dashboard`

## 💾 Persistência

O estado de autenticação é salvo automaticamente no `localStorage` usando o middleware `persist` do Zustand. Isso significa que:

- ✅ Usuário permanece logado após recarregar a página
- ✅ Token é armazenado de forma segura
- ✅ Sessão é validada automaticamente ao iniciar

## 🧪 Testando

1. Inicie o servidor: `npm run dev`
2. Acesse `http://localhost:5173`
3. Use as credenciais de demo
4. Você será redirecionado para o dashboard

## 🚀 Próximos Passos

Quando o backend estiver pronto:

1. ✅ Implemente os endpoints conforme a interface
2. ✅ Atualize o import no `authStore.ts`
3. ✅ Configure a variável `VITE_API_URL`
4. ✅ Teste a integração
5. ✅ Remova ou arquive `auth.mock.ts` (opcional)

## 📚 Documentação Adicional

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

