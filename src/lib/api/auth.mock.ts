import { LoginCredentials, LoginResponse, User } from '@/types/auth'

// Mock de usuários - Simula banco de dados
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'demo@retechfin.com',
    role: 'admin',
    familyId: 'family-1',
    familyName: 'Família Silva',
    avatar: undefined,
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@retechfin.com',
    role: 'member',
    familyId: 'family-1',
    familyName: 'Família Silva',
    avatar: undefined,
  },
]

// Simula delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Serviço de autenticação MOCKADO
 * 
 * Este serviço simula chamadas de API e está preparado para ser substituído
 * facilmente por chamadas reais ao backend.
 * 
 * Para conectar com o backend real:
 * 1. Crie um novo arquivo: src/lib/api/auth.ts
 * 2. Mantenha a mesma interface de funções
 * 3. Substitua as implementações por chamadas axios/fetch
 * 4. Atualize os imports em src/store/authStore.ts
 */
export const authService = {
  /**
   * Realiza login do usuário
   * @param credentials - Email e senha
   * @returns Dados do usuário e token
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simula delay de rede
    await delay(800)

    // Validação mockada
    const user = MOCK_USERS.find((u) => u.email === credentials.email)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    // Senha mockada: qualquer senha funciona para o usuário demo
    // Em produção, isso seria validado no backend
    if (credentials.email === 'demo@retechfin.com' && credentials.password !== 'demo123') {
      throw new Error('Senha incorreta')
    }

    // Gera token mockado
    const token = `mock_token_${user.id}_${Date.now()}`

    return {
      user,
      token,
      refreshToken: `mock_refresh_${user.id}`,
    }
  },

  /**
   * Valida token e retorna dados do usuário
   * @param token - Token de autenticação
   * @returns Dados do usuário
   */
  async validateToken(token: string): Promise<User> {
    await delay(300)

    // Extrai user ID do token mockado
    const userId = token.split('_')[2]

    const user = MOCK_USERS.find((u) => u.id === userId)

    if (!user) {
      throw new Error('Token inválido')
    }

    return user
  },

  /**
   * Realiza logout
   */
  async logout(): Promise<void> {
    await delay(200)
    // Em produção, invalidaria o token no backend
  },

  /**
   * Recupera senha (mockado)
   */
  async forgotPassword(email: string): Promise<void> {
    await delay(500)

    const user = MOCK_USERS.find((u) => u.email === email)

    if (!user) {
      // Por segurança, não revela se o email existe ou não
      return
    }

    // Em produção, enviaria email de recuperação
    console.log(`[MOCK] Email de recuperação enviado para: ${email}`)
  },
}

