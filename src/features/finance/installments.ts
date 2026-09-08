import { reaisToCents, type EntryInstallmentInput } from './api'

/** Linha do editor: strings de formulário, convertidas só no submit. */
export type InstallmentRow = {
  due_date: string // YYYY-MM-DD
  amount: string // reais pt-BR ("1.234,56")
  paid: boolean
  paid_at: string // YYYY-MM-DD
  paid_amount: string // reais pt-BR
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function centsToReais(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/**
 * Soma meses a uma data ISO preservando o dia e clampando no fim do mês
 * (31/jan + 1 = 28/fev, não 03/mar) — mesma regra do backend.
 */
export function addMonthsClamped(iso: string, months: number): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  if (!y || !m || !d) return iso
  const total = m - 1 + months
  const year = y + Math.floor(total / 12)
  const month = ((total % 12) + 12) % 12 // 0-11
  const lastDay = new Date(year, month + 1, 0).getDate()
  return `${year}-${pad(month + 1)}-${pad(Math.min(d, lastDay))}`
}

export function todayISO(): string {
  const t = new Date()
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`
}

/** Gera N linhas mensais a partir da primeira parcela, todas previstas. */
export function buildInstallmentRows(firstDue: string, count: number, amountCents: number): InstallmentRow[] {
  const amount = amountCents > 0 ? centsToReais(amountCents) : ''
  return Array.from({ length: count }, (_, i) => ({
    due_date: addMonthsClamped(firstDue, i),
    amount,
    paid: false,
    paid_at: '',
    paid_amount: '',
  }))
}

/** Marca como pagas (na data e valor da parcela) as vencidas até hoje. */
export function markOverdueAsPaid(rows: InstallmentRow[]): InstallmentRow[] {
  const today = todayISO()
  return rows.map((r) =>
    r.due_date && r.due_date <= today && !r.paid
      ? { ...r, paid: true, paid_at: r.due_date, paid_amount: r.amount }
      : r,
  )
}

/** Primeira inconsistência encontrada, ou null quando tudo válido. */
export function validateInstallmentRows(rows: InstallmentRow[]): string | null {
  if (rows.length < 2) return 'Informe ao menos 2 parcelas.'
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    const n = i + 1
    if (!r.due_date) return `Parcela ${n}: informe o vencimento.`
    if (reaisToCents(r.amount) <= 0) return `Parcela ${n}: valor deve ser maior que zero.`
    if (r.paid) {
      if (!r.paid_at) return `Parcela ${n}: informe a data do pagamento.`
      if (reaisToCents(r.paid_amount) <= 0) return `Parcela ${n}: valor pago deve ser maior que zero.`
    }
  }
  return null
}

export function rowsToPayload(rows: InstallmentRow[]): EntryInstallmentInput[] {
  return rows.map((r) => ({
    due_date: r.due_date,
    amount_cents: reaisToCents(r.amount),
    paid_at: r.paid ? r.paid_at : null,
    paid_amount_cents: r.paid ? reaisToCents(r.paid_amount) : null,
  }))
}
